import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { generatePKCE } from "../utils/generatePKCE";
import { redirectToSpotifyAuth } from "../utils/redirectToSpotifyAuth";
import { isTokenExpired } from "@/utils/checkTokenExpiration";
import { fetchAcessToken, refreshAccessToken } from "../api";

interface children {
    children: ReactNode
}

interface AuthContextProps {
    accessToken: string | null;
    isAuthenticated: boolean;
    login: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }

    return context;
}

export const AuthProvider = ({ children}: children) => {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("access_token"));
    const isAuthenticated =  useMemo(() => !!accessToken && !isTokenExpired(), [accessToken]);

    const login = async () => {
        const pkce = await generatePKCE();
        localStorage.setItem('code_verifier', pkce.codeVerifier);
        redirectToSpotifyAuth(pkce.codeChallenge);
    }

    const handleAuthCallback = async (code: string) => {
        const codeVerifier = localStorage.getItem("code_verifier");

        if (!codeVerifier) {
            console.error("Code verifier missing");
            return;
        }

        try {
            const tokenData = await fetchAcessToken(code, codeVerifier);
           
            setAccessToken(tokenData.access_token);
        } catch (error) {
            console.error('Failed to fetch tokens', error);
        }
    }

    useEffect(() => {
        const handleTokenRefresh = async () => {
            if (isTokenExpired() && localStorage.getItem('refresh_token')) {
                const token = await refreshAccessToken()
                setAccessToken(token.access_token);
            } else if (isTokenExpired()) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('token_expiration');
                setAccessToken(null);
            }
        }

        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            handleAuthCallback(code).then(() => {
                window.location.href = '/';
            });
        } else {
            handleTokenRefresh();
        }
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            const expiration = localStorage.getItem('token_expiration');
            const timeLeft = expiration ? parseInt(expiration, 10) - Date.now() : 0;

            if (timeLeft > 0) {
                const timer = setTimeout(async() => {
                    const token = await refreshAccessToken()
                    if (token) setAccessToken(token);
                }, timeLeft - 60 * 1000);
                
                return () => clearTimeout(timer)
            }
        }
    }, [isAuthenticated])

    return (
        <AuthContext.Provider value={{ accessToken, isAuthenticated, login }}>
            {children}
        </AuthContext.Provider>
    )
}