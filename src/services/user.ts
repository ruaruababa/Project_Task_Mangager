import {baseAPIRequest, baseURL} from '../utils/service';
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

export const getListNoti = (cursor?: any) => {
    return baseAPIRequest.get(
        `api/notifications?per_page=5${cursor ? `&cursor=${cursor}` : ''}`,
    );
};

export const markReadNoti = (id: any) => {
    return baseAPIRequest.post(`api/notifications/${id}/marks-as-read`);
};

export const markReadAllNoti = () => {
    return baseAPIRequest.post(`api/notifications/marks-all-as-read`);
};

export const getMe = () => {
    return baseAPIRequest.get(`api/profile`);
};

export const updateProfile = (input: any) => {
    return baseAPIRequest.patch(`api/profile`, input);
};

export const uploadAvatarPropfile = () => {
    return baseURL + `/api/profile/avatar`;
};

export const updateAvatarUser = (id: any) => {
    return baseURL + `/api/users/${id}/avatar`;
};

export const filterUser = ({userName, email, page}: any) => {
    console.log('page', page);
    const nameParam = `${userName ? `name=${userName}` : ''}`;
    const emailParam = `${
        email ? `${nameParam ? '&' : ''}email=${email}` : ''
    }`;

    const params = `${nameParam && nameParam}${emailParam && emailParam}`;

    return baseAPIRequest.get(
        `api/users?${params}&${!params && `page=${page}&per_page=10`}`,
    );
};
