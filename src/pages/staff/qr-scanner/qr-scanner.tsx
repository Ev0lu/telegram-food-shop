import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useScanOrder } from "./model";
import s from "./qr-scanner.module.css";

const ScanPage: FC = () => {
  const navigate = useNavigate();
  const { webcamRef, error, scanData, showPopup } = useScanOrder();

  return (
    <div className={s.scanContainer}>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className={s.webcam} videoConstraints={{ facingMode: "environment" }} />
      <div className={s.scanFrame}>
        <span></span>
      </div>
      {error && <p className={s.error}>{error}</p>}

      {showPopup && scanData && (
        <div className={`${s.popup} ${showPopup ? s.active : ""}`}>
          <h2>Детальная информация</h2>
          <div className={s.products}>
            {scanData.order.products.map((product: any) => (
              <div key={product.entry_id} className={s.productItem}>
                <img className={s.productItemImage} src={product.picture_url} />
                <div className={s.productInfo}>
                  <h3 style={{ fontSize: "16px" }}>{product.title}</h3>
                  <p>Кол-во: {scanData.products_quantity[product.entry_id]}</p>
                  <div className={s.productDescription}>
                    <p style={{ fontWeight: "600", fontSize: "14px" }}>{product.price}Р</p>
                    <p style={{ fontSize: "14px" }}>{product.product_quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={s.buttons}>
            <button className={s.greenButton}>Выдать</button>
            <button className={s.redButton} onClick={() => {
              navigate("/staff/scanner/edit", { state: { scanData: scanData.order, quantity: scanData.products_quantity } })
              
              }}>
              Изменить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanPage;
