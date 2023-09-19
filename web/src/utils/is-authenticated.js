export const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem("token");
    return accessToken;
};

export const isAuthenticatedQuery = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get("token");
    return accessToken;
};
