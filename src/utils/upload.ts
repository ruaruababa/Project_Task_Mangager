import {notification} from 'antd';
import axios from 'axios';
import {getAccessToken} from './auth';
const uploadURL = 'process.env.NEXT_PUBLIC_UPLOAD_API';

interface CallbackResponse {
    data?: Storage | any;
    percent: any;
}

const id = 1;
const imageUrl = `http://103.90.227.166:2100/api/users/${id}/avatar`;
const fileUrl = `http://103.90.227.166:2100/api/tasks/1/attach-files`;

export const uploadChunk = (
    id: any,
    file: any,
    callback: (input: any, data: CallbackResponse) => void,
) => {
    return new Promise((resolve) => {
        axios
            .post(
                fileUrl,
                {
                    attachments: [...file],
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: 'Bearer ' + getAccessToken(),
                    },
                },
            )
            .then((response) => {
                callback(null, {
                    percent: 100,
                    data: response.data,
                });
                resolve(response.data);
                notification.success({
                    message: 'Upload Thành công',
                });
                console.log('response.data', response.data);
            })
            .catch((error) => {
                console.log('error', error);
                const message = error?.response?.data?.message;
                if (message === 'File type not supported') {
                    return callback(new Error('Không hỗ trợ định dạng này'), {
                        percent: 0,
                        data: null,
                    });
                }
                callback(
                    new Error(
                        'Không thể tải lên file lúc này. Vui lòng thử lại sau',
                    ),
                    {
                        percent: 0,
                        data: null,
                    },
                );
            });
    });
};
