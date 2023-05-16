import {baseAPIRequest} from '../utils/service';

export const getListUserInProject = (id: any) => {
    return baseAPIRequest.get(`api/projects/${id}/users`);
};

export const getUsers = () => {
    return baseAPIRequest.get(`api/users/search`);
};
