import {baseAPIRequest} from '../utils/service';

export const uploadAvatar = (id: any) => {
    return baseAPIRequest.post(`api/users/${id}/avatar`);
};
