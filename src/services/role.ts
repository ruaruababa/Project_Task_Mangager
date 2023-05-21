import {baseAPIRequest} from '../utils/service';

export const getListRole = () => {
    return baseAPIRequest.get(`api/roles`);
};
export const getListPermissions = () => {
    return baseAPIRequest.get(`api/permissions`);
};
