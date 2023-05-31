import {useQuery} from '@tanstack/react-query';
import React, {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {ganttChartTaskInProject} from '../../../services/chart';

const useGanttTask = () => {
    const {id} = useParams();
    const [values, setValues] = React.useState<any>('');
    const {data: taskFilterResponse} = useQuery({
        queryKey: ['ganttChartTaskInProject', id, values],
        queryFn: () => ganttChartTaskInProject({id, ...values}),
    });
    const data = useMemo(() => {
        return taskFilterResponse?.data?.data.map((item: any) => ({
            ...item,
            start: new Date(item.start),
            end: new Date(item.end),
        }));
    }, [taskFilterResponse]);
    return {data, setValues};
};

export default useGanttTask;
