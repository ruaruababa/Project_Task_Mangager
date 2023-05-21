import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {getListPermissions} from '../services/role';
const usePermission = () => {
    const {data: permissionResponse} = useQuery({
        queryKey: ['getListPermissions'],
        queryFn: () => getListPermissions(),
    });

    const permissions = useMemo(() => {
        return permissionResponse?.data?.data || [];
    }, [permissionResponse]);

    return {permissions};
};

export default usePermission;
