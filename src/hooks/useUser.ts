import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {getListUserInProject, getUsers} from '../services/user';
const useUser = () => {
    const {id} = useParams();
    const {data: listUserResponse} = useQuery({
        queryKey: ['getListUserInProject', id],
        queryFn: () => getListUserInProject(id),
    });

    const {data: userResponse} = useQuery({
        queryKey: ['getUsers'],
        queryFn: () => getUsers(),
    });

    const users = useMemo(() => {
        return userResponse?.data?.data || [];
    }, [userResponse]);

    const optionsUser: any = users?.map((user: any) => ({
        label: user.name,
        value: user.id,
    }));

    const listUser = useMemo(() => {
        return listUserResponse?.data?.data || [];
    }, [listUserResponse]);

    return {listUser, users, optionsUser};
};

export default useUser;
