import {baseAPIRequest} from '../utils/service';

export const ganttChartProject = ({name, status_id, start_at, end_at}: any) => {
    const nameParams = `${name ? `name=${name}` : ''}`;
    const statusParams = `${status_id ? `&status_id=${status_id}` : ''}`;
    const startAtParams = `${start_at ? `&start_at=${start_at}` : ''}`;
    const endAtParams = `${end_at ? `&end_at=${end_at}` : ''}`;
    const params = `${nameParams && nameParams}${statusParams && statusParams}${
        startAtParams && startAtParams
    }${endAtParams && endAtParams}`;

    console.log('params', params);

    return baseAPIRequest.get(`api/projects/gantt-chart?${params}`);
};

export const ganttChartTaskInProject = ({
    id,
    task_name,
    status_id,
    user_do,
}: any) => {
    const nameParams = `${task_name ? `name=${task_name}` : ''}`;
    const statusParams = `${
        status_id ? `${nameParams ? '&' : ''}status_id=${status_id}` : ''
    }`;
    const startAtParams = `${
        user_do
            ? `${nameParams || statusParams ? '&' : ''}assignee=${user_do}`
            : ''
    }`;
    const params = `${nameParams && nameParams}${statusParams && statusParams}${
        startAtParams && startAtParams
    }`;

    console.log('params', params);
    console.log('sId', id);

    return baseAPIRequest.get(`api/projects/${id}/tasks/gantt-chart?${params}`);
};
