import { useEffect } from "react";
import { useGetOrderQuery } from "@/shared/api/orders";
import { QRCodeCanvas } from 'qrcode.react';
import s from './index.module.css'
import { useSearchParams } from "react-router-dom";

const OrderStatusPage = () => {
  const [searchParams] = useSearchParams();
  const order_id = searchParams.get("order_id");
  const { data: order, refetch } = useGetOrderQuery(order_id, {
    pollingInterval: 10000,
  });

  useEffect(() => {
    if (order?.status !== "paid") {
      const interval = setInterval(() => {
        refetch();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [order, refetch]);

  if (!order) return <p style={{padding: '10px'}}>Загрузка...</p>;

  return (
    <div className={s.checkout}>
      {order.status === "paid" && order_id ? (
        <div className={s.checkout_wrapper}>
          <h2>Заказ оплачен!</h2>
          <QRCodeCanvas value={order_id} size={180} />
        </div>
      ) : (
        <p>Подождите подтверждения оплаты...</p>
      )}
    </div>
  );
};

export default OrderStatusPage;