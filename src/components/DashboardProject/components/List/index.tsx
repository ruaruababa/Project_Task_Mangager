import {useQuery} from '@tanstack/react-query';
import {Button, Form} from 'antd';
import {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useStatus from '../../../../hooks/useStatus';
import {filterProject} from '../../../../services/project';
import Pagination from '../../../Pagination';
import useProject from '../../hooks/useProject';
import FilterProject from '../Filter/filter';
import Item from '../Item/item';
const ProjectManager = () => {
    const {projects, total, page, setPage, options} = useProject();
    const [data, setData] = useState<any>(projects);
    useEffect(() => {
        if (projects) setData(projects);
    }, [projects]);
    const {statusOptions} = useStatus();
    const [form] = Form.useForm();
    const router = useNavigate();
    const [values, setValues] = useState<any>();

    const {data: projectFilterResponse} = useQuery({
        queryKey: ['filterProject', values],
        queryFn: () => filterProject(values),
        enabled: !!values,
    });

    useMemo(() => {
        setData(projectFilterResponse?.data?.data || []);
    }, [projectFilterResponse]);

    return (
        <>
            <div className="mb-10">
                <div className="flex justify-end gap-3 mb-5">
                    <Button
                        className="text-white bg-blue-600"
                        onClick={() => router(`/project/create`)}
                        size="large"
                    >
                        Tạo dự án
                    </Button>
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
                    projectOtpions={options}
                    statusOptions={statusOptions}
                    setValues={setValues}
                />
                <div className="flex flex-col gap-4">
                    {data.map((project: any) => {
                        return <Item data={project} />;
                    })}
                </div>
            </div>
            <div className="!bg-[#F5F5F5] mt-10">
                <Pagination
                    currentPage={page}
                    totalCount={total}
                    pageSize={10}
                    onPageChange={(page: any) => setPage(page)}
                />
            </div>
        </>
    );
};

export default ProjectManager;
