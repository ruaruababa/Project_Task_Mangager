import {
    CheckCircleOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
    Avatar,
    Button,
    Card,
    Divider,
    List,
    Modal,
    Popover,
    Tag,
    Typography,
    notification,
} from 'antd';
import dayjs from 'dayjs';
import {useMemo, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useProfile from '../../../../hooks/useProfile';
import {
    getDetailTaskInProject,
    getHistotyInTask,
    removeAttachFile,
    uploadAttachFile,
    uploadReportFile,
} from '../../../../services/tasks';
import {convertDate, convertDateTime} from '../../../../utils/format';
import UploadReportFile from '../../../Uploads/uploadFile';
import UserAvatar from '../Item/avatar';
interface Props {
    isShow: boolean;
    onCancel: () => void;
    handleRemoveReportFile?: () => void;
    title?: any;
}
export const ModalConfirm = (props: Props) => {
    const {isShow, onCancel, handleRemoveReportFile, title} = props;
    const customTitle = (
        <div className="flex gap-3">
            <ExclamationCircleOutlined />{' '}
            <h2 className="!text-2xl font-bold text-red-500">
                {title || 'Bạn có chắc chắn muốn xóa file?'}
            </h2>
        </div>
    );
    return (
        <Modal
            title={customTitle}
            open={isShow}
            onOk={handleRemoveReportFile}
            onCancel={onCancel}
        >
            <span>Bạn sẽ không thể khôi phục lại</span>
        </Modal>
    );
};

const DetailTask = () => {
    const {id, taskId} = useParams();
    const navigate = useNavigate();
    const [isShowModal, setIsShowModal] = useState(false);
    const queryClient = useQueryClient();

    const {userProfile} = useProfile();

    const canCreateSubTask = userProfile?.permissions?.includes('task:create');
    const canEditTask = userProfile?.permissions?.includes('task:update');
    const canDeleteTask = userProfile?.permissions?.includes('task:delete');

    const {data: detailTaskResponse} = useQuery({
        queryKey: ['getDetailTaskInProject', id, taskId],
        queryFn: () => getDetailTaskInProject(id, taskId),
    });

    const {mutate: removeReportFileMutate} = useMutation({
        mutationFn: (fileId) => removeAttachFile(taskId, fileId),
        mutationKey: ['removeAttachFile', taskId],
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Xóa file thành công',
            });
            queryClient.invalidateQueries(['getDetailTaskInProject']);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    const {mutate: removeAttachMutate} = useMutation({
        mutationKey: ['removeAttachFile'],
        mutationFn: (filedId: any) => removeAttachFile(taskId, filedId),
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Xóa file thành công',
            });
            queryClient.invalidateQueries(['getDetailTaskInProject']);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    const {data: historyResponse} = useQuery({
        queryKey: ['getHistotyInTask', taskId],
        queryFn: () => getHistotyInTask(taskId),
    });

    const historyList = useMemo(() => {
        return historyResponse?.data?.data || [];
    }, [historyResponse]);

    const handleRemoveAttachFile = (filedId: any) => {
        removeAttachMutate(filedId);
        setIsShow(false);
    };

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
        navigate(`/project/${id}/tasks/${subTaskId}`);
    };

    const [isShow, setIsShow] = useState(false);
    const handleShowModal = () => {
        setIsShow(true);
    };
    const handleCancel = () => {
        setIsShow(false);
    };

    const handleRemoveReportFile = (filedId: any) => {
        removeReportFileMutate(filedId);
        setIsShow(false);
    };
    const [attachId, setAttachId] = useState('');

    const CardTitle = ({item, index, title}: any) => (
        <div className="flex justify-between">
            <h3>
                {title || 'Báo cáo'} {index + 1}
                {item?.is_editable}
            </h3>
            {item?.is_editable && canEditTask && (
                <DeleteOutlined
                    className="cursor-pointer"
                    onClick={() => {
                        setAttachId(item?.id);
                        handleShowModal();
                    }}
                />
            )}
        </div>
    );
    const [isOpenModalAttachment, setIsOpenModalAttachment] = useState(false);
    const [tabActive, setTabActive] = useState('subtask');
    const tabList = [
        {
            id: 'subtask',
            tab: 'subtask',
            title: 'SUB TASK',
        },
        {
            id: 'history',
            tab: 'history',
            title: 'HISTORY',
        },
        {
            id: 'comment',
            tab: 'comment',
            title: 'COMMENT',
        },
    ];
    return (
        <>
            {
                <UploadReportFile
                    oncancel={() => {
                        setIsOpenModalAttachment(false);
                    }}
                    isShowModal={isOpenModalAttachment}
                    url={uploadAttachFile(taskId)}
                    fieldName={'attachments'}
                    title="Tải lên tệp đính kèm"
                    queryKey={['getDetailTaskInProject', id, taskId]}
                />
            }
            {
                <UploadReportFile
                    oncancel={() => {
                        setIsShowModal(false);
                    }}
                    isShowModal={isShowModal}
                    url={uploadReportFile(taskId)}
                    fieldName={'report'}
                    queryKey={['getDetailTaskInProject', id, taskId]}
                />
            }
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
                <div className="flex gap-3">
                    {canCreateSubTask && (
                        <Button
                            className="text-white bg-green-600 hover:bg-green-700"
                            onClick={() => {
                                navigate(
                                    `/project/${id}/task/${taskId}/create-subTask`,
                                );
                            }}
                        >
                            Thêm đầu việc
                        </Button>
                    )}
                    {canEditTask && detailTaskInProject?.can_update && (
                        <Button
                            type="primary"
                            onClick={() => {
                                navigate(`/project/${id}/tasks/${taskId}/edit`);
                            }}
                        >
                            Chỉnh sửa
                        </Button>
                    )}
                    {detailTaskInProject?.can_submit_report && (
                        <Button
                            className="text-white bg-blue-500 hover:bg-blue-600"
                            onClick={() => {
                                setIsShowModal(true);
                            }}
                        >
                            Nộp báo cáo
                        </Button>
                    )}
                    <Button
                        className="text-white bg-gray-500 hover:bg-gray-600"
                        onClick={() => {
                            setIsOpenModalAttachment(true);
                        }}
                    >
                        Tệp đính kèm
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-10">
                {' '}
                <div className="grid grid-cols-12 gap-5">
                    {' '}
                    <div className="col-span-8 text-lg bg-white rounded-xl">
                        <div className="flex flex-col gap-10 p-10">
                            <div className="text-xl font-semibold">
                                {detailTaskInProject?.name} -{' '}
                                <span
                                    style={{
                                        color: detailTaskInProject?.status
                                            ?.color,
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
                                        {convertDateTime(
                                            detailTaskInProject?.starts_at,
                                        )}
                                    </div>

                                    <div className="text-gray-400">
                                        Thời gian bắt đầu
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col col-span-2 py-3 text-center"
                                    style={{
                                        border: '1px dashed  #cccccc',
                                    }}
                                >
                                    <div className="text-lg font-semibold">
                                        {convertDateTime(
                                            detailTaskInProject?.ends_at,
                                        )}
                                    </div>
                                    <div className="text-gray-400">
                                        Thời gian kết thúc
                                    </div>
                                </div>

                                <div className="flex col-span-2 py-3 text-center">
                                    <UserAvatar
                                        users={detailTaskInProject?.users || []}
                                    />
                                </div>
                            </div>

                            {detailTaskInProject?.parent?.name && (
                                <div className="grid grid-cols-12">
                                    <div className="col-span-2 text-lg font-semibold text-gray-400">
                                        Đầu việc cha:
                                    </div>
                                    <div
                                        className="col-span-10 font-semibold cursor-pointer hover:text-blue-500"
                                        onClick={() =>
                                            navigate(
                                                `/project/${detailTaskInProject?.project_id}/tasks/${detailTaskInProject?.parent?.id}`,
                                            )
                                        }
                                    >
                                        {detailTaskInProject?.parent?.name}
                                        <span
                                            style={{
                                                color: detailTaskInProject
                                                    ?.parent?.status?.color,
                                            }}
                                        >
                                            {' - '}{' '}
                                            {
                                                detailTaskInProject?.parent
                                                    ?.status?.name
                                            }
                                        </span>
                                    </div>
                                </div>
                            )}
                            {detailTaskInProject?.pending_reason && (
                                <div className="grid grid-cols-12">
                                    <div className="col-span-2 text-lg font-semibold text-gray-400">
                                        Pending reason:
                                    </div>
                                    <div className="col-span-10 font-semibold">
                                        {detailTaskInProject?.pending_reason}
                                    </div>
                                </div>
                            )}
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
                    <div className="col-span-4 text-lg bg-white rounded-xl">
                        {detailTaskInProject?.files && (
                            <div className="flex justify-center mt-5">
                                <Tag
                                    icon={<CheckCircleOutlined />}
                                    color="success"
                                    className="text-2xl"
                                >
                                    Tệp đính kèm:
                                </Tag>
                            </div>
                        )}
                        <div className="flex flex-col gap-2 mt-5">
                            {detailTaskInProject?.files?.map(
                                (item: any, index: any) => (
                                    <Card
                                        title={
                                            <CardTitle
                                                index={index}
                                                item={item}
                                                title="Tệp đính kèm"
                                            />
                                        }
                                        className="m-3 shadow-lg "
                                    >
                                        <div className="flex flex-col gap-2">
                                            {' '}
                                            <div className="flex justify-between">
                                                {' '}
                                                <span className="font-bold">
                                                    Tập tin:{' '}
                                                </span>
                                                <a
                                                    href={item?.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="font-bold text-blue-500"
                                                    style={{
                                                        textDecoration:
                                                            'underline',
                                                    }}
                                                    key={item?.name}
                                                >
                                                    {item?.name}
                                                </a>
                                            </div>
                                            <div className="flex justify-between">
                                                {' '}
                                                <span className="font-bold">
                                                    Thời gian:{' '}
                                                </span>
                                                <span className="font-bold">
                                                    {convertDate(
                                                        item?.file?.created_at,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                ),
                            )}
                        </div>
                        {detailTaskInProject?.reports && (
                            <div className="flex justify-center mt-5">
                                <Tag color="warning" className="text-2xl">
                                    Report files
                                </Tag>
                            </div>
                        )}
                        <div className="flex flex-col gap-2 mt-5">
                            {detailTaskInProject?.reports?.map(
                                (item: any, index: any) => (
                                    <Card
                                        title={
                                            <CardTitle
                                                index={index}
                                                item={item}
                                            />
                                        }
                                        className="m-3 shadow-lg "
                                    >
                                        <div className="flex flex-col gap-2">
                                            {' '}
                                            <div className="flex justify-between">
                                                {' '}
                                                <span className="font-bold">
                                                    Tập tin:{' '}
                                                </span>
                                                <a
                                                    href={item?.file?.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="font-bold text-blue-500"
                                                    style={{
                                                        textDecoration:
                                                            'underline',
                                                    }}
                                                    key={item?.name}
                                                >
                                                    {item?.file?.name}
                                                </a>
                                            </div>
                                            <div className="flex justify-between">
                                                {' '}
                                                <span className="font-bold">
                                                    Người báo cáo:{' '}
                                                </span>
                                                <span className="font-bold">
                                                    {item?.user?.name}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                {' '}
                                                <span className="font-bold">
                                                    Thời gian:{' '}
                                                </span>
                                                <span className="font-bold">
                                                    {convertDate(
                                                        item?.file?.created_at,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                ),
                            )}
                        </div>
                    </div>
                </div>
                {/* ------------------------------------- SubTask ------------------------------- */}
                <div className="text-lg bg-white rounded-xl">
                    <div className="p-10">
                        {' '}
                        <div className="flex gap-5 font-semibold uppercase">
                            {(tabList || []).map(({id, tab, title}) => (
                                <div
                                    key={id}
                                    className={`${
                                        tabActive === tab && 'active_tab'
                                    } tab cursor-pointer py-1`}
                                    onClick={() => setTabActive(tab)}
                                >
                                    {title}
                                </div>
                            ))}
                        </div>
                        {tabActive === 'subtask' && (
                            <div>
                                <div className="mt-5 text-lg font-bold">
                                    DANH SÁCH SUBTASK
                                </div>
                                <Divider></Divider>
                                {detailTaskInProject?.children?.map(
                                    (item: any) => (
                                        <div
                                            className="text-lg"
                                            style={{
                                                borderBottom:
                                                    '1px solid #cccccc',
                                            }}
                                        >
                                            <div className="flex flex-col gap-10 p-10">
                                                <div
                                                    className="text-xl font-semibold cursor-pointer hover:underline"
                                                    onClick={() =>
                                                        getDetailSubTask(
                                                            item?.id,
                                                        )
                                                    }
                                                >
                                                    {item?.name} -{' '}
                                                    <span
                                                        style={{
                                                            color: item?.status
                                                                ?.color,
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
                                                            {convertDate(
                                                                item?.starts_at,
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
                                                            {convertDate(
                                                                item?.starts_at,
                                                            )}
                                                        </div>
                                                        <div className="text-gray-400">
                                                            Ngày hoàn thành
                                                        </div>
                                                    </div>

                                                    <div className="flex col-span-2 py-3 text-center">
                                                        <UserAvatar
                                                            users={
                                                                item?.users ||
                                                                []
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        )}
                        {tabActive === 'history' && (
                            <div>
                                {' '}
                                <div className="flex flex-col text-lg bg-white rounded-xl">
                                    <div className="flex flex-col">
                                        <div className="mt-5 text-lg font-bold">
                                            LỊCH SỬ
                                        </div>
                                        <Divider></Divider>

                                        <List
                                            pagination={{
                                                pageSize: 10,
                                                total: historyList?.length,
                                                showSizeChanger: false,
                                            }}
                                            itemLayout="horizontal"
                                            dataSource={historyList}
                                            renderItem={(item: any, index) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={
                                                            <Popover
                                                                content={
                                                                    item?.user
                                                                        ?.email
                                                                }
                                                            >
                                                                <Avatar
                                                                    src={
                                                                        item
                                                                            ?.user
                                                                            ?.avatar
                                                                    }
                                                                    size={
                                                                        'large'
                                                                    }
                                                                />
                                                            </Popover>
                                                        }
                                                        title={
                                                            <>
                                                                {' '}
                                                                <Typography.Text
                                                                    mark
                                                                >
                                                                    [
                                                                    {dayjs(
                                                                        item?.created_at,
                                                                    ).format(
                                                                        'DD/MM/YYYY HH:mm',
                                                                    )}
                                                                    ]
                                                                </Typography.Text>
                                                                {' - '}
                                                                <b
                                                                    className="font-bold cursor-pointer hover:text-blue-500"
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/user/${item?.user?.id}/detail`,
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        item
                                                                            .user
                                                                            ?.name
                                                                    }
                                                                </b>
                                                            </>
                                                        }
                                                        description={
                                                            item?.description
                                                        }
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {tabActive === 'comment' && <div>comment</div>}
                    </div>
                </div>
            </div>
            {
                <ModalConfirm
                    isShow={isShow}
                    handleRemoveReportFile={() =>
                        handleRemoveReportFile(attachId)
                    }
                    onCancel={handleCancel}
                />
            }
            {
                <ModalConfirm
                    isShow={isShow}
                    handleRemoveReportFile={() =>
                        handleRemoveAttachFile(attachId)
                    }
                    onCancel={handleCancel}
                />
            }
        </>
    );
};

export default DetailTask;
