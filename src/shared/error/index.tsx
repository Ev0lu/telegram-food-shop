import { Link, useLocation } from "react-router-dom";
import s from "./index.module.css";

export default function ErrorPage() {
    // const error = useRouteError() as { status?: number; statusText?: string; message?: string };
    const location = useLocation();    
    const isStaff = location.pathname.startsWith("/staff");

    return (
        <div className={s.errorContainer}>
            <h1>Ой! Что-то пошло не так 😢</h1>
            <p>Вернитесь на главную или перезапустите приложение</p>
            <Link to={isStaff ? "/staff/scanner" : "/"} className={s.errorButton}>Вернуться на главную</Link>
        </div>
    );
}