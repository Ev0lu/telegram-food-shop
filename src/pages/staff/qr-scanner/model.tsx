import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { BrowserMultiFormatReader } from "@zxing/library";

interface Product {
  entry_id: string;
  title: string;
  description: string;
  product_quantity: string;
  stock_quantity: number;
  price: number;
  max_points: number;
  picture_url: string;
}

interface ScanResponse {
  entry_id: string;
  price: number;
  points_spent: number;
  creation_date: string;
  money_spent: number;
  products: Product[];
}

export const useScanOrder = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanData, setScanData] = useState<ScanResponse | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    if (webcamRef.current && webcamRef.current.video) {
      const videoElement = webcamRef.current.video;
      codeReader.decodeFromVideoDevice(null, videoElement, async (result) => {
        if (result) {
          const barcode = result.getText();
          setScannedCode(barcode);
          try {
            const response = await fetch(`https://bot5ka.ru/api/v1/orders/${barcode}`, {
              headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
              const data = await response.json();
              setScanData(data.order);
              setShowPopup(true);
            } else {
              setError("Ошибка на сервере. Попробуйте снова.");
            }
          } catch (error) {
            console.error(error);
            setError("Ошибка сети при отправке данных.");
          }
        }
      });
    }
    return () => {
      codeReader.reset();
    };
  }, []);

  return {
    webcamRef,
    scannedCode,
    error,
    scanData,
    showPopup,
    setShowPopup,
  };
};
