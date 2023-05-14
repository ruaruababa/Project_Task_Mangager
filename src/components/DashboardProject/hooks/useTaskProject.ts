import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {getTaskinProject} from '../../../services/project';

const useTaskInProject = () => {
    const {id} = useParams();

    const {data: taskInProjectResponse} = useQuery({
        queryKey: ['getTaskinProject', id],
        queryFn: () => getTaskinProject(id),
    });

    const taskInProjects = useMemo(() => {
        return taskInProjectResponse?.data?.data || [];
    }, [taskInProjectResponse]);

    return {
        taskInProjects,
    };
};

export default useTaskInProject;
