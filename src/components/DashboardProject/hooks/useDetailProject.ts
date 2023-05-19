import {useQuery} from '@tanstack/react-query';
import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getDetailProject} from '../../../services/project';

const useDetailProject = () => {
    const [idProject, setIdProject] = useState('');
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

    const detailProject = useMemo(() => {
        return detailProjectResponse?.data?.data || [];
    }, [detailProjectResponse]);


    const detailToUpdate = useMemo(() => {
        return {
            ...detailProject,
            status_id: {
                label: detailProject?.status?.name,
                value: detailProject?.status?.id,
            },
            user_ids: detailProject?.users?.map((item: any) => {
                return {
                    label: item?.name,
                    value: item?.id,
                };
            }),
        };
    }, [detailProject]);

    return {
        detailProject,
        detailToUpdate,
    };
};

export default useDetailProject;
