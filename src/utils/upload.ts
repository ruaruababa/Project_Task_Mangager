import {notification} from 'antd';
import axios from 'axios';
import {getAccessToken} from './auth';

export const uploadChunk = (file: any, url: string, fieldName: string) => {
    return new Promise((resolve) => {
        axios
            .post(
                url,
                {
                    [fieldName]: file,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: 'Bearer ' + getAccessToken(),
                    },
                },
            )
            .then((response) => {
                resolve(response.data);
                notification.success({
                    message: 'Upload Thành công',
                });
                console.log('response.data', response.data);
            })
            .catch((error) => {
                console.log('error', error);
            });
    });
};
