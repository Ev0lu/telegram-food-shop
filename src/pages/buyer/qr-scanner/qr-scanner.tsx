import Webcam from "react-webcam";
import { CSSTransition } from "react-transition-group";
import s from "./qr-scanner.module.css";
import Footer from "@/shared/ui/footer/footer";
import { useQRScanner } from "./model";

const QRScanner = () => {
  const { webcamRef, popupRef, popup, handleRetry } = useQRScanner();

  return (
    <div className={s.camera_container}>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className={s.full_screen_webcam}
        videoConstraints={{ facingMode: "environment" }}
      />
      <div className={s.scan_frame}><span></span></div>

      <CSSTransition
        nodeRef={popupRef}
        in={popup.show}
        timeout={300}
        classNames={{
          enter: s.popup_enter,
          enterActive: s.popup_enter_active,
          exit: s.popup_exit,
          exitActive: s.popup_exit_active,
        }}
        unmountOnExit
      >
        <div
          ref={popupRef}
          style={{ display: "flex", flexDirection: "column" }}
          className={`${s.popup} ${popup.success ? s.success : s.error}`}
        >
          <p style={{ flex: "1" }}>{popup.message}</p>
          <button className={s.popup_button} onClick={handleRetry}>
            {popup.success ? "Сканировать новый товар" : "Попробовать снова"}
          </button>
        </div>
      </CSSTransition>

      <Footer />
    </div>
  );
};

export default QRScanner;
