import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {getMe} from '../services/user';

const useProfile = () => {
    const {data: getMeResponse} = useQuery({
        queryKey: ['getMe'],
        queryFn: getMe,
    });

    const userProfile = useMemo(() => {
        return getMeResponse?.data?.data;
    }, [getMeResponse]);
    return {
        userProfile,
    };
};

export default useProfile;
