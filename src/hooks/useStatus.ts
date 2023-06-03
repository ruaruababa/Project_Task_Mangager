import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {getListStatus} from '../services/status';
const useStatus = () => {
    const {data: listStatusResponse} = useQuery({
        queryKey: ['getListStatus'],
        queryFn: getListStatus,
    });

    const listStatus = useMemo(() => {
        return listStatusResponse?.data?.data || [];
    }, [listStatusResponse]);

    const statusOptions = useMemo(() => {
        return listStatus.map((status: any) => {
            return {
                value: status.id,
                label: status.name,
            };
        });
    }, [listStatus]);

    return {listStatus, statusOptions};
};

export default useStatus;
