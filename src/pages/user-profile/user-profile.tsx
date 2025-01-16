import { useEffect, useState } from 'react'
import s from './user-profile.module.css'
import search_image from '../../assets/Vector.svg'
import bananas from '../../assets/delicious-bananas-studio.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import bonuses_logo from '../../assets/bonuses_logo.svg'
import right_arrow from '../../assets/Chevron_Right.svg'
import left_arrow from '../../assets/Chevron_Left.svg'
import Footer from '../../shared/footer/footer'
import { getUserInfo, getUserInfoAboutOrders } from '../../shared/api'


function UserProfile() {

    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [user, setUser] = useState<any>({});
    const [userOrder, setUserOrder] = useState<any>()
      
    const getUser = async () => {
        const response = await getUserInfo(`${sessionStorage.getItem('telegram_id')}`)
        const data = await response.json()
        setUser(data.user)
        const responseOrder = await getUserInfoAboutOrders(`${sessionStorage.getItem('telegram_id')}`)
        const dataOrder = await responseOrder.json()
        setUserOrder(dataOrder)
        console.log(dataOrder)
    }


    useEffect(() => {
        getUser()
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
            </div>
            <div className={s.main_catalog_promotional_goods}>
                <div className={s.orders_history_title}>
                    <h1>История заказов (5)</h1>
                    <div className={s.arrows_wrapper}>
                        <img src={left_arrow}></img>
                        <img src={right_arrow}></img>

                    </div>
                </div>
                <div className={s.bonuses}>
                    <p>18.09.2024</p>
                    <div className={s.bonuses_count}>
                        <p>700Р</p>
                    </div>
                </div>
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
                                    <h2>100Р</h2>
                                </div> 
                            </div>
                        </div>
                    </div>                    
                </div>
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
                <h2>100Р</h2>
            </div> 
        </div>
    </div>
</div>                    
</div>
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
                <h2>100Р</h2>
            </div> 
        </div>
    </div>
</div>                    
</div>
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
                <h2>100Р</h2>
            </div> 
        </div>
    </div>
</div>                    
</div>
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
                <h2>100Р</h2>
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

export default UserProfile
