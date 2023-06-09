export const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export const setAccessToken = (token: string) => {
    return localStorage.setItem('access_token', token);
};

export const removeAccessToken = () => {
    return localStorage.removeItem('access_token');
};
