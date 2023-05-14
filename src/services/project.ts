import {baseAPIRequest} from '../utils/service';

export const getListProject = (page: any) => {
    return baseAPIRequest.get(`api/projects?page=${page}&per_page=10`);
};

export const getDetailProject = (id: any) => {
    return baseAPIRequest.get(`api/projects/${id}`);
};

export const createComputer = (input: {
    name?: string;
    customer_name?: string;
    code?: string;
    starts_at?: any;
    ends_at?: string;
    duration?: string;
    status_id?: string;
    assigned_user_ids?: any;
}) => {
    return baseAPIRequest.post('api/projects/1/tasks/1', input);
};

export const getTaskinProject = (id: any) => {
    return baseAPIRequest.get(`api/projects/${id}/tasks`);
};
