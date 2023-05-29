import {TaskDto} from '../types/task.dto';
import {baseAPIRequest, baseURL} from '../utils/service';
export const getMyTasks = (page: any) => {
    return baseAPIRequest.get(`api/tasks?page=${page}&per_page=10`);
};

export const getDetailTaskInProject = (id: any, taskId: any) => {
    return baseAPIRequest.get(`api/projects/${id}/tasks/${taskId}`);
};

export const createTaskInProject = (input: any, id: any) => {
    return baseAPIRequest.post(`api/projects/${id}/tasks`, input);
};
export const updateTaskInproject = (input: any, id: any, taskId: any) => {
    return baseAPIRequest.patch(`api/projects/${id}/tasks/${taskId}`, input);
};

export const createTask = (input: TaskDto) => {
    return baseAPIRequest.post('tasks', input);
};

export const removeTask = (id: string) => {
    return baseAPIRequest.delete('tasks/' + id);
};

export const updateTask = (id: string, data: TaskDto) => {
    return baseAPIRequest.put('tasks/' + id, data);
};

export const removeReportFile = (taskId: any) => {
    return baseAPIRequest.delete(`/api/tasks/${taskId}/report`);
};

export const uploadReportFile = (taskId: any) => {
    return baseURL + `/api/tasks/${taskId}/report`;
};

export const uploadAttachFile = (taskId: any) => {
    return baseURL + `/api/tasks/${taskId}/attach-files`;
};

export const removeAttachFile = (taskId: any, fileId: any) => {
    return baseAPIRequest.delete(`/api/tasks/${taskId}/detach-file/${fileId}`);
};

export const filterMyTask = ({name, taskName, start_at, end_at, page}: any) => {
    const nameParams = `${name ? `name=${name}` : ''}`;
    const taskNameParams = `${
        taskName ? `${nameParams ? '&' : ''}task_name=${taskName}` : ''
    }`;
    const startAtParams = `${
        start_at
            ? `${nameParams || taskNameParams ? '&' : ''}start_at=${start_at}`
            : ''
    }`;
    const endAtParams = `${
        end_at
            ? `${nameParams || taskNameParams ? '&' : ''}end_at=${end_at}`
            : ''
    }`;
    const params = `${nameParams && nameParams}${
        taskNameParams && taskNameParams
    }${startAtParams && startAtParams}${endAtParams && endAtParams}`;

    return baseAPIRequest.get(`api/tasks?page=${page}&per_page=10&${params}`);
};
