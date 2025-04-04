import { useNavigate } from 'react-router-dom'
import s from './main-catalog.module.css'
import { search_image, bonuses_logo } from '@/shared/assets'
import Footer from '@/shared/footer/footer'
import { useGetActionsQuery, useGetCatalogsCategoryQuery } from '@/shared/api/products'
import { useState } from 'react'

function MainCatalog() {
  const navigate = useNavigate()
  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCatalogsCategoryQuery('')
  const { data: actionsData, isLoading: isLoadingActions } = useGetActionsQuery('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCategories = categoriesData?.categories?.filter((item: any) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className={s.main_catalog}>
      <div className={s.main_catalog_wrapper}>
        <div className={`${s.main_catalog_search} ${s.fixedItemSearch}`}>
          <div className={s.main_catalog_search_wrapper}>
            <img className={s.main_catalog_search_image} src={search_image} alt="Поиск" />
            <input 
              className={s.main_catalog_search_input} 
              placeholder="Поиск по категориям" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />          
          </div>
        </div>

        <div className={s.main_catalog_promotional_goods}>
          <h1>Акционные товары</h1>
          {isLoadingActions ? (
            <p>Загрузка...</p>
          ) : (
            <div className={s.main_catalog_items}>
              {actionsData?.actions.map((item, index) => (
                <div key={index} className={s.main_catalog_item}>
                  <div className={s.main_catalog_item_wrapper}>
                    <div className={s.main_catalog_item_image}>
                      <img loading="lazy" src={item.product.picture_url} alt={item.product.title} />
                    </div>
                    <div className={s.main_catalog_item_info}>
                      <div className={s.main_catalog_item_title}>
                        <h2>{item.product.title}</h2>
                      </div>
                      <div className={s.main_catalog_item_desciption}>
                        <p className={s.main_catalog_item_desciption_price}>
                          {item.reward_points}
                          <img src={bonuses_logo} alt="Бонусы" />
                        </p>
                        <p className={s.main_catalog_item_desciption_weight}>{item.product_quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={s.main_catalog_promotional_goods}>
          <h1>Категории</h1>
          {isLoadingCategories ? (
            <p>Загрузка...</p>
          ) : (
            <div className={s.main_catalog_categories}>
              {filteredCategories && filteredCategories.map((item: any) => (
                <div key={item.entry_id} onClick={() => navigate(`/subcatalog_buyer/${item.entry_id}`)} className={s.main_catalog_category}>
                  <div className={s.main_catalog_category_wrapper}>
                    <div className={s.main_catalog_category_image}>
                      <img src={item.picture_url} alt={item.title} />
                    </div>
                    <div className={s.main_catalog_category_info}>
                      <div className={s.main_catalog_category_title}>
                        <h2>{item.title}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default MainCatalog
