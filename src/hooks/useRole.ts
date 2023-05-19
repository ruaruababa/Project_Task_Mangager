import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {getListRole} from '../services/role';
const useRole = () => {
    const {data: listRoleResponse} = useQuery({
        queryKey: ['getListRole'],
        queryFn: getListRole,
    });

    const roles = useMemo(() => {
        return listRoleResponse?.data?.data || [];
    }, [listRoleResponse]);

    const roleOptions = useMemo(() => {
        return roles.map((item: any) => {
            return {
                label: item?.name,
                value: item?.id?.toString(),
            };
        });
    }, [roles]);

    return {roles, roleOptions};
};

export default useRole;
