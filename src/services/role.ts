import {baseAPIRequest} from '../utils/service';

export const getListRole = () => {
    return baseAPIRequest.get(`api/roles`);
};
