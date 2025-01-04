export const isTokenExpired = (): boolean => {
    const expiration = localStorage.getItem('token_expiration');
    return expiration ? Date.now() > parseInt(expiration, 10) : true;
}