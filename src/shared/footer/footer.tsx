import s from './footer.module.css'
import shopping_cart_menu from '../../assets/Shopping_Cart_menu.svg'
import user_menu from '../../assets/User_menu.svg'
import scanner_menu from '../../assets/scanner_menu.svg'
import catalog_menu from '../../assets/catalog_menu.svg'
import { useLocation, useNavigate } from 'react-router-dom'

function Footer() {

    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

  return (
            <div className={`${s.menu} ${s.fixedItem}`}>
                                    <div onClick={() => navigate('/qrscan_buyer')} className={s.menu_item}>
                                        <div className={s.menu_item_img}>
                                            <img src={scanner_menu}/>
                                        </div>
                                        <div className={s.menu_item_text}>
                                            <p>Сканер</p>
                                        </div>
                                    </div>
                                    <div onClick={() => navigate('/')} className={s.menu_item}>
                                        <div className={s.menu_item_img}>
                                            <img src={catalog_menu}/>
                                        </div>
                                        <div className={s.menu_item_text}>
                                            <p>Каталог</p>
                                        </div>

                                    </div>
                                    <div onClick={() => navigate('/buyer/cart')} className={s.menu_item}>
                                        <div className={s.menu_item_img}>
                                            <img src={shopping_cart_menu}/>
                                        </div>
                                        <div className={s.menu_item_text}>
                                            <p>Корзина</p>
                                        </div>

                                    </div>
                                    <div onClick={() => navigate(`/buyer/user/${sessionStorage.getItem('telegram_id')}`)} className={s.menu_item}>
                                        <div className={s.menu_item_img}>
                                            <img src={user_menu}/>
                                        </div>
                                        <div className={s.menu_item_text}>
                                            <p>Профиль</p>
                                        </div>

                                    </div>
            </div>

  )
}

export default Footer
