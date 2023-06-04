import dayjs from 'dayjs';
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

export const getListTaskInProject = ({
    id,
    task_name,
    status_id,
    user_do,
    start_at,
    end_at,
}: any) => {
    const nameParams = `${task_name ? `name=${task_name}` : ''}`;
    const statusParams = `${
        status_id ? `${nameParams ? '&' : ''}status_id=${status_id}` : ''
    }`;
    const userDoParams = `${
        user_do
            ? `${nameParams || statusParams ? '&' : ''}assignee=${user_do}`
            : ''
    }`;
    const startAtParams = `${
        start_at
            ? `${nameParams || statusParams ? '&' : ''}start_at=${dayjs(
                  start_at,
              ).format('YYYY-MM-DD HH:mm')}`
            : ''
    }`;
    const endAtParams = `${
        end_at
            ? `${nameParams || statusParams ? '&' : ''}end_at=${dayjs(
                  end_at,
              ).format('YYYY-MM-DD HH:mm')}`
            : ''
    }`;
    const params = `${nameParams && nameParams}${statusParams && statusParams}${
        startAtParams && startAtParams
    }${endAtParams && endAtParams}${userDoParams && userDoParams}`;

    return baseAPIRequest.get(`api/projects/1/tasks?${params}`);
};

export const getListDragDrop = (id: any) => {
    return baseAPIRequest.get(`api/projects/${id}/tasks/kanban`);
};

export const createProject = (values: any) => {
    return baseAPIRequest.post(`api/projects`, values);
};

export const updateProject = (values: any, id: any) => {
    return baseAPIRequest.patch(`api/projects/${id}`, values);
};

export const removeProject = (id: any) => {
    return baseAPIRequest.delete(`api/projects/${id}`);
};

export const filterProject = ({
    name,
    status_id,
    start_at,
    end_at,
    page,
}: any) => {
    const nameParams = `${name ? `name=${name}` : ''}`;
    const statusParams = `${status_id ? `&status_id=${status_id}` : ''}`;
    const startAtParams = `${start_at ? `&start_at=${start_at}` : ''}`;
    const endAtParams = `${end_at ? `&end_at=${end_at}` : ''}`;
    const params = `${nameParams && nameParams}${statusParams && statusParams}${
        startAtParams && startAtParams
    }${endAtParams && endAtParams}`;

    return baseAPIRequest.get(
        `api/projects${params && `?${params}`}${
            !params ? `?page=${page}&per_page=10` : ''
        }`,
    );
};

export const filterTask = ({
    id,
    task_name,
    status_id,
    user_do,
    start_at,
    end_at,
}: any) => {
    const nameParams = `${task_name ? `name=${task_name}` : ''}`;
    const statusParams = `${
        status_id ? `${nameParams ? '&' : ''}status_id=${status_id}` : ''
    }`;
    const userDoParams = `${
        user_do
            ? `${nameParams || statusParams ? '&' : ''}assignee=${user_do}`
            : ''
    }`;
    const startAtParams = `${
        start_at
            ? `${nameParams || statusParams ? '&' : ''}start_at=${dayjs(
                  start_at,
              ).format('YYYY-MM-DD HH:mm')}`
            : ''
    }`;
    const endAtParams = `${
        end_at
            ? `${nameParams || statusParams ? '&' : ''}end_at=${dayjs(
                  end_at,
              ).format('YYYY-MM-DD HH:mm')}`
            : ''
    }`;
    const params = `${nameParams && nameParams}${statusParams && statusParams}${
        startAtParams && startAtParams
    }${endAtParams && endAtParams}${userDoParams && userDoParams}`;

    return baseAPIRequest.get(`api/projects/${id}/tasks/kanban?${params}`);
};
