export const redirectToSpotifyAuth = (codeChallenge) => {
    const clientId = `${import.meta.env.VITE_CLIENT_ID}`;
    const redirectUri = `${import.meta.env.VITE_REDIRECT_URI}`;
    const scope = [
        'user-read-private',
        'user-read-email',
        'user-top-read',
        'user-read-recently-played'
    ].join(" ");
    const authUrl = new URL(`${import.meta.env.VITE_AUTH_URL}`);

    const params = {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}