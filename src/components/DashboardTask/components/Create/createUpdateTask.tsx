// const CreateUpdateTask = () => {
//     return <div>createUpdateTask</div>;
// };

// export default CreateUpdateTask;
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Button, DatePicker, Form, Input, Select, notification} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import {useEffect, useMemo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useStatus from '../../../../hooks/useStatus';
import useUser from '../../../../hooks/useUser';
import {
    createTaskInProject,
    getDetailTaskInProject,
} from '../../../../services/tasks';

const CreateUpdateTask = () => {
    const [form] = Form.useForm();
    const {users} = useUser();
    const {id, taskId} = useParams();
    const {statusOptions} = useStatus();
    const startDate = Form.useWatch('starts_at', form);
    const endDate = Form.useWatch('ends_at', form);

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

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        id
            ? form.setFieldsValue(detailTaskInProject)
            : form.setFieldsValue({
                  status_id: 'Not Started',
              });
    }, [statusOptions, detailTaskInProject, form, id]);

    const {mutate: createTaskInProjectMutate, isLoading} = useMutation({
        mutationFn: (data: any) => createTaskInProject(data, id),
        mutationKey: ['createTaskInProject', id],
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Create successfully',
            });
            form.resetFields();
            form.setFieldsValue({
                status_id: 'Not Started',
            });
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    // const {mutate: updateProjectMutate} = useMutation({
    //     mutationFn: (data: any) => updateProject(data, id),
    //     mutationKey: ['updateProject', id],
    //     onSuccess: () => {
    //         notification.success({
    //             message: 'Success ',
    //             description: 'Update successfully',
    //         });
    //         queryClient.invalidateQueries(['detailProject', id]);
    //     },
    //     onError: (error: any) => {
    //         notification.error({
    //             message: 'Error',
    //             description: error?.response?.data?.message,
    //         });
    //     },
    // });

    const handleFinish = (values: any) => {
        console.log('values', values);

        id &&
            // ? updateProjectMutate({
            //       ...values,
            //       starts_at: dayjs(startDate).format('YYYY/MM/DD'),
            //       ends_at: dayjs(endDate).format('YYYY/MM/DD'),
            //       status_id: values?.value,
            //   })
            createTaskInProjectMutate({
                ...values,
                starts_at: dayjs(startDate).format('YYYY/MM/DD HH:mm'),
                ends_at: dayjs(endDate).format('YYYY/MM/DD HH:mm'),
                status_id: 1,
            });
    };
    return (
        <div className="p-10 bg-white rounded-xl">
            <div className="mb-10">
                <div className="mb-2 text-lg font-semibold">Tạo task mới</div>
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
                            navigate('/task');
                        }}
                    >
                        Task
                    </span>{' '}
                    <span className="font-semibold">
                        {id ? ' Chỉnh sửa ' : 'Tạo '} task
                    </span>
                </div>
            </div>
            <Form
                form={form}
                onFinish={handleFinish}
                layout="vertical"
                initialValues={detailTaskInProject}
            >
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
                                onChange={() => {}}
                                format={'YYYY/MM/DD HH:mm'}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    width: '100%',
                                }}
                                value={
                                    startDate
                                        ? dayjs()
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
                                onChange={() => {}}
                                format={'YYYY/MM/DD HH:mm'}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    width: '100%',
                                }}
                                value={
                                    endDate
                                        ? dayjs()
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
                                        dayjs().format('YYYY/MM/DD HH:mm'),
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

                <div className="flex gap-10">
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
                                    id
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
                                    id
                                        ? detailTaskInProject?.status_id
                                        : {
                                              label: 'Not Started',
                                              value: 1,
                                          }
                                }
                            />
                        )}
                    </Form.Item>
                    <div className="w-1/2">
                        {' '}
                        <Form.Item
                            name="duration"
                            label="Duration"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập duration!',
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                placeholder="Nhập duration"
                                style={{
                                    backgroundColor: '#f5f5f5',
                                }}
                            />
                        </Form.Item>
                    </div>
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

                <Form.Item className="flex justify-center w-full">
                    <Button
                        disabled={isLoading}
                        htmlType="submit"
                        block
                        type="primary"
                        className="!text-center !block !min-w-[200px]"
                        size="large"
                    >
                        {isLoading ? 'Loading...' : 'Submit'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateUpdateTask;
