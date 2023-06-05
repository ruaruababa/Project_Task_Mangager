import {useQuery} from '@tanstack/react-query';
import {useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getListTaskInProject} from '../../../services/project';

const useTaskInProject = () => {
    const {id, taskId} = useParams();
    const [values, setValues] = useState<any>('');

    const {data: taskFilterResponse} = useQuery({
        queryKey: ['getListTaskInProject', id, values],
        queryFn: () => getListTaskInProject({id, ...values}),
        keepPreviousData: true,
    });

    const total = useMemo(() => {
        return taskFilterResponse?.data?.meta?.total || 0;
    }, [taskFilterResponse]);

    const taskInProjects = useMemo(() => {
        return taskFilterResponse?.data?.data || [];
    }, [taskFilterResponse]);

    return {
        setValues,
        taskInProjects,
        total,
        id,
    };
};

export default useTaskInProject;
