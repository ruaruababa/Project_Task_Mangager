import {useQuery} from '@tanstack/react-query';
import {Tag} from 'antd';
import {useMemo, useState} from 'react';
import {styled} from 'styled-components';
import {getProjectAnalystic, getTaskAnalystic} from '../../services/analystic';
import PiChart from '../Chart/PieChart';
import FilterAnalystic from '../Filter/filterAnalystic';

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

    const totalTask = useMemo(() => {
        return analysticTask?.reduce((acc: any, cur: any) => {
            return acc + cur?.tasks_count;
        }, 0);
    }, [analysticTask]);

    const totalProject = useMemo(() => {
        return analysticProject?.reduce((acc: any, cur: any) => {
            return acc + cur?.projects_count;
        }, 0);
    }, [analysticProject]);

    const analysticTaskData = useMemo(() => {
        return analysticTask?.map((item: any) => {
            return {
                ...item,
                percent: (Number(item?.tasks_count) / Number(totalTask)) * 100,
            };
        });
    }, [analysticTask]);

    const analysticProjectData = useMemo(() => {
        return analysticProject?.map((item: any) => {
            return {
                ...item,
                percent: Number(
                    (Number(item?.projects_count) / Number(totalProject)) * 100,
                ),
            };
        });
    }, [analysticProject]);

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
                                    {analysticProjectData?.map((item: any) => {
                                        return (
                                            <>
                                                {' '}
                                                <div
                                                    className="flex items-center"
                                                    key={
                                                        item?.name +
                                                        'analystic_project'
                                                    }
                                                >
                                                    <div className="">
                                                        {' '}
                                                        <Tag
                                                            color={item?.color}
                                                        >
                                                            {item?.name}
                                                        </Tag>
                                                    </div>
                                                    <div className="text-base font-semibold">
                                                        {item?.percent || 0}
                                                        {'%'}
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                            </Container>
                        </div>
                        <div
                            className="pt-3 font-semibold"
                            style={{
                                borderTop: '1px solid #dddddd',
                            }}
                        >
                            Tổng dự án: {totalProject}
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
                                    {analysticTaskData?.map((item: any) => {
                                        return (
                                            <>
                                                {' '}
                                                <div
                                                    className="flex items-center"
                                                    key={
                                                        item?.name +
                                                        'analystic_task'
                                                    }
                                                >
                                                    <div className="">
                                                        {' '}
                                                        <Tag
                                                            color={item?.color}
                                                        >
                                                            {item?.name}
                                                        </Tag>
                                                    </div>
                                                    <div className="text-base font-semibold">
                                                        {item?.percent || 0}
                                                        {'%'}
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                            </Container>
                        </div>
                        <div
                            className="pt-3 font-semibold"
                            style={{
                                borderTop: '1px solid #dddddd',
                            }}
                        >
                            Tổng task: {totalTask}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Analystic;
