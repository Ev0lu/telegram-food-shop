import { useEffect, useState } from 'react'
import s from './main-catalog.module.css'
import search_image from '../../assets/Vector.svg'
import bananas from '../../assets/delicious-bananas-studio.svg'
import shopping_cart from '../../assets/Shopping_Cart_02.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../shared/footer/footer'
import { appendCart, getActions, getCatalogs, removeCart } from '../../shared/api'
import { getToken, setToken } from '../../App'

function MainCatalog() {

  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [actions, setActions] = useState([])

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const getCatalogsByApi = async () => {
    const response = await getCatalogs()
    const data = await response.json()
    setCategories(data.categories)
  }

  const getActionsByApi = async () => {
    const response = await getActions()
    const data = await response.json()
    setActions(data.actions)
  }

  useEffect(() => {
    const token = getToken('access'); // Или localStorage
    if (!token || token.split('.').length !== 3) {
        sessionStorage.setItem('telegram_id', `${searchParams.get('telegram_id')}`)
        setToken('access', `${searchParams.get('access_token')}`)
    }
    getCatalogsByApi()
    getActionsByApi()
  }, [])


  const [cart, setCart] = useState<{ [key: string]: number }>({}); // Хранит количество товаров в корзине


  const addToCart = (entryId: string) => {
      setCart((prevCart) => ({
        ...prevCart,
        [entryId]: 1,
      }));
      sendCartUpdate(entryId, 1);
    };
    
    // Увеличить количество товара
    const increaseItem = (entryId: string) => {
      setCart((prevCart) => ({
        ...prevCart,
        [entryId]: (prevCart[entryId] || 0) + 1,
      }));
      sendCartUpdate(entryId, cart[entryId] + 1);
    };
    
    // Уменьшить количество товара
    const decreaseItem = (entryId: string) => {
      setCart((prevCart) => {
        const updatedCart = { ...prevCart };
        if (updatedCart[entryId] === 1) {
          delete updatedCart[entryId];
        } else {
          updatedCart[entryId] = (updatedCart[entryId] || 1) - 1;
        }
        return updatedCart;
      });
      sendCartRemove(entryId, cart[entryId] - 1);
    };


    const sendCartUpdate = async (productId: string, count: number) => {
      const token = getToken('access')

      const payload = {
        products: [{ count, item_id: productId }],
      };
      await appendCart(payload, token)

    };

    const sendCartRemove = async (productId: string, count: number) => {
      const token = getToken('access')

      const payload = {
        products: [{ count, item_id: productId }],
      };
      await removeCart(payload, token)

    };
  


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
                <h1>Акционные товары</h1>
                {actions && actions.map((item: any) => (
                    <div className={s.main_catalog_items}>
                        <div className={s.main_catalog_item}>
                            <div className={s.main_catalog_item_wrapper}>
                                <div className={s.main_catalog_item_image}>
                                    <img src={item.product.picture_url}></img>
                                </div> 
                                <div className={s.main_catalog_item_info}>
                                    <div className={s.main_catalog_item_title}>
                                        <h2>{item.product.title}</h2>
                                    </div> 
                                    <div className={s.main_catalog_item_desciption}>
                                        <p className={s.main_catalog_item_desciption_price}>{item.product.price}р</p>
                                        <p className={s.main_catalog_item_desciption_weight}>{item.product.product_quantity}</p>
                                    </div> 
                                    {item.entry_id ? (
                                        <div className={s.cart_controls}>
                                            {cart[item.entry_id] ? (
                                            <div className={s.cart_buttons}>
                                                <button
                                                className={s.decrease_button}
                                                onClick={() => decreaseItem(item.entry_id)}
                                                >
                                                -
                                                </button>
                                                <p>{cart[item.entry_id]}</p>
                                                <button
                                                className={s.increase_button}
                                                onClick={() => increaseItem(item.entry_id)}
                                                >
                                                +
                                                </button>
                                            </div>
                                            ) : (
                                            <div
                                                className={s.main_catalog_item_add_button}
                                                onClick={() => addToCart(item.entry_id)}
                                            >
                                                <img src={shopping_cart} alt="В корзину"></img>
                                                <p>В корзину</p>
                                            </div>
                                            )}
                                        </div>
                                        ) : (
                                        <p>Данные о товаре недоступны</p>
                                        )}
                                </div>
                            </div>
                        </div>                    
                    </div>
                ))}

            </div>
            <div className={s.main_catalog_promotional_goods}>
                <h1>Категории</h1>
                <div className={s.main_catalog_categories}>

                    {categories && categories.map((item: any) => (
                        <div onClick={() => navigate(`/subcatalog_buyer/${item.entry_id}`)} className={s.main_catalog_category}>
                        <div className={s.main_catalog_category_wrapper}>
                            <div className={s.main_catalog_category_image}>
                                <img src={item.picture_url}></img>
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
            </div>
            <Footer />
        </div>
      </div>
  )
}

export default MainCatalog
