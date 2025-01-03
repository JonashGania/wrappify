import axios from 'axios';

export const fetchAcessToken = async (code, codeVerifier) => {
    const clientId = `${import.meta.env.VITE_CLIENT_ID}`;
    const redirectUri = `${import.meta.env.VITE_REDIRECT_URI}`;
    const tokenUrl = `${import.meta.env.VITE_TOKEN_URL}`;

    try {
        const response = await axios.post(
            tokenUrl, 
            new URLSearchParams({
                client_id: clientId,
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        )

        return response.data;
    } catch (error) {
        console.error("Error fetching access token:", error);
        throw error;
    }
}