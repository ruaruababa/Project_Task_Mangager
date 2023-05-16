import {useQuery} from '@tanstack/react-query';
import {Button} from 'antd';
import {useParams} from 'react-router-dom';
import {getDetailTaskInProject} from '../../../../services/tasks';
import {convertDate} from '../../../../utils/format';
import PiChart from '../../../Chart/PieChart';
import UserAvatar from '../Item/avatar';

const DetailTask = () => {
    const {id, taskId} = useParams();

    const {data: detailTaskResponse} = useQuery({
        queryKey: ['getDetailTaskInProject', id, taskId],
        queryFn: () => getDetailTaskInProject(id, taskId),
    });

    const detailProject: any = [];
    console.log('detailTaskResponse', detailTaskResponse);

    return (
        <>
            <div className="flex flex-col gap-10">
                {' '}
                <div className="text-lg bg-white rounded-xl">
                    <div className="flex flex-col gap-10 p-10">
                        <div className="text-xl font-semibold">
                            {detailProject?.name} -{' '}
                            <span
                                style={{
                                    color: detailProject?.status?.color,
                                }}
                            >
                                {detailProject?.status?.name}
                            </span>
                        </div>
                        <div className="grid grid-cols-12 gap-3 text-lg">
                            <div
                                className="flex flex-col col-span-2 py-3 text-center"
                                style={{
                                    border: '1px dashed  #cccccc',
                                }}
                            >
                                <div className="text-lg font-semibold">
                                    {convertDate(detailProject?.starts_at)}
                                </div>

                                <div className="text-gray-400">
                                    Ngày bắt đầu hợp đồng
                                </div>
                            </div>
                            <div
                                className="flex flex-col col-span-2 py-3 text-center"
                                style={{
                                    border: '1px dashed  #cccccc',
                                }}
                            >
                                <div className="text-lg font-semibold">
                                    {convertDate(detailProject?.starts_at)}
                                </div>
                                <div className="text-gray-400">
                                    Ngày bắt đầu hợp đồng
                                </div>
                            </div>
                            <div
                                className="flex flex-col col-span-2 py-3 text-center"
                                style={{
                                    border: '1px dashed  #cccccc',
                                }}
                            >
                                <div className="text-lg font-semibold">
                                    {detailProject?.progress || 0} %
                                </div>
                                <div className="text-gray-400">
                                    Phần trăm hoàn thành
                                </div>
                            </div>
                            <div className="flex col-span-2 py-3 text-center">
                                <UserAvatar
                                    users={detailProject?.users || []}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 text-lg font-semibold text-gray-400">
                                Code:
                            </div>
                            <div className="col-span-10 font-semibold">
                                {detailProject?.code}
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 text-lg font-semibold text-gray-400">
                                Duration:
                            </div>
                            <div className="col-span-10 font-semibold">
                                {detailProject?.duration}
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 text-lg font-semibold text-gray-400">
                                Summary:
                            </div>
                            <div className="col-span-10 font-semibold">
                                {detailProject?.summary || 'Không xác định'}
                            </div>
                        </div>
                    </div>
                </div>
                {/* ------------------------------------- CHART ------------------------------- */}
                <div className="flex flex-col text-lg bg-white rounded-xl">
                    <div className="flex flex-col p-10">
                        {' '}
                        <div
                            className="flex justify-between pb-10"
                            style={{
                                borderBottom: '1px solid #dddddd',
                            }}
                        >
                            <div className="font-semibold">
                                Tổng task:{' '}
                                <span>{detailProject?.tasks_count}</span>
                            </div>
                            <div className="">
                                {' '}
                                <Button size={'large'} type="primary">
                                    Danh sách task
                                </Button>
                            </div>
                        </div>
                        <div className="py-10">
                            <PiChart
                                dataChart={
                                    detailProject?.tasks_count_by_status || []
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailTask;
