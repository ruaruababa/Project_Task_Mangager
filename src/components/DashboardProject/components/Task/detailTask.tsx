import {useQuery} from '@tanstack/react-query';
import {Button} from 'antd';
import {useMemo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getDetailTaskInProject} from '../../../../services/tasks';
import {convertDate} from '../../../../utils/format';
import UserAvatar from '../Item/avatar';

const DetailTask = () => {
    const {id, taskId} = useParams();
    const navigate = useNavigate();

    const {data: detailTaskResponse} = useQuery({
        queryKey: ['getDetailTaskInProject', id, taskId],
        queryFn: () => getDetailTaskInProject(id, taskId),
    });

    const detailTaskInProject = useMemo(() => {
        return detailTaskResponse?.data?.data;
    }, [detailTaskResponse]);

    const userReportList = useMemo(() => {
        const listUserReport = detailTaskInProject?.reports?.map(
            (item: any) => item?.user?.name,
        );
        return listUserReport?.join(', ');
    }, [detailTaskInProject]);

    const getDetailSubTask = (subTaskId: any) => {
        navigate(`/project/${id}/subtask/${subTaskId}`);
    };

    return (
        <>
            {' '}
            <div className="flex justify-between py-5">
                <div className="">
                    <span
                        className="font-semibold text-gray-400 cursor-pointer"
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        Trang chủ
                    </span>
                    {' / '}
                    <span
                        className="font-semibold text-gray-400 cursor-pointer"
                        onClick={() => {
                            navigate('/project');
                        }}
                    >
                        Project
                    </span>
                    {' / '}
                    <span
                        className="font-semibold text-gray-400 cursor-pointer"
                        onClick={() => {
                            navigate(`/project/${id}/tasks`);
                        }}
                    >
                        Task
                    </span>
                    {' / '}
                    <span>Chi tiết task</span>
                </div>
                <Button
                    type="primary"
                    onClick={() => {
                        navigate(`/project/${id}/tasks/${taskId}/edit`);
                    }}
                >
                    Chỉnh sửa
                </Button>
            </div>
            <div className="flex flex-col gap-10">
                {' '}
                <div className="text-lg bg-white rounded-xl">
                    <div className="flex flex-col gap-10 p-10">
                        <div className="text-xl font-semibold">
                            {detailTaskInProject?.name} -{' '}
                            <span
                                style={{
                                    color: detailTaskInProject?.status?.color,
                                }}
                            >
                                {detailTaskInProject?.status?.name}
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
                                    {convertDate(
                                        detailTaskInProject?.starts_at,
                                    )}
                                </div>

                                <div className="text-gray-400">
                                    Ngày bắt đầu
                                </div>
                            </div>
                            <div
                                className="flex flex-col col-span-2 py-3 text-center"
                                style={{
                                    border: '1px dashed  #cccccc',
                                }}
                            >
                                <div className="text-lg font-semibold">
                                    {convertDate(detailTaskInProject?.ends_at)}
                                </div>
                                <div className="text-gray-400">
                                    Ngày hoàn thành
                                </div>
                            </div>
                            <div
                                className="flex flex-col col-span-2 py-3 text-center"
                                style={{
                                    border: '1px dashed  #cccccc',
                                }}
                            >
                                <div className="text-lg font-semibold">
                                    {detailTaskInProject?.progress || 0} %
                                </div>
                                <div className="text-gray-400">
                                    Phần trăm hoàn thành
                                </div>
                            </div>
                            <div className="flex col-span-2 py-3 text-center">
                                <UserAvatar
                                    users={detailTaskInProject?.users || []}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 text-lg font-semibold text-gray-400">
                                Project name:
                            </div>
                            <div className="col-span-10 font-semibold">
                                {detailTaskInProject?.project?.name}
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 text-lg font-semibold text-gray-400">
                                Pending reason:
                            </div>
                            <div className="col-span-10 font-semibold">
                                {detailTaskInProject?.pending_reason}
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 text-lg font-semibold text-gray-400">
                                File name:{' '}
                            </div>
                            <div className="col-span-10 font-semibold">
                                {detailTaskInProject?.files?.map(
                                    (file: any) => (
                                        <a
                                            href={file.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-500"
                                            style={{
                                                textDecoration: 'underline',
                                            }}
                                            key={file.id}
                                        >
                                            {file.name}
                                        </a>
                                    ),
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 text-lg font-semibold text-gray-400">
                                Report files:{' '}
                            </div>
                            <div className="col-span-10 font-semibold">
                                {detailTaskInProject?.reports?.map(
                                    (item: any) => (
                                        <a
                                            href={item?.file?.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-500"
                                            style={{
                                                textDecoration: 'underline',
                                            }}
                                            key={item?.name}
                                        >
                                            {item?.file?.name}
                                        </a>
                                    ),
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 text-lg font-semibold text-gray-400">
                                Report users:
                            </div>
                            <div className="col-span-10 font-semibold">
                                {userReportList}
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 text-lg font-semibold text-gray-400">
                                Description:
                            </div>
                            <div className="col-span-10 font-semibold">
                                {detailTaskInProject?.description ||
                                    'Không xác định'}
                            </div>
                        </div>
                    </div>
                </div>
                {/* ------------------------------------- SubTask ------------------------------- */}
                {detailTaskInProject?.children?.map((item: any) => (
                    <div className="text-lg bg-white rounded-xl">
                        <div className="flex flex-col gap-10 p-10">
                            <div
                                className="text-xl font-semibold cursor-pointer hover:underline"
                                onClick={() => getDetailSubTask(item?.id)}
                            >
                                {item?.name} -{' '}
                                <span
                                    style={{
                                        color: item?.status?.color,
                                    }}
                                >
                                    {item?.status?.name}
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
                                        {convertDate(item?.starts_at)}
                                    </div>

                                    <div className="text-gray-400">
                                        Ngày bắt đầu
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col col-span-2 py-3 text-center"
                                    style={{
                                        border: '1px dashed  #cccccc',
                                    }}
                                >
                                    <div className="text-lg font-semibold">
                                        {convertDate(item?.starts_at)}
                                    </div>
                                    <div className="text-gray-400">
                                        Ngày hoàn thành
                                    </div>
                                </div>

                                <div className="flex col-span-2 py-3 text-center">
                                    <UserAvatar users={item?.users || []} />
                                </div>
                            </div>

                            {/* <div className="grid grid-cols-12">
                                <div className="col-span-2 text-lg font-semibold text-gray-400">
                                    Pending reason:
                                </div>
                                <div className="col-span-10 font-semibold">
                                    {item?.pending_reason}
                                </div>
                            </div>

                            <div className="grid grid-cols-12">
                                <div className="col-span-2 text-lg font-semibold text-gray-400">
                                    Description:
                                </div>
                                <div className="col-span-10 font-semibold">
                                    {item?.description || 'Không xác định'}
                                </div>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default DetailTask;
