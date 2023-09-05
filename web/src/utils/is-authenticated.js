export const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('token');
    return accessToken;
};
