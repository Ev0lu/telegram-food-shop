import { FC } from "react";
import { useNavigate } from "react-router-dom";
import s from "./staff-history.module.css";
import { useStaffOrderQuery } from "@/shared/api/staff-order";


const StaffHistory: FC = () => {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const telegramId = sessionStorage.getItem("telegram_id") || searchParams.get("telegram_id");
    const {data, isLoading} = useStaffOrderQuery({ telegramId })
    if (isLoading) return <div style={{padding: '15px'}}>...</div>

    return (
        <div className={s.container}>
            <h2>Отсканированные заказы</h2>
            <div className={s.products}>
                {data && data.orders.map((product: any) => (
                    <div key={product.entry_id} className={s.product_item}>
                        <div className={s.product_item_info}>
                            <div>
                                <p style={{fontSize: '16px'}}>Пользователь: {product.user_id}</p>
                                <div style={{display: 'flex', gap: '15px'}}>
                                    <p style={{fontSize: '14px'}}>{product.money_spent}Р</p>
                                    <p style={{fontSize: '14px'}}>{product.points_spent} бонусов</p>
                                </div>
                                <p style={{fontSize: '12px'}}>Статус: {product.status}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={s.buttons}>
                <button className={s.green_button} onClick={() => navigate("/staff/scanner/scan")}>Сканировать заказ</button>
            </div>
        </div>
    );
};

export default StaffHistory;
