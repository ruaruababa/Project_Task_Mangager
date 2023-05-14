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

    console.log('detailProject', detailProject);

    return {
        detailProject,
    };
};

export default useDetailProject;
