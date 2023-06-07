import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {ganttChartTaskInProject} from '../../services/chart';

const useFilterTask = ({values}: any) => {
    const {id} = useParams();

    const {data: taskFilterResponse} = useQuery({
        queryKey: ['ganttChartTaskInProject', id, values],
        queryFn: () => ganttChartTaskInProject(values),
    });

    const tasksFilter = useMemo(() => {
        return taskFilterResponse?.data?.data || [];
    }, [taskFilterResponse]);
    return {
        tasksFilter,
    };
};

export default useFilterTask;
