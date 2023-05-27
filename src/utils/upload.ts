import {notification} from 'antd';
import axios from 'axios';
import {getAccessToken} from './auth';

interface CallbackResponse {
    data?: Storage | any;
    percent: any;
}

const fileUrl = (id: any) => {
    return `http://103.90.227.166:2100/api/tasks/${id}/attach-files`;
};

export const uploadChunk = (file: any, url: string, fieldName: string) => {
    console.log('file', file);
    console.log('fieldName', fieldName);
    console.log('length', typeof file);
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
                const message = error?.response?.data?.message;
            });
    });
};
