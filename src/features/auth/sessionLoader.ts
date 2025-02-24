import { isTokenExpired, getToken, setToken } from "@/app/app";

const refreshTokens = async (refresh_token: string) => {
    const data = {
        refresh_token,
    };

    const response = await fetch("https://bot5ka.ru/api/v1/auth/refreshToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to refresh tokens");

    return response.json();
};

export const sessionLoader = async () => {
    const searchParams = new URLSearchParams(location.search);
    if (!sessionStorage.getItem('telegram_id')) {
        if (!searchParams.get('telegram_id')) {
            const data: { status: string } = {
                status: "unauthorized"
            };
            
            (window as any).Telegram?.WebApp.sendData(JSON.stringify(data));
            (window as any).Telegram?.WebApp.close();

        } else {
            sessionStorage.setItem('telegram_id', `${searchParams.get('telegram_id')}`)          
        }
    }
    if (isTokenExpired("access")) {
        const refreshToken = getToken("refresh");
        if (refreshToken) {
            try {
                const { access_token, refresh_token: new_refresh_token } = await refreshTokens(refreshToken);
                setToken("access", access_token);
                setToken("refresh", new_refresh_token);
            } catch (error) {
            }
        } else {
            if (searchParams.get('access_token')) {
                setToken("access", searchParams.get('access_token'));
                setToken("refresh", searchParams.get('refresh_token'));
                sessionStorage.setItem('telegram_id', `${searchParams.get('telegram_id')}`)
            } else {
                const data: { status: string } = {
                    status: "unauthorized"
                };
                
                (window as any).Telegram?.WebApp.sendData(JSON.stringify(data));
                (window as any).Telegram?.WebApp.close();
            }
        }

    }
    return true;
};