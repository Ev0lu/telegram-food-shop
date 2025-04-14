import { useState } from 'react';
import s from './cart.module.css';
import { search_image, bananas } from '../../../shared/assets';
import Footer from '../../../shared/footer/footer';
import { useCart } from '@/shared/api/cart';
import { useGetUserInfoQuery } from '@/shared/api/buyer-info';
import { useCreateOrderMutation } from '@/shared/api/orders';

function Cart() {
    const telegramId = sessionStorage.getItem('telegram_id');
    const { data } = useGetUserInfoQuery(telegramId);
    const { cart, maxPoints, minPoints, handleAddToCart, handleDecreaseItem, handleClearCart } = useCart();
    const points = data?.user.points >= maxPoints ? maxPoints : data?.user.points || 0;
    const totalCost = cart?.reduce((sum, item) => sum + item.item.price * item.count, 0) || 0;
    const [pointsUsed, setPointsUsed] = useState(0);
    const [createOrder, { isLoading, isSuccess, error }] = useCreateOrderMutation();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');    
    
    const handleCreateOrderWithDetails = async () => {
        try {
            const response = await createOrder({ points_spent: pointsUsed, email }).unwrap();
            if (response.payment_link) {
                handleClearCart();
                window.location.href = response.payment_link
            }
        } catch (err) {
        }
    };

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    return (
        <div className={s.main_catalog}>
            <div className={s.main_catalog_wrapper}>
                <div className={`${s.main_catalog_search} ${s.fixedItemSearch}`}>
                    <div className={s.main_catalog_search_wrapper}>
                        <img className={s.main_catalog_search_image} src={search_image} alt="search" />
                        <input className={s.main_catalog_search_input} placeholder='Поиск по товарам' />
                    </div>
                </div>
                <div className={s.main_catalog_promotional_goods}>
                    <div className={s.orders_history_title}>
                        <h1>Корзина ({cart ? cart?.filter(item => item.count > 0).reduce((total, item) => total + item.count, 0) : 0})</h1>
                        <div className={s.arrows_wrapper}>
                            <p onClick={() => handleClearCart()}>очистить все</p>
                        </div>
                    </div>
                    <div className={s.categories_wrapper}>
                    {cart?.map((item) => (
                        item.count > 0 &&
                        <div key={item.item.entry_id} className={s.main_catalog_categories}>
                            <div className={s.main_catalog_category}>
                            <div className={s.main_catalog_category_wrapper}>
                                <div className={s.main_catalog_category_image}>
                                <img src={item.item.picture_url || bananas} alt={item.item.title} />
                                </div>
                                <div className={s.main_catalog_category_info}>
                                <div className={s.main_catalog_category_title}>
                                    <h2>{item.item.title}</h2>
                                    <p>{item.item.price}р/кг</p>
                                </div>
                                <div className={s.main_catalog_category_title_price}>
                                    <div className={s.main_catalog_category_title_price_button}>
                                    <p onClick={() => handleDecreaseItem(item.item.entry_id)}>-</p>
                                    <p>{item.count}шт</p>
                                    <p onClick={() => handleAddToCart(item.item.entry_id)}>+</p>
                                    </div>
                                    <h2>{item.item.price * item.count}р</h2>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                
                <div className={s.payment_summary}>
                    <div className={s.payment_summary_wrapper}>
                        <h1 style={{fontSize: '18px'}}>Оплата</h1>
                        <div className={s.payment_details}>
                            <p style={{fontWeight: 'bold'}}>Сумма заказа</p>
                            <p>{totalCost}₽</p>
                        </div>
                        <div className={s.payment_details}>
                            <p style={{fontWeight: 'bold'}}>Оплата с пятаками:</p>
                        </div>
                        {data?.user.points ? (
                            <input
                                type="range"
                                min="0"
                                max={Math.min(points, totalCost)}
                                value={pointsUsed}
                                onChange={(event: any) => {
                                    const newPoints = Math.min(Number(event.target.value), points, totalCost);
                                    setPointsUsed(newPoints);
                                }}
                                style={{ "--progress": points > 0 ? `${(pointsUsed / Math.min(points, totalCost)) * 100}%` : "0%" } as React.CSSProperties}
                            />
                        ) : (
                            <p style={{fontSize: '14px', color: 'grey'}}>Нет пятаков</p>
                        )}

                        <div className={s.payment_details}>
                            <p style={{fontWeight: 'bold'}}>ИТОГО</p>
                            <p>{totalCost - pointsUsed}₽</p>
                        </div>
                        {points < minPoints && (
                            <p className={s.error_message}>
                                У вас недостаточно бонусов. Минимальное количество для создания заказа - {minPoints}
                            </p>
                        )}
                        {pointsUsed < minPoints && points >= minPoints && (
                            <p className={s.error_message}>
                                Минимальное количество использованных бонусов для создания заказа - {minPoints}
                            </p>
                        )}
                        <button onClick={() => setIsModalOpen((prev) => !prev)} className={s.payment_button} disabled={points < minPoints || (points >= minPoints && pointsUsed < minPoints)}>
                            Перейти к оплате
                        </button>
                    </div>
                </div>

                {isModalOpen && (
                    <div className={s.modal}>
                        <div className={s.modal_content}>
                            <h2>Оформление заказа</h2>
                            <div className={s.modal_input_group}>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Введите почту для чека"
                                />
                            </div>
                            {isLoading && <p>Создание заказа...</p>}
                            {isSuccess && <p className={s.success_message}>Заказ успешно создан! ✅</p>}
                            {error && <p className={s.error_message}>Ошибка при создании заказа. Попробуйте снова.</p>}
                            <div className={s.modal_buttons}>
                                <button onClick={() => setIsModalOpen((prev) => !prev)} className={s.cancel_button}>Отмена</button>
                                <button disabled={!isEmailValid} onClick={handleCreateOrderWithDetails} className={s.confirm_button}>Создать заказ</button>
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </div>
    );
}

export default Cart;
