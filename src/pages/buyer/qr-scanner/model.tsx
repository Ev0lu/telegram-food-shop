import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import Webcam from "react-webcam";
import { getToken } from "@/app/app";

/**
 * Parses a QR code string and returns an object with parameters.
 * Returns null if the format is invalid.
 * 
 * @param text - QR code data string
 * @returns object containing fn, fp, and fd or null
 */

export interface PopupState {
    show: boolean;
    message: string;
    success: boolean;
}

export const useQRScanner = () => {
    const webcamRef = useRef<Webcam | null>(null);
    const popupRef = useRef(null);
    const [, setScannedCode] = useState<string | null>(null);
    const [popup, setPopup] = useState<PopupState>({
        show: false,
        message: "",
        success: false,
    });

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
                        setPopup({
                            show: true,
                            message: "Ошибка: неверный формат QR-кода.",
                            success: false,
                        });
                        return;
                    }

                    try {
                        const response = await fetch("https://bot5ka.ru/api/v1/users/scaner/verify", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `${getToken("access")}`,
                            },
                            body: JSON.stringify(parsedData),
                        });

                        if (response.ok) {
                            setPopup({
                                show: true,
                                message: "QR-код успешно обработан!",
                                success: true,
                            });
                        } else {
                            setPopup({
                                show: true,
                                message: "Ошибка на сервере. Попробуйте снова.",
                                success: false,
                            });
                        }
                    } catch {
                        setPopup({
                            show: true,
                            message: "Ошибка сети при отправке данных.",
                            success: false,
                        });
                    }
                }
            });
        }

        return () => {
            codeReader.reset();
        };
        // eslint-disable-next-line
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
        setPopup({ show: false, message: "", success: false });
        setScannedCode(null);
    };

    return {
        webcamRef,
        popupRef,
        popup,
        handleRetry,
    };
};
