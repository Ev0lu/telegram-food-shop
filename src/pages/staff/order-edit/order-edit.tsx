import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./order-edit.module.css";
import { useRemoveProductMutation, useAcceptOrderMutation, useRejectOrderMutation } from "@/shared/api/staff-order";

interface Product {
    entry_id: string;
    title: string;
    price: number;
    product_quantity: string;
    picture_url: string;
}

interface ScanResponse {
    entry_id: string;
    products: Product[];
    products_quantity: Record<string, number>;
}

const EditOrderPage: FC = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [scanData, setScanData] = useState<ScanResponse | undefined>(location.state?.scanData)
    const [quantities, setQuantities] = useState<Record<string, number>>(location.state?.quantity || {});
    const [removeProduct] = useRemoveProductMutation();
    const [acceptOrder] = useAcceptOrderMutation();
    const [rejectOrder] = useRejectOrderMutation();

    if (!scanData) return <p style={{padding: '15px'}}>Нет данных для редактирования.</p>;

    const handleRemoveProduct = async (productId: string) => {
        try {
            let data = await removeProduct({
                orderId: scanData.entry_id,
                productId,
                staffId: sessionStorage.getItem("telegram_id")!,
            }).unwrap();
            if (data?.products_quantity) setQuantities(data.products_quantity);

            if (data?.order) setScanData(data.order);

        } catch (error) {
            console.error("Ошибка при удалении продукта", error);
        }
    };

    return (
        <div className={s.container}>
            <h2>Список покупок</h2>
            <div className={s.products}>
                {scanData.products.map((product) => (
                    <div key={product.entry_id} className={s.product_item}>
                        <div className={s.product_item_info}>
                            <img src={product.picture_url} alt={product.title} />
                            <div>
                                <h3>{product.title}</h3>
                                <p>Кол-во: {quantities[product.entry_id]}</p>
                                <div className={s.productDescription}>
                                    <p style={{ fontWeight: "600", fontSize: "14px" }}>{product.price}Р</p>
                                    <p style={{ fontSize: "14px" }}>{product.product_quantity}</p>
                                </div>
                            </div>
                        </div>
                        <button className={s.remove_button} onClick={() => handleRemoveProduct(product.entry_id)}>−</button>
                    </div>
                ))}
            </div>
            <div className={s.buttons}>
                <button className={s.red_button} onClick={async () => {
                        try {
                            await rejectOrder({ orderId: scanData.entry_id }).unwrap();
                            navigate("/staff/scanner", { state: { scanData } });
                        } catch (error) {
                            console.error("Ошибка при отказе от заказа", error);
                        }
                    }}>Отказать</button>
                <button className={s.green_button} onClick={async () => {
                    try {
                        await acceptOrder({ orderId: scanData.entry_id }).unwrap()
                        navigate("/staff/scanner", { state: { scanData } });
                    } catch (error) {
                        console.error("Ошибка при отказе от заказа", error);
                    }
                    }}>Выдать</button>
            </div>
        </div>
    );
};

export default EditOrderPage;