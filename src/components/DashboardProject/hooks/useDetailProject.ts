import {useQuery} from '@tanstack/react-query';
import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getDetailProject, getHistoryProject} from '../../../services/project';

const useDetailProject = () => {
    const [idProject, setIdProject] = useState<any>(1);
    const {id} = useParams();
    useEffect(() => {
        if (id) {
            setIdProject(id);
        }
    }, [id]);

    const {data: detailProjectResponse} = useQuery({
        queryKey: ['getDetailProject', idProject],
        queryFn: () => getDetailProject(idProject),
    });

    const {data: historyResponse} = useQuery({
        queryKey: ['getHistoryProject', idProject],
        queryFn: () => getHistoryProject(idProject),
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
        };
    }, [detailProject]);

    return {
        detailProject,
        detailToUpdate,
        historyList,
    };
};

export default useDetailProject;
