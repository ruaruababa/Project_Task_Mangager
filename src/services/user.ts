import {baseAPIRequest} from '../utils/service';

export const getListUserInProject = (id: any) => {
    return baseAPIRequest.get(`api/projects/${id}/users`);
};

export const getUsers = (page: any) => {
    return baseAPIRequest.get(`api/users?page=${page}&per_page=10`);
};
