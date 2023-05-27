import axios from 'axios';
import {getAccessToken} from './auth';

export const baseURL = 'http://103.90.227.166:2100';

export const baseAPIRequest = axios.create({
    baseURL: 'http://103.90.227.166:2100',
    headers: {
        authorization: 'Bearer ' + getAccessToken(),
    },
});
