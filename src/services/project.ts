import {baseAPIRequest} from '../utils/service';

export const getListProject = (page: any) => {
    return baseAPIRequest.get(`api/projects?page=${page}&per_page=10`);
};

export const getDetailProject = (id: any) => {
    return baseAPIRequest.get(`api/projects/${id}`);
};

export const updateTask = (
    input: {
        name?: string;
        description?: string;
        duration?: string;
        status_id?: any;
        pending_reason?: any;
        user_ids?: any;
    },
    id: any,
    isTask: any,
) => {
    return baseAPIRequest.patch(`api/projects/${id}/tasks/${isTask}`, input);
};

export const getTaskinProject = (id: any) => {
    return baseAPIRequest.get(`api/projects/${id}/tasks`);
};

export const getListDragDrop = (id: any) => {
    return baseAPIRequest.get(`api/projects/${id}/tasks/kanban`);
};

export const createProject = (values: any) => {
    return baseAPIRequest.post(`api/projects`, values);
};
