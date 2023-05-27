import {baseAPIRequest} from '../utils/service';

export const getListRole = () => {
    return baseAPIRequest.get(`api/roles`);
};

export const getListPermissions = () => {
    return baseAPIRequest.get(`api/permissions`);
};

export const createRole = (input: any) => {
    return baseAPIRequest.post(`api/roles`, input);
};

export const getDetailRole = (id: any) => {
    return baseAPIRequest.get(`api/roles/${id}`);
};

export const updateRole = (id: any, input: any) => {
    return baseAPIRequest.patch(`api/roles/${id}`, input);
};

export const removeRole = (id: any) => {
    return baseAPIRequest.delete(`api/roles/${id}`);
};
