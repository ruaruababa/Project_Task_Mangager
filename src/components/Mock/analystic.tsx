import {useQuery} from '@tanstack/react-query';
import {Tag} from 'antd';
import {useMemo, useState} from 'react';
import {styled} from 'styled-components';
import {getProjectAnalystic, getTaskAnalystic} from '../../services/analystic';
import PiChart from '../Chart/PieChart';
import FilterAnalystic from '../DashboardProject/components/Filter/filterAnalystic';

const Container = styled.div`
    ul {
        display: none;
    }
`;

const Analystic = () => {
    const [paramsTask, setParamsTask] = useState<any>('');
    const [paramsProject, setParamsProject] = useState<any>('');

    const {data: analysticTaskResponse} = useQuery({
        queryKey: ['getTaskAnalystic', paramsTask || ''],
        queryFn: () => getTaskAnalystic({...paramsTask}),
    });

    const analysticTask = useMemo(() => {
        return analysticTaskResponse?.data?.data || [];
    }, [analysticTaskResponse]);

    const {data: analysticProjectResponse} = useQuery({
        queryKey: ['getProjectAnalystic', paramsProject || ''],
        queryFn: () => getProjectAnalystic({...paramsProject}),
    });

    const analysticProject = useMemo(() => {
        return analysticProjectResponse?.data?.data || [];
    }, [analysticProjectResponse]);

    return (
        <>
            {' '}
            <div className="">
                <div className="flex flex-col gap-2 mb-5">
                    <div className="text-xl font-bold">Thống kê</div>
                    <div className="">
                        <span className="font-semibold text-gray-400">
                            Trang chủ /{' '}
                        </span>
                        <span className="font-semibold ">Thống kê </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 ">
                    <div className="p-3 bg-white rounded-lg shadow-lg ">
                        <div className="flex flex-col gap-3">
                            <div className="text-lg font-bold">Dự án</div>
                            <FilterAnalystic setParams={setParamsProject} />
                            <Container className="min-h-[500px]">
                                <PiChart
                                    dataChart={analysticProject || []}
                                    dataKey="projects_count"
                                />
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#f50">
                                                Behind Schedule
                                            </Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'56%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#2b2ee9">Inprogess</Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'17%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#383838">
                                                Not Started
                                            </Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'17%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#eeeb36">Pending</Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'11%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#3bbe13">Complete</Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'0%'}
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <div
                            className="pt-3 font-semibold"
                            style={{
                                borderTop: '1px solid #dddddd',
                            }}
                        >
                            Tổng dự án: 12
                        </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-lg ">
                        <div className="flex flex-col gap-3">
                            <div className="text-lg font-bold">Đầu việc</div>
                            <FilterAnalystic
                                setParams={setParamsTask}
                                needHours={true}
                            />

                            <Container className="min-h-[500px]">
                                <PiChart
                                    dataChart={analysticTask || []}
                                    dataKey="tasks_count"
                                />
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#f50">
                                                Behind Schedule
                                            </Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'8%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#2b2ee9">Inprogess</Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'23%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#383838">
                                                Not Started
                                            </Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'15%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#eeeb36">Pending</Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'38%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#3bbe13">Complete</Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'15%'}
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <div
                            className="pt-3 font-semibold"
                            style={{
                                borderTop: '1px solid #dddddd',
                            }}
                        >
                            Tổng task: 53
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Analystic;
