import s from './footer.module.css'
import { catalog_menu, scanner_menu, user_menu, shopping_cart_menu } from '../../assets'
import { useNavigate } from 'react-router-dom'

function Footer() {
    const navigate = useNavigate()

    return (
        <div className={`${s.menu} ${s.fixedItem}`}>
            <div onClick={() => navigate('/buyer/qrscan')} className={s.menu_item}>
                <div className={s.menu_item_img}>
                    <img src={scanner_menu} />
                </div>
                <div className={s.menu_item_text}>
                    <p>Сканер</p>
                </div>
            </div>
            <div onClick={() => navigate('/')} className={s.menu_item}>
                <div className={s.menu_item_img}>
                    <img src={catalog_menu} />
                </div>
                <div className={s.menu_item_text}>
                    <p>Каталог</p>
                </div>

            </div>
            <div onClick={() => navigate('/buyer/cart')} className={s.menu_item}>
                <div className={s.menu_item_img}>
                    <img src={shopping_cart_menu} />
                </div>
                <div className={s.menu_item_text}>
                    <p>Корзина</p>
                </div>

            </div>
            <div onClick={() => navigate(`/buyer/user/${sessionStorage.getItem('telegram_id')}`)} className={s.menu_item}>
                <div className={s.menu_item_img}>
                    <img src={user_menu} />
                </div>
                <div className={s.menu_item_text}>
                    <p>Профиль</p>
                </div>

            </div>
        </div>

    )
}

export default Footer
