import {useQuery} from '@tanstack/react-query';
import {useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getListUserInProject, getUsers} from '../services/user';
const useUser = () => {
    const {id} = useParams();
    const [page, setPage] = useState(1);
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

    const listUser = useMemo(() => {
        return listUserResponse?.data?.data || [];
    }, [listUserResponse]);

    return {listUser, users};
};

export default useUser;
