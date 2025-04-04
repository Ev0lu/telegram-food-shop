import s from './user-profile.module.css'
import { QRCodeCanvas } from 'qrcode.react';
import { bonuses_logo, search_image, arrow, arrow_right } from '@/shared/assets'
import Footer from '@/shared/footer/footer'
import { useGetUserInfoQuery, useGetUserOrdersQuery } from '@/shared/api/buyer-info'
import { useState } from 'react';
import { useCreatePaymentMutation, useGetPointsPriceQuery } from '@/shared/api/points';
import { useDeprecateOrderMutation } from '@/shared/api/orders';

function UserProfile() {
    const telegramId = sessionStorage.getItem('telegram_id');
    const { data, isLoading: isUserLoading } = useGetUserInfoQuery(telegramId);
    const user = data?.user;
    const { data: userOrders, isLoading: isOrdersLoading, refetch } = useGetUserOrdersQuery(telegramId);
    const { data: pointsData } = useGetPointsPriceQuery({});
    const [createPayment, { isLoading, error }] = useCreatePaymentMutation();
    const [deprecateOrder] = useDeprecateOrderMutation();

    const pointsPrice = pointsData?.price || 0;
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [points, setPoints] = useState('');
  
    const handlePurchase = async () => {
      try {
        const response = await createPayment({ points_quantity: points, telegram_id: telegramId, email }).unwrap();
        if (response.payment_link) window.location.href = response.payment_link;
      } catch (err) {
        console.error('Ошибка при создании платежа', err);
      }
    };
    
    const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
    const currentOrder = userOrders?.orders?.[currentOrderIndex];

    if (isUserLoading || isOrdersLoading) return <div style={{ padding: '15px' }}>Загрузка...</div> 

    return (
        <div className={s.main_catalog}>
            <div className={s.main_catalog_wrapper}>
                <div className={`${s.main_catalog_search} ${s.fixedItemSearch}`}>
                    <div className={s.main_catalog_search_wrapper}>
                        <img className={s.main_catalog_search_image} src={search_image}></img>
                        <input className={s.main_catalog_search_input} placeholder='Поиск по товарам' />
                    </div>
                </div>
                <div className={s.profile_title}>
                    <h1>Личный кабинет</h1>
                </div>
                <div className={s.main_catalog_promotional_goods}>
                    <h1>Контактные данные</h1>
                </div>
                <div className={s.input_list}>
                    <div className={s.input_item}>
                        <input readOnly value={user?.name?.split(' ')[0] || ''} placeholder='Фамилия' />
                    </div>
                    <div className={s.input_item}>
                        <input readOnly value={user?.name?.split(' ')[1] || ''} placeholder='Имя' />
                    </div>
                    <div className={s.input_item}>
                        <input readOnly value={user?.name?.split(' ')[2] || ''} placeholder='Отчество' />
                    </div>
                    <div className={s.input_item}>
                        <input readOnly value={user?.phone || ''} placeholder='Номер телефона' />
                    </div>
                </div>
                <div className={s.bonuses}>
                    <p>Бонусы</p>
                    <div className={s.bonuses_count}>
                        <img src={bonuses_logo}></img>
                        <p>{user?.points ?? "Загрузка..."}</p>
                    </div>
                    <button className={s.bonuses_button} onClick={() => setIsModalOpen(true)}>Купить пятаки</button>
                </div>
                <div className={s.profile}>
                    {isModalOpen && (
                        <div className={s.modal}>
                        <div className={s.modal_content}>
                            <h2 style={{fontFamily: 'Formular', fontSize: '16px'}}>Покупка бонусов</h2>
                            <input
                            value={points}
                            className={s.modal_input}
                            onChange={(e) => setPoints(e.target.value)}
                            placeholder="Введите количество бонусов"
                            />
                            <input
                            type="email"
                            value={email}
                            className={s.modal_input}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Введите email"
                            />
                            <p style={{fontFamily: 'Formular'}}>Курс: {pointsPrice}₽ за 1 бонус</p>
                            {error && <p className={s.error}>Ошибка при создании платежа</p>}
                            <div className={s.modal_buttons}>
                                <button className={s.close_modal_button} onClick={() => setIsModalOpen(false)}>Закрыть</button>
                                <button className={s.buy_modal_button} onClick={handlePurchase} disabled={isLoading}>Купить</button>
                            </div>
                        </div>
                        </div>
                    )}
                </div>
                {currentOrder && (
                    <div className={s.main_catalog_promotional_goods}>
                        <div className={s.orders_history_title}>
                            <h1>История заказов ({userOrders?.orders?.length})</h1>
                            <div className={s.arrows_wrapper}>
                                <img style={{cursor: 'pointer'}} src={arrow} onClick={() => {
                                    if (currentOrderIndex > 0) {
                                        setCurrentOrderIndex((prev) => prev - 1);
                                    }
                                }} />
                                <img style={{cursor: 'pointer'}} src={arrow_right} onClick={() => {
                                    if (currentOrderIndex < userOrders?.length - 1) {
                                        setCurrentOrderIndex((prev) => prev + 1);
                                    }
                                }} />
                            </div>
                        </div>

                        <div className={s.bonuses}>
                            <p>{currentOrder?.creation_date.split('-').reverse().join('.')}</p>
                            <div className={s.bonuses_count}>
                                <p>{currentOrder?.money_spent}р</p>
                            </div>
                            {currentOrder.status === "pending" && (
                                <>
                                    <button onClick={async () => {
                                        try {
                                            await deprecateOrder(currentOrder.entry_id).unwrap();
                                            refetch()
                                        } catch (err) {
                                            console.error("Ошибка при отмене заказа:", err);
                                        }
                                    }}
                                    className={s.cancel_button}>
                                        Отменить заказ
                                    </button>
                                    <QRCodeCanvas value={currentOrder.entry_id} size={50} />
                                </>
                            )}
                        </div>
                    </div>
                )}
                <Footer />
            </div>
        </div>
    )
}

export default UserProfile
