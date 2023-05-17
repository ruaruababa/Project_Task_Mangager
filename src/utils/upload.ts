import axios from 'axios';
import {getAccessToken} from './auth';

const uploadURL = 'process.env.NEXT_PUBLIC_UPLOAD_API';

interface CallbackResponse {
    data?: Storage | any;
    percent: any;
}

export const uploadChunk = (
    file: Blob,
    callback: (input: any, data: CallbackResponse) => void,
) => {
    return new Promise((resolve) => {
        axios
            .post(
                uploadURL,
                {
                    file,
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
            })
            .catch((error) => {
                console.log('erro', error);
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
