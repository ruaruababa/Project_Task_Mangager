import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {getListUser} from '../services/user';
const useUser = () => {
    const {id} = useParams();
    const {data: listUserResponse} = useQuery({
        queryKey: ['getListUser', id],
        queryFn: () => getListUser(id),
    });

    const listUser = useMemo(() => {
        return listUserResponse?.data?.data || [];
    }, [listUserResponse]);


    return {listUser};
};

export default useUser;
