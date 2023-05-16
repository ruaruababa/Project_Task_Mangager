import {TaskDto} from '../types/task.dto';
import {baseAPIRequest} from '../utils/service';

export const getMyTasks = (page: any) => {
    return baseAPIRequest.get(`api/tasks?page=${page}&per_page=10`);
};

export const getDetailTaskInProject = (id: any, taskId: any) => {
    return baseAPIRequest.get(`project/${id}/tasks/${taskId}`);
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
