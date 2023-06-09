import {notification} from 'antd';
import axios from 'axios';
import {getAccessToken, removeAccessToken} from './auth';

export const baseURL = 'http://103.90.227.166:2100';

export const baseAPIRequest = axios.create({
    baseURL: 'http://103.90.227.166:2100',
    headers: {
        authorization: 'Bearer ' + getAccessToken(),
    },
    validateStatus(status) {
        if (status === 401) {
            notification.error({
                message: 'Thông báo',
                description: 'Phiên đăng nhập đã hết hạn',
            });
            removeAccessToken();
            window.location.href = '/';
        }
        return status >= 200 && status < 400;
    },
});

export const secondBaseAPIRequest = axios.create({
    baseURL: 'http://103.90.227.166:2100',
});

