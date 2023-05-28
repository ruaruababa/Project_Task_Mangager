import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {filterTask} from '../../../../services/project';

const useFilterTask = ({values}: any) => {
    const {id} = useParams();

    console.log('values', values);
    const {data: taskFilterResponse} = useQuery({
        queryKey: ['filterTask', id, values],
        queryFn: () => filterTask(values),
        enabled: !!values,
    });

    const tasksFilter = useMemo(() => {
        return taskFilterResponse?.data?.data || [];
    }, [taskFilterResponse]);
    return {
        tasksFilter,
    };
};

export default useFilterTask;
