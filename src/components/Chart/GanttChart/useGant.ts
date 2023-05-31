import {useQuery} from '@tanstack/react-query';
import React, {useMemo} from 'react';
import {ganttChartProject} from '../../../services/chart';

const useGant = () => {
    const [values, setValues] = React.useState<any>('');
    const {data: projectFilterResponse} = useQuery({
        queryKey: ['ganttChartProject', values],
        queryFn: () => ganttChartProject({...values}),
    });
    const data = useMemo(() => {
        return projectFilterResponse?.data?.data.map((item: any) => ({
            ...item,
            start: new Date(item.start),
            end: new Date(item.end),
        }));
    }, [projectFilterResponse?.data?.data]);
    return {data, setValues};
};

export default useGant;
