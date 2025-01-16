import { useEffect, useState } from 'react'
import s from './subcatalog-details.module.css'
import search_image from '../../assets/Vector.svg'
import shopping_cart from '../../assets/Shopping_Cart_02.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import arrow from '../../assets/Chevron_Left.svg'
import Footer from '../../shared/footer/footer'
import { getCatalogsCategory, getProducts } from '../../shared/api'

function SubcatalogDetails() {

    const navigate = useNavigate()
    const [products, setProducts] = useState<any>()
    const [category, setCategory] = useState<any>()

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    const getCatalogsByApi = async () => {
      const response = await getCatalogsCategory(`${location.pathname.split('/')[2]}`)
      const responseProducts = await getProducts(`${location.pathname.split('/')[2]}`)
      const dataProducts = await responseProducts.json()
      setProducts(dataProducts.products)
      const data = await response.json()
      setCategory(data.category)
    }

    useEffect(() => {
        getCatalogsByApi()
    }, [])

  return (
      <div className={s.main_catalog}>
        <div className={s.main_catalog_wrapper}>
            <div className={`${s.main_catalog_search} ${s.fixedItemSearch}`}>
                <div className={s.main_catalog_search_wrapper}>

                    <img className={s.main_catalog_search_image} src={search_image}></img>
                    <input className={s.main_catalog_search_input} placeholder='Поиск по товарам'/>
                </div>

            </div>
            <div className={s.top_category_name}>
                <img src={arrow} onClick={() => navigate(`/subcatalog_buyer/${location.pathname.split('/')[2]}`)} />
                <h1>{category?.title || 'Загрузка...'}</h1>
            </div>
            <div className={s.subcategory_promotional_goods}>
                        <div className={s.subcategory_items}>
                        <div className={s.categories_items}>
                        {products && products.map((item:any, index: number) => (
                            <div className={s.subcategory_item}>
                                <div className={s.subcategory_item_wrapper}>
                                    <div className={s.subcategory_item_image}>
                                        <img src={item.picture_url}></img>
                                    </div> 
                                    <div className={s.subcategory_item_info}>
                                        <div className={s.subcategory_item_title}>
                                            <h2>{item.title}</h2>
                                        </div> 
                                        <div className={s.subcategory_item_desciption}>
                                            <p className={s.subcategory_item_desciption_price}>{item.price}р</p>
                                            <p className={s.subcategory_item_desciption_weight}>{item.product_quantity}</p>
                                        </div> 
                                        <div className={s.subcategory_item_add_button}>
                                            <img src={shopping_cart}></img>
                                            <p>В корзину</p>
                                        </div> 
                                    </div>
                                </div>
                            </div>     
                        ))}      
                </div>
            </div>
            </div>
            <Footer />
        </div>
      </div>
  )
}

export default SubcatalogDetails
