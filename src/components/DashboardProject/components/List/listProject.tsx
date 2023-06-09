import {useQuery} from '@tanstack/react-query';
import {Button} from 'antd';
import {useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useProfile from '../../../../hooks/useProfile';
import useStatus from '../../../../hooks/useStatus';
import {filterProject} from '../../../../services/project';
import FilterProject from '../../../Filter/filterListProject';
import Pagination from '../../../Pagination';
import Item from '../Item/item';
const ProjectManager = () => {
    const {statusOptions} = useStatus();
    const router = useNavigate();
    const [values, setValues] = useState<any>();

    const [page, setPage] = useState(1);
    const {userProfile} = useProfile();

    const {data: projectFilterResponse} = useQuery({
        queryKey: ['filterProject', page, values],
        queryFn: () => filterProject({...values, page}),
        keepPreviousData: true,
    });

    const listProject = useMemo(() => {
        return projectFilterResponse?.data?.data || [];
    }, [projectFilterResponse]);

    const totalProject = useMemo(() => {
        return projectFilterResponse?.data?.meta?.total || 0;
    }, [projectFilterResponse]);

    const canCreateProject = userProfile?.permissions?.includes('project:create');

    return (
        <>
            <div className="mb-10">
                <div className="flex justify-end gap-3 mb-5">
                    <Button
                        type="primary"
                        onClick={() => router(`/project/gantt-chart`)}
                        size="large"
                    >
                        Biểu đồ Gantt
                    </Button>
                    {canCreateProject && (
                        <Button
                            className="text-white bg-blue-600"
                            onClick={() => router(`/project/create`)}
                            size="large"
                        >
                            Thêm mới dự án
                        </Button>
                    )}
                </div>

                <div className="text-lg">
                    <span
                        onClick={() => {
                            router('/');
                        }}
                        className="font-semibold text-gray-400 cursor-pointer hover:text-blue-500"
                    >
                        Trang chủ
                    </span>
                    {' / '}
                    <span className="font-semibold">Danh sách dự án</span>
                </div>
            </div>
            <div className="flex flex-col ">
                <FilterProject
                    statusOptions={statusOptions}
                    setValues={setValues}
                    setPage={setPage}
                    page={page}
                />
                <div className="flex flex-col gap-4">
                    {listProject?.map((project: any) => {
                        return <Item data={project} />;
                    })}
                </div>
            </div>
            <div className="!bg-[#F5F5F5] mt-10">
                <Pagination
                    currentPage={page}
                    totalCount={totalProject}
                    pageSize={10}
                    onPageChange={(page: any) => setPage(page)}
                />
            </div>
        </>
    );
};

export default ProjectManager;
