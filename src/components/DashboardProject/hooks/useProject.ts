import {useQuery} from '@tanstack/react-query';
import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getDetailProject, getListProject} from '../../../services/project';

const useProject = () => {
    const [page, setPage] = useState(1);
    const [idProject, setIdProject] = useState('');
    const {id} = useParams();
    useEffect(() => {
        if (id) {
            setIdProject(id);
        }
    }, [id]);
    const {data: projectResponse} = useQuery({
        queryKey: ['getListProject', page],
        queryFn: () => getListProject(page),
        keepPreviousData: true,
    });

    const {data: detailProjectResponse} = useQuery({
        queryKey: ['getDetailProject', idProject],
        queryFn: () => getDetailProject(idProject),
    });

    const detailProject = useMemo(() => {
        return detailProjectResponse?.data?.data || [];
    }, [detailProjectResponse]);

    console.log('detailProject', detailProject);

    const projects = useMemo(() => {
        return projectResponse?.data?.data || [];
    }, [projectResponse]);

    console.log('projects', projects);

    const options = useMemo(() => {
        return projects.map((project: any) => {
            return {
                value: project.id,
                label: project.name,
            };
        });
    }, [projects]);

    const total = useMemo(() => {
        return projectResponse?.data?.meta?.total || 0;
    }, [projectResponse]);

    return {
        options,
        projects,
        detailProject,
        total,
        setPage,
        page,
    };
};

export default useProject;
