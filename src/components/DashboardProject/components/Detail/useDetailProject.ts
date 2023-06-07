import {useQuery} from '@tanstack/react-query';
import dayjs from 'dayjs';
import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {
    getDetailProject,
    getHistoryProject,
} from '../../../../services/project';

const useDetailProject = () => {
    const {id} = useParams();

    const {data: detailProjectResponse} = useQuery({
        queryKey: ['getDetailProject', id],
        queryFn: () => getDetailProject(id),
    });

    const {data: historyResponse} = useQuery({
        queryKey: ['getHistoryProject', id],
        queryFn: () => getHistoryProject(id),
    });

    const historyList = useMemo(() => {
        return historyResponse?.data?.data || [];
    }, [historyResponse]);

    const detailProject = useMemo(() => {
        return detailProjectResponse?.data?.data || [];
    }, [detailProjectResponse]);

    const detailToUpdate = useMemo(() => {
        return {
            ...detailProject,
            status_id: detailProject?.status?.id,
            user_ids: detailProject?.users?.map((item: any) => {
                return item?.id;
            }),
            starts_at: dayjs(detailProject?.starts_at),
            ends_at: dayjs(detailProject?.ends_at),
        };
    }, [detailProject]);

    return {
        detailProject,
        detailToUpdate,
        historyList,
        id,
    };
};

export default useDetailProject;
