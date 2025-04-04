import { useNavigate, useLocation } from 'react-router-dom';
import s from './subcatalog-details.module.css';
import { search_image, arrow } from '@/shared/assets';
import Footer from '@/shared/footer/footer';
import { useGetCatalogsCategoryQuery, useGetProductsQuery } from '@/shared/api/products';
import { useCart } from '@/shared/api/cart';
import { CartControls } from '@/shared/ui/cart-controls/cart-controls';
import { useState } from 'react';

function SubcatalogDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const categoryId = location.pathname.split('/')[2];

    const { data: category, isLoading: isLoadingCategory } = useGetCatalogsCategoryQuery(categoryId);
    const { data: products, isLoading: isLoadingProducts } = useGetProductsQuery(categoryId);
    const { cart, handleAddToCart, handleDecreaseItem } = useCart();
    const [searchTerm, setSearchTerm] = useState('')
    const filteredProducts = products?.products.filter((item: any) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className={s.main_catalog}>
            <div className={s.main_catalog_wrapper}>
                <div className={`${s.main_catalog_search} ${s.fixedItemSearch}`}>
                    <div className={s.main_catalog_search_wrapper}>
                        <img className={s.main_catalog_search_image} src={search_image} alt="Поиск" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={s.main_catalog_search_input} placeholder='Поиск по товарам' />
                    </div>
                </div>
                <div className={s.top_category_name}>
                    <img src={arrow} alt="Назад" onClick={() => navigate(`/subcatalog_buyer/${categoryId}`)} />
                    <h1>{isLoadingCategory ? 'Загрузка...' : category?.category.title}</h1>
                </div>
                <div className={s.subcategory_promotional_goods}>
                    <div className={s.subcategory_items}>
                        <div className={s.categories_items}>
                            {isLoadingProducts ? (
                                <p>Загрузка...</p>
                            ) : (
                                filteredProducts && filteredProducts.map((item) => (
                                    <div key={item.entry_id} className={s.subcategory_item}>
                                        <div className={s.subcategory_item_wrapper}>
                                            <div className={s.subcategory_item_image}>
                                                <img loading="lazy" className={s.item_image} src={item.picture_url} alt={item.title} />
                                            </div>
                                            <div className={s.subcategory_item_info}>
                                                <div className={s.subcategory_item_title}>
                                                    <h2>{item.title}</h2>
                                                </div>
                                                <div className={s.subcategory_item_desciption}>
                                                    <p className={s.subcategory_item_desciption_price}>{item.price}р</p>
                                                    <p className={s.subcategory_item_desciption_weight}>{item.product_quantity}</p>
                                                </div>
                                                {item.entry_id ? (
                                                    <CartControls
                                                        itemId={item.entry_id}
                                                        count={cart?.find(cartItem => cartItem.item.entry_id === item.entry_id)?.count || 0}
                                                        onIncrease={() => handleAddToCart(item.entry_id)}
                                                        onDecrease={() => handleDecreaseItem(item.entry_id)}
                                                    />
                                                ) : (
                                                    <p>Данные о товаре недоступны</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default SubcatalogDetails;
