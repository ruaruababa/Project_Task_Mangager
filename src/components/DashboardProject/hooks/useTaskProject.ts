import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {getListTaskInProject} from '../../../services/project';
import {getDetailTaskInProject} from '../../../services/tasks';

const useTaskInProject = () => {
    const {id, taskId} = useParams();

    console.log('id', id);
    console.log('taskId', taskId);

    const {data: taskInProjectResponse} = useQuery({
        queryKey: ['getListTaskInProject', id],
        queryFn: () => getListTaskInProject(id),
    });



    const taskInProjects = useMemo(() => {
        return taskInProjectResponse?.data?.data || [];
    }, [taskInProjectResponse]);

    return {
        taskInProjects,
    };
};

export default useTaskInProject;
