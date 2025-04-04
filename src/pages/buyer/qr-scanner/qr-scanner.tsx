import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { BrowserMultiFormatReader } from "@zxing/library";
import { CSSTransition } from "react-transition-group";
import s from "./qr-scanner.module.css";
import Footer from "@/shared/footer/footer";
import { getToken } from "@/app/app";

const QRScanner = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const popupRef = useRef(null);
  const [, setScannedCode] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSuccess, setPopupSuccess] = useState(false);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    if (webcamRef.current && webcamRef.current.video) {
      const videoElement = webcamRef.current.video;

      codeReader.decodeFromVideoDevice(null, videoElement, async (result) => {
        if (result) {
          const scannedText = result.getText();
          setScannedCode(scannedText);

          const parsedData = parseQRCode(scannedText);
          if (!parsedData) {
            setPopupMessage("Ошибка: неверный формат QR-кода.");
            setPopupSuccess(false);
            setShowPopup(true);
            return;
          }

          try {
            const response = await fetch("https://bot5ka.ru/api/v1/users/scaner/verify", {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                "Authorization": `${getToken('access')}`
              },
              body: JSON.stringify(parsedData),
            });

            if (response.ok) {
              setPopupMessage("QR-код успешно обработан!");
              setPopupSuccess(true);
            } else {
              setPopupMessage("Ошибка на сервере. Попробуйте снова.");
              setPopupSuccess(false);
            }
          } catch {
            setPopupMessage("Ошибка сети при отправке данных.");
            setPopupSuccess(false);
          }

          setShowPopup(true);
        }
      });
    }

    return () => {
      codeReader.reset();
    };
  }, []);

  const parseQRCode = (text: string) => {
    const params = new URLSearchParams(text.replace(/\?/g, "&"));
    const fn = params.get("fn");
    const fp = params.get("fp");
    const fd = params.get("i");
    
    if (!fn || !fp || !fd) return null;
    
    return {
      fn,
      fp,
      fd: parseInt(fd, 10),
    };
  };

  const handleRetry = () => {
    setShowPopup(false);
    setScannedCode(null);
  };

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
        in={showPopup}
        timeout={300}
        classNames={{
          enter: s.popup_enter,
          enterActive: s.popup_enter_active,
          exit: s.popup_exit,
          exitActive: s.popup_exit_active,
        }}
        unmountOnExit
      >
        <div ref={popupRef} style={{display: 'flex', flexDirection: 'column'}} className={`${s.popup} ${popupSuccess ? s.success : s.error}`}>
          <p style={{flex: '1'}}>{popupMessage}</p>
          <button className={s.popup_button} onClick={handleRetry}>
            {popupSuccess ? "Сканировать новый товар" : "Попробовать снова"}
          </button>
        </div>
      </CSSTransition>

      <Footer />
    </div>
  );
};

export default QRScanner;
