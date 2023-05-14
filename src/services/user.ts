import {baseAPIRequest} from '../utils/service';

export const getListUser = (id: any) => {
    return baseAPIRequest.get(`api/projects/${id}/users`);
};
