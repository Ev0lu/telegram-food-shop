import { useState } from 'react'
import s from './cart.module.css'
import search_image from '../../assets/Vector.svg'
import bananas from '../../assets/delicious-bananas-studio.svg'
import shopping_cart from '../../assets/Shopping_Cart_02.svg'
import { useNavigate } from 'react-router-dom'
import clock from '../../assets/Clock.svg'
import Footer from '../../shared/footer/footer'


function Cart() {

    const navigate = useNavigate()

  return (
      <div className={s.main_catalog}>
        <div className={s.main_catalog_wrapper}>
            <div className={`${s.main_catalog_search} ${s.fixedItemSearch}`}>
                <div className={s.main_catalog_search_wrapper}>
                    <img className={s.main_catalog_search_image} src={search_image}></img>
                    <input className={s.main_catalog_search_input} placeholder='Поиск по товарам'/>
                </div>
            </div>
            <div className={s.main_catalog_promotional_goods}>
                <div className={s.orders_history_title}>
                    <h1>Корзина (3)</h1>
                    <div className={s.arrows_wrapper}>
                        <p>очистить все</p>

                    </div>
                </div>
                <div className={s.categories_wrapper}>
                    <div className={s.main_catalog_categories}>

                    <div onClick={() => navigate('/subcatalog_buyer/:catalog_id')} className={s.main_catalog_category}>
                        <div className={s.main_catalog_category_wrapper}>
                            <div className={s.main_catalog_category_image}>
                                <img src={bananas}></img>
                            </div> 
                            <div className={s.main_catalog_category_info}>
                                <div className={s.main_catalog_category_title}>
                                    <h2>Кукурузные хлопьяыыыыыыыыыыыы</h2>
                                    <p>100Р/кг</p>
                                </div> 
                                <div className={s.main_catalog_category_title_price}>
                                    <div className={s.main_catalog_category_title_price_button}>
                                        <p>-</p>
                                        <p>3шт</p>
                                        <p>+</p>
                                    </div>
                                    <h2>100Р</h2>
                                </div> 

                            </div>

                        </div>
                    </div>                    
                    </div>
                    <div className={s.main_catalog_categories}>

                        <div className={s.main_catalog_category}>
                            <div className={s.main_catalog_category_wrapper}>
                                <div className={s.main_catalog_category_image}>
                                    <img src={bananas}></img>
                                </div> 
                                <div className={s.main_catalog_category_info}>
                                    <div className={s.main_catalog_category_title}>
                                        <h2>Кукурузные хлопьяыыыыыыыыыыыы</h2>
                                        <p>100Р/кг</p>
                                    </div> 
                                    <div className={s.main_catalog_category_title_price}>
                                        <div className={s.main_catalog_category_title_price_button}>
                                            <p>-</p>
                                            <p>3шт</p>
                                            <p>+</p>
                                        </div>
                                        <h2>100Р</h2>
                                    </div> 

                                </div>

                            </div>
                        </div>                    
                        </div>
                        <div className={s.main_catalog_categories}>

                        <div className={s.main_catalog_category}>
                            <div className={s.main_catalog_category_wrapper}>
                                <div className={s.main_catalog_category_image}>
                                    <img src={bananas}></img>
                                </div> 
                                <div className={s.main_catalog_category_info}>
                                    <div className={s.main_catalog_category_title}>
                                        <h2>Кукурузные хлопьяыыыыыыыыыыыы</h2>
                                        <p>100Р/кг</p>
                                    </div> 
                                    <div className={s.main_catalog_category_title_price}>
                                        <div className={s.main_catalog_category_title_price_button}>
                                            <p>-</p>
                                            <p>3шт</p>
                                            <p>+</p>
                                        </div>
                                        <h2>100Р</h2>
                                    </div> 

                                </div>

                            </div>
                        </div>                    
                        </div>
                        <div className={s.main_catalog_categories}>

                        <div  className={s.main_catalog_category}>
                            <div className={s.main_catalog_category_wrapper}>
                                <div className={s.main_catalog_category_image}>
                                    <img src={bananas}></img>
                                </div> 
                                <div className={s.main_catalog_category_info}>
                                    <div className={s.main_catalog_category_title}>
                                        <h2>Кукурузные хлопьяыыыыыыыыыыыы</h2>
                                        <p>100Р/кг</p>
                                    </div> 
                                    <div className={s.main_catalog_category_title_price}>
                                        <div className={s.main_catalog_category_title_price_button}>
                                            <p>-</p>
                                            <p>3шт</p>
                                            <p>+</p>
                                        </div>
                                        <h2>100Р</h2>
                                    </div> 

                                </div>

                            </div>
                        </div>                    
                        </div>
                        <div className={s.main_catalog_categories}>

                        <div className={s.main_catalog_category}>
                            <div className={s.main_catalog_category_wrapper}>
                                <div className={s.main_catalog_category_image}>
                                    <img src={bananas}></img>
                                </div> 
                                <div className={s.main_catalog_category_info}>
                                    <div className={s.main_catalog_category_title}>
                                        <h2>Кукурузные хлопьяыыыыыыыыыыыы</h2>
                                        <p>100Р/кг</p>
                                    </div> 
                                    <div className={s.main_catalog_category_title_price}>
                                        <div className={s.main_catalog_category_title_price_button}>
                                            <p>-</p>
                                            <p>3шт</p>
                                            <p>+</p>
                                        </div>
                                        <h2>100Р</h2>
                                    </div> 

                                </div>

                            </div>
                        </div>                    
                        </div>
                </div>
  


                <div className={s.bonuses}>
                    <img src={clock}></img>
                    <div className={s.bonuses_count}>
                        <p>Доставим в течении 2 часов</p>
                    </div>
                    </div>
                </div>
                <div className={s.orders_interests_title}>
                    <h1>Вас может заинтересовать</h1>
                </div>
                <div className={s.subcategory_promotional_goods}>
                    <div className={s.subcategory_items}>
                    <div className={s.categories_items}>

                        <div className={s.subcategory_item}>
                            <div className={s.subcategory_item_wrapper}>
                                <div className={s.subcategory_item_image}>
                                    <img src={bananas}></img>
                                </div> 
                                <div className={s.subcategory_item_info}>
                                    <div className={s.subcategory_item_title}>
                                        <h2>Кукурузные хлопьяыыыыыыыыыыыы</h2>
                                    </div> 
                                    <div className={s.subcategory_item_desciption}>
                                        <p className={s.subcategory_item_desciption_price}>100Р/кг</p>
                                        <p className={s.subcategory_item_desciption_weight}>200гр</p>
                                    </div> 
                                    <div className={s.subcategory_item_add_button}>
                                        <img src={shopping_cart}></img>
                                        <p>В корзину</p>
                                    </div> 
                                </div>
                            </div>
                        </div>     
                        
                        <div className={s.subcategory_item}>
                            <div className={s.subcategory_item_wrapper}>
                                <div className={s.subcategory_item_image}>
                                    <img src={bananas}></img>
                                </div> 
                                <div className={s.subcategory_item_info}>
                                    <div className={s.subcategory_item_title}>
                                        <h2>Кукурузные хлопьяыыыыыыыыыыыы</h2>
                                    </div> 
                                    <div className={s.subcategory_item_desciption}>
                                        <p className={s.subcategory_item_desciption_price}>100Р/кг</p>
                                        <p className={s.subcategory_item_desciption_weight}>200гр</p>
                                    </div> 
                                    <div className={s.subcategory_item_add_button}>
                                        <img src={shopping_cart}></img>
                                        <p>В корзину</p>
                                    </div> 
                                </div>
                            </div>
                        </div>  
                        
                        <div className={s.subcategory_item}>
                            <div className={s.subcategory_item_wrapper}>
                                <div className={s.subcategory_item_image}>
                                    <img src={bananas}></img>
                                </div> 
                                <div className={s.subcategory_item_info}>
                                    <div className={s.subcategory_item_title}>
                                        <h2>Кукурузные хлопьяыыыыыыыыыыыы</h2>
                                    </div> 
                                    <div className={s.subcategory_item_desciption}>
                                        <p className={s.subcategory_item_desciption_price}>100Р/кг</p>
                                        <p className={s.subcategory_item_desciption_weight}>200гр</p>
                                    </div> 
                                    <div className={s.subcategory_item_add_button}>
                                        <img src={shopping_cart}></img>
                                        <p>В корзину</p>
                                    </div> 
                                </div>
                            </div>
                        </div>  
                        
                        <div className={s.subcategory_item}>
                            <div className={s.subcategory_item_wrapper}>
                                <div className={s.subcategory_item_image}>
                                    <img src={bananas}></img>
                                </div> 
                                <div className={s.subcategory_item_info}>
                                    <div className={s.subcategory_item_title}>
                                        <h2>Кукурузные хлопьяыыыыыыыыыыыы</h2>
                                    </div> 
                                    <div className={s.subcategory_item_desciption}>
                                        <p className={s.subcategory_item_desciption_price}>100Р/кг</p>
                                        <p className={s.subcategory_item_desciption_weight}>200гр</p>
                                    </div> 
                                    <div className={s.subcategory_item_add_button}>
                                        <img src={shopping_cart}></img>
                                        <p>В корзину</p>
                                    </div> 
                                </div>
                            </div>
                        </div>  
                        
                        <div className={s.subcategory_item}>
                            <div className={s.subcategory_item_wrapper}>
                                <div className={s.subcategory_item_image}>
                                    <img src={bananas}></img>
                                </div> 
                                <div className={s.subcategory_item_info}>
                                    <div className={s.subcategory_item_title}>
                                        <h2>Кукурузные хлопьяыыыыыыыыыыыы</h2>
                                    </div> 
                                    <div className={s.subcategory_item_desciption}>
                                        <p className={s.subcategory_item_desciption_price}>100Р/кг</p>
                                        <p className={s.subcategory_item_desciption_weight}>200гр</p>
                                    </div> 
                                    <div className={s.subcategory_item_add_button}>
                                        <img src={shopping_cart}></img>
                                        <p>В корзину</p>
                                    </div> 
                                </div>
                            </div>
                        </div>  
                        
                        <div className={s.subcategory_item}>
                            <div className={s.subcategory_item_wrapper}>
                                <div className={s.subcategory_item_image}>
                                    <img src={bananas}></img>
                                </div> 
                                <div className={s.subcategory_item_info}>
                                    <div className={s.subcategory_item_title}>
                                        <h2>Кукурузные хлопьяыыыыыыыыыыыы</h2>
                                    </div> 
                                    <div className={s.subcategory_item_desciption}>
                                        <p className={s.subcategory_item_desciption_price}>100Р/кг</p>
                                        <p className={s.subcategory_item_desciption_weight}>200гр</p>
                                    </div> 
                                    <div className={s.subcategory_item_add_button}>
                                        <img src={shopping_cart}></img>
                                        <p>В корзину</p>
                                    </div> 
                                </div>
                            </div>
                        </div>         
                </div>
                </div>
                </div>
                <Footer />
        </div>
      </div>
  )
}

export default Cart
