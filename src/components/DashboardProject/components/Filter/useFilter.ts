import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {filterProject} from '../../../../services/project';

const useFilter = ({values}: any) => {
    const {data: projectFilterResponse} = useQuery({
        queryKey: ['filterProject', values],
        queryFn: () => filterProject(values),
        enabled: !!values,
    });

    const projectsFilter = useMemo(() => {
        return projectFilterResponse?.data?.data || [];
    }, [projectFilterResponse]);
    return {
        projectsFilter,
    };
};

export default useFilter;
