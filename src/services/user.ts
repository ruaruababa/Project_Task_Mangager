import {baseAPIRequest} from '../utils/service';

export const getListUserInProject = (id: any) => {
    return baseAPIRequest.get(`api/projects/${id}/users`);
};

export const getUsers = () => {
    return baseAPIRequest.get(`api/users/search`);
};

export const getListUserInSystem = (id: any) => {
    return baseAPIRequest.get(`api/users?page=${id}&per_page=10`);
};

export const createUser = (input: any) => {
    return baseAPIRequest.post('api/users', input);
};

export const getDetailUser = (id: any) => {
    return baseAPIRequest.get(`api/users/${id}`);
};

export const updateUser = (id: any, input: any) => {
    return baseAPIRequest.patch(`api/users/${id}id}`, input);
};
