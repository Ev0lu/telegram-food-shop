import { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { BrowserMultiFormatReader } from '@zxing/library';
import { CSSTransition } from 'react-transition-group';
import s from './qr-scanner.module.css';
import Footer from '@/shared/footer/footer';

const QRScanner = () => {
  const webcamRef = useRef<any>(null);
  const [scannedCode, setScannedCode] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupSuccess, setPopupSuccess] = useState(false);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    const interval = setInterval(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          reader.decodeFromImage(undefined, imageSrc)
            .then(result => {
              if (result) {
                handleScan(result.getText());
              }
            })
            .catch(err => {
              console.log('Не удалось распознать код', err);
            });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleScan = (code: any) => {
    setScannedCode(code);
    fetch('/api/scan', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ barcode: code })
    })
    .then(response => {
      if (response.ok) {
        setPopupMessage('Все успешно!');
        setPopupSuccess(true);
      } else {
        setPopupMessage('Не удалось отсканировать');
        setPopupSuccess(false);
      }
      setShowPopup(true);
    })
    .catch(() => {
      setPopupMessage('Ошибка при отправке данных');
      setPopupSuccess(false);
      setShowPopup(true);
    });
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
        videoConstraints={{
          facingMode: { exact: "environment" }, // Включение задней камеры
        }}   
      />
      <div className={s.scan_frame}><span></span></div>
      <CSSTransition
        in={showPopup}
        timeout={3000}
        classNames={{
            enter: s.popup_enter,
            enterActive: s.popup_enter_active,
            exit: s.popup_exit,
            exitActive: s.popup_exit_active,
          }}
        unmountOnExit
      >
        <div className={`${s.popup} ${popupSuccess ? s.success : s.error}`}>
          <p>{popupMessage}</p>
          {!popupSuccess ? (
            <button onClick={handleRetry}>Попробовать снова</button>
          ) : (
            <div className={s.popup_wrapper}>
                <button onClick={handleRetry}>Сканировать новый товар</button>
                <button onClick={handleRetry}>На главную</button>
            </div>
          )}
        </div>
      </CSSTransition>
      <Footer />
    </div>
  );
};

export default QRScanner;
