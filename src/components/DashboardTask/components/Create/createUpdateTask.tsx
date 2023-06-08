import {FileAddOutlined} from '@ant-design/icons';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Button, DatePicker, Form, Input, Select, Tag, notification} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useStatus from '../../../../hooks/useStatus';
import useUser from '../../../../hooks/useUser';
import {
    createTaskInProject,
    getDetailTaskInProject,
    updateTaskInproject,
    uploadAttachFile,
} from '../../../../services/tasks';
import {uploadChunk} from '../../../../utils/upload';

const CreateUpdateTask = () => {
    const [form] = Form.useForm();
    const {users} = useUser();
    const {id, taskId} = useParams();
    const {statusOptions} = useStatus();
    const startDate = Form.useWatch('starts_at', form);
    const endDate = Form.useWatch('ends_at', form);
    const statusId = Form.useWatch('status_id', form);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [reportFile, setReportFile] = useState<any>([]);

    const handleUpload = useCallback((event: any) => {
        event.stopPropagation();
        event.preventDefault();
        const file_: any = event?.target?.files;
        const files: any = [];
        for (let i = 0; i < file_.length; i++) {
            files.push(file_[i]);
        }

        const file = file_.length === 1 ? file_[0] : files;
        setReportFile(file);
        if (!file) return;
    }, []);

    const {mutateAsync: uploadMutate, isLoading: isUploading} = useMutation({
        mutationFn: (idRs: any) =>
            uploadChunk(
                reportFile?.length > 1 ? reportFile : [reportFile],
                uploadAttachFile(idRs),
                'attachments',
            ),
        onSettled(data, error, variables, context) {
            navigate(`/project/${id}/tasks/${variables}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries([
                'getDetailTaskInProject',
                id,
                taskId,
            ]);
        },
    });

    const options: any = users?.map((user: any) => ({
        label: user.name,
        value: user.id,
    }));

    const {data: detailTaskResponse} = useQuery({
        queryKey: ['getDetailTaskInProject', id, taskId],
        queryFn: () => getDetailTaskInProject(id, taskId),
    });

    const detailTaskInProject = useMemo(() => {
        return detailTaskResponse?.data?.data;
    }, [detailTaskResponse]);

    const detailToUpdate = useMemo(() => {
        return {
            ...detailTaskInProject,
            status_id: detailTaskInProject?.status?.id,
            user_ids: detailTaskInProject?.users?.map((item: any) => {
                return item?.id;
            }),
        };
    }, [detailTaskInProject]);

    useEffect(() => {
        taskId
            ? form.setFieldsValue(detailToUpdate)
            : form.setFieldsValue({
                  status_id: 'Not Started',
              });
    }, [statusOptions, detailToUpdate, id, taskId, form]);

    const {mutateAsync: createTaskInProjectMutate, isLoading} = useMutation({
        mutationFn: async (data: any) => createTaskInProject(data, id),
        mutationKey: ['createTaskInProject', id],
        onSuccess: async (data) => {
            notification.success({
                message: 'Success ',
                description: 'Create successfully',
            });
            if (reportFile) {
                uploadMutate(data?.data?.data?.id);
            }
        },

        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    const {mutate: updateTaskMutate} = useMutation({
        mutationFn: (data: any) => updateTaskInproject(data, id, taskId),
        mutationKey: ['updateTaskInproject', id, taskId],
        onSuccess: (data) => {
            notification.success({
                message: 'Success ',
                description: 'Update successfully',
            });
            queryClient.invalidateQueries([
                'getDetailTaskInProject',
                id,
                taskId,
            ]);
            queryClient.invalidateQueries(['filterTask']);
            queryClient.invalidateQueries(['getListTaskInProject']);
            navigate(`/project/${id}/tasks/${taskId}`);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });
    const handleCreateTask = async (values: any) => {
        createTaskInProjectMutate({
            ...values,
            starts_at: dayjs(startDate).format('YYYY/MM/DD HH:mm'),
            ends_at: dayjs(endDate).format('YYYY/MM/DD HH:mm'),
            status_id: 1,
        });
    };

    const handleFinish = (values: any) => {
        taskId
            ? updateTaskMutate({
                  ...values,
                  starts_at: dayjs(startDate).format('YYYY/MM/DD HH:mm'),
                  ends_at: dayjs(endDate).format('YYYY/MM/DD HH:mm'),
              })
            : handleCreateTask(values);
    };

    return (
        <div className="p-10 bg-white rounded-xl">
            <div className="mb-10">
                <div className="">
                    <span
                        onClick={() => {
                            navigate('/');
                        }}
                        className="font-semibold text-gray-400 cursor-pointer"
                    >
                        Trang chủ /
                    </span>{' '}
                    <span
                        className="font-semibold text-gray-400 cursor-pointer"
                        onClick={() => {
                            navigate(`/project/${id}/tasks`);
                        }}
                    >
                        List-task /
                    </span>{' '}
                    <span className="font-semibold">
                        {taskId ? ' Chỉnh sửa ' : 'Tạo '} task
                    </span>
                </div>
            </div>
            <Form form={form} onFinish={handleFinish} layout="vertical">
                <Form.Item
                    name="name"
                    label="Tên task"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên task !',
                        },
                    ]}
                >
                    <Input
                        placeholder="Nhập tên task"
                        style={{
                            backgroundColor: '#f5f5f5',
                        }}
                    />
                </Form.Item>

                {taskId ? (
                    <div className="flex gap-10">
                        {' '}
                        <Form.Item
                            name="starts_at"
                            label="Ngày bắt đầu"
                            className="w-1/2"
                            valuePropName="startDate"
                            rules={[{required: true}]}
                        >
                            <DatePicker
                                showTime={{format: 'HH:mm'}}
                                disabledDate={(d) =>
                                    !d ||
                                    d.isBefore(
                                        dayjs(
                                            detailTaskInProject?.starts_at,
                                        ).format('YYYY/MM/DD HH:mm'),
                                    )
                                }
                                format={'YYYY/MM/DD HH:mm'}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    width: '100%',
                                }}
                                value={
                                    startDate
                                        ? dayjs(startDate)
                                        : dayjs(detailTaskInProject?.starts_at)
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="ends_at"
                            label="Ngày kết thúc"
                            className="w-1/2"
                            valuePropName="endDate"
                            rules={[{required: true}]}
                        >
                            <DatePicker
                                showTime={{format: 'HH:mm'}}
                                disabledDate={(d) =>
                                    !d ||
                                    d.isBefore(
                                        dayjs(startDate).format(
                                            'YYYY/MM/DD HH:mm',
                                        ),
                                    )
                                }
                                format={'YYYY/MM/DD HH:mm'}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    width: '100%',
                                }}
                                value={
                                    endDate
                                        ? dayjs(endDate)
                                        : dayjs(detailTaskInProject?.ends_at)
                                }
                            />
                        </Form.Item>
                    </div>
                ) : (
                    <div className="flex gap-10">
                        {' '}
                        <Form.Item
                            name="starts_at"
                            label="Thời gian bắt đầu"
                            className="w-1/2"
                            valuePropName="startDate"
                            rules={[{required: true}]}
                        >
                            <DatePicker
                                showTime={{format: 'HH:mm'}}
                                disabledDate={(d) =>
                                    !d ||
                                    d.isBefore(
                                        dayjs().format('YYYY/MM/DD HH:mm'),
                                    )
                                }
                                format="YYYY-MM-DD HH:mm"
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="ends_at"
                            label="Thời gian kết thúc"
                            className="w-1/2"
                            valuePropName="endDate"
                            rules={[{required: true}]}
                        >
                            <DatePicker
                                showTime={{format: 'HH:mm'}}
                                disabledDate={(d) =>
                                    !d ||
                                    d.isBefore(
                                        dayjs(startDate).format(
                                            'YYYY/MM/DD HH:mm',
                                        ),
                                    )
                                }
                                onChange={() => {}}
                                format="YYYY-MM-DD HH:mm"
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                    </div>
                )}

                <Form.Item
                    name="user_ids"
                    label="Người thực hiện"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn người thực hiện!',
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Chọn người thực hiện"
                        onChange={() => {}}
                        options={options || []}
                    />
                </Form.Item>

                <div className="flex items-end gap-10">
                    <Form.Item
                        name="status_id"
                        label="Trạng thái"
                        className="w-1/2"
                    >
                        {taskId ? (
                            <Select
                                style={{width: '100%'}}
                                options={statusOptions}
                                defaultValue={
                                    taskId
                                        ? detailTaskInProject?.status_id
                                        : {
                                              label: 'Not Started',
                                              value: '1',
                                          }
                                }
                            />
                        ) : (
                            <Select
                                disabled
                                mode="multiple"
                                style={{width: '100%'}}
                                options={statusOptions}
                                defaultValue={
                                    taskId
                                        ? detailTaskInProject?.status_id
                                        : {
                                              label: 'Not Started',
                                              value: 1,
                                          }
                                }
                            />
                        )}
                    </Form.Item>
                    {taskId && statusId === 3 && (
                        <Form.Item
                            className="w-1/2"
                            name="pending_reason"
                            label="Lý do"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập lý do!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Nhập lý do"
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                    )}
                    {!taskId && (
                        <Form.Item className="w-1/2">
                            {' '}
                            <div className="relative">
                                {' '}
                                <div className="absolute bottom-0 flex gap-3">
                                    <FileAddOutlined
                                        style={{
                                            fontSize: '26px',
                                            paddingRight: '10px',
                                            paddingBottom: '2px',
                                            borderRight: '1px solid #ccc',
                                        }}
                                    />
                                    {reportFile.length > 1 ||
                                    reportFile.name ? (
                                        <div className="">
                                            {reportFile[0]?.name && (
                                                <Tag color="success">
                                                    {reportFile[0]?.name}
                                                </Tag>
                                            )}
                                            {reportFile[0]?.name && (
                                                <Tag color="success">
                                                    {reportFile[1]?.name}
                                                </Tag>
                                            )}
                                            {reportFile?.name && (
                                                <Tag color="success">
                                                    {reportFile?.name}
                                                </Tag>
                                            )}
                                        </div>
                                    ) : (
                                        <div>Chọn file của bạn</div>
                                    )}
                                </div>
                                <div className="shadow-[inset_0_-1px_2px_rgba(0,0,0,0.6)] p-1 mt-5 relative">
                                    {' '}
                                    <input
                                        multiple
                                        className="relative z-30 w-full opacity-0"
                                        type="file"
                                        onChange={handleUpload}
                                        accept="*"
                                    ></input>
                                </div>
                            </div>
                        </Form.Item>
                    )}
                </div>

                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mô tả!',
                        },
                    ]}
                >
                    <TextArea
                        placeholder="Nhập mô tả"
                        style={{
                            backgroundColor: '#f5f5f5',
                        }}
                        cols={30}
                        rows={10}
                    />
                </Form.Item>
                <div className="flex justify-center">
                    <div className="flex gap-3">
                        {' '}
                        <Form.Item className="w-full">
                            <Button
                                disabled={isLoading}
                                htmlType="submit"
                                block
                                type="primary"
                                className="!text-center !block !min-w-[200px]"
                                size="large"
                            >
                                {taskId ? 'Cập nhật' : 'Tạo'}
                            </Button>
                        </Form.Item>
                        <Form.Item className="w-full">
                            <Button
                                onClick={() => {
                                    navigate(
                                        `${
                                            taskId
                                                ? `/project/${id}/tasks/${taskId}`
                                                : `/project/${id}/list-task`
                                        }   `,
                                    );
                                }}
                                block
                                type="primary"
                                className="!text-center !block !min-w-[200px]"
                                size="large"
                            >
                                {'Hủy'}
                            </Button>
                        </Form.Item>
                    </div>{' '}
                </div>
            </Form>
        </div>
    );
};

export default CreateUpdateTask;
