import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, DatePicker, Form, Input, Select, notification} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useStatus from '../../../../hooks/useStatus';
import useUser from '../../../../hooks/useUser';
import {createProject, updateProject} from '../../../../services/project';
import useDetailProject from '../../hooks/useDetailProject';

const CreateUpdateProject = () => {
    const [form] = Form.useForm();
    const {users} = useUser();
    const {id} = useParams();
    const {statusOptions} = useStatus();
    const {detailToUpdate, detailProject} = useDetailProject();
    const startDate = Form.useWatch('starts_at', form);
    const endDate = Form.useWatch('ends_at', form);

    const options: any = users?.map((user: any) => ({
        label: user.name,
        value: user.id,
    }));

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        id
            ? form.setFieldsValue(detailToUpdate)
            : form.setFieldsValue({
                  status_id: 'Not Started',
              });
    }, [statusOptions, detailProject, form, id, detailToUpdate]);

    const {mutate: createProjectMutate, isLoading} = useMutation({
        mutationFn: createProject,
        mutationKey: ['createProject'],
        onSuccess: (data) => {
            notification.success({
                message: 'Success ',
                description: 'Create successfully',
            });
            navigate(`/project/${data?.data?.data?.id}`);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    const {mutate: updateProjectMutate} = useMutation({
        mutationFn: (data: any) => updateProject(data, id),
        mutationKey: ['updateProject', id],
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Update successfully',
            });
            queryClient.invalidateQueries(['detailProject', id]);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    const handleFinish = (values: any) => {
        console.log('values', values);

        id
            ? updateProjectMutate({
                  ...values,
                  starts_at: dayjs(startDate).format('YYYY/MM/DD'),
                  ends_at: dayjs(endDate).format('YYYY/MM/DD'),
                  status_id: values?.value,
              })
            : createProjectMutate({
                  ...values,
                  starts_at: dayjs(startDate).format('YYYY/MM/DD'),
                  ends_at: dayjs(endDate).format('YYYY/MM/DD'),
                  status_id: 1,
              });
    };
    return (
        <div className="p-10 bg-white rounded-xl">
            <div className="mb-5">
                <div className="">
                    <span
                        onClick={() => {
                            navigate('/');
                        }}
                        className="font-semibold text-gray-400 cursor-pointer hover:text-blue-500"
                    >
                        Trang chủ /
                    </span>{' '}
                    <span
                        className="font-semibold text-gray-400 cursor-pointer hover:text-blue-500"
                        onClick={() => {
                            navigate('/project');
                        }}
                    >
                        Danh sách dự án /
                    </span>{' '}
                    <span className="font-semibold">
                        {id ? ' Chỉnh sửa ' : 'Tạo '} dự án
                    </span>
                </div>
            </div>
            <Form
                form={form}
                onFinish={handleFinish}
                layout="vertical"
                initialValues={detailToUpdate}
            >
                <Form.Item
                    name="customer_name"
                    label="Tên khách hàng"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên khách hàng!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Nhập tên khách hàng"
                        style={{
                            backgroundColor: '#f5f5f5',
                        }}
                    />
                </Form.Item>
                <div className="flex gap-10">
                    {' '}
                    <Form.Item
                        name="name"
                        label="Tên dự án"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên dự án!',
                            },
                        ]}
                        className="w-full"
                    >
                        <Input
                            type="text"
                            placeholder="Nhập tên dự án"
                            style={{
                                backgroundColor: '#f5f5f5',
                            }}
                        />
                    </Form.Item>{' '}
                </div>
                {id ? (
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
                                onChange={() => {}}
                                format={'YYYY/MM/DD'}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    width: '100%',
                                }}
                                value={
                                    startDate
                                        ? dayjs(startDate)
                                        : dayjs(detailToUpdate.starts_at)
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
                                onChange={() => {}}
                                format={'YYYY/MM/DD'}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    width: '100%',
                                }}
                                value={
                                    endDate
                                        ? dayjs(endDate)
                                        : dayjs(detailToUpdate.ends_at)
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
                                onChange={() => {}}
                                format={'YYYY/MM/DD'}
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
                                onChange={() => {}}
                                format={'YYYY/MM/DD'}
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
                        options={options || []}
                    />
                </Form.Item>
                <div className="flex gap-10">
                    {' '}
                    <Form.Item
                        name="code"
                        label="Mã code dự án"
                        className="w-1/2"
                        rules={[
                            {required: true, message: 'Vui lòng nhập mã code!'},
                        ]}
                    >
                        <Input
                            type="text"
                            placeholder="Nhập mã code dự án"
                            style={{
                                backgroundColor: '#f5f5f5',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        className="w-1/2"
                        name="duration"
                        label="Duration"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Duration!',
                            },
                        ]}
                    >
                        <Input
                            type="number"
                            placeholder="Nhập Duration"
                            style={{
                                backgroundColor: '#f5f5f5',
                            }}
                        />
                    </Form.Item>
                </div>

                <div className="flex gap-10">
                    <Form.Item
                        name="status_id"
                        label="Trạng thái"
                        className="w-1/2"
                    >
                        {id ? (
                            <Select
                                style={{width: '100%'}}
                                options={statusOptions}
                                defaultValue={
                                    id
                                        ? detailToUpdate?.status_id
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
                                        ? detailToUpdate?.status_id
                                        : {
                                              label: 'Not Started',
                                              value: 1,
                                          }
                                }
                            />
                        )}
                    </Form.Item>
                    <div className="w-1/2"></div>
                </div>

                <Form.Item name="summary" label="Tóm tắt">
                    <TextArea
                        placeholder="Nhập tóm tắt"
                        style={{
                            backgroundColor: '#f5f5f5',
                        }}
                        cols={30}
                        rows={10}
                    />
                </Form.Item>

                <div className="flex justify-center">
                    {' '}
                    <div className="flex gap-3">
                        {' '}
                        <Form.Item className="flex justify-center w-full">
                            <Button
                                disabled={isLoading}
                                htmlType="submit"
                                block
                                type="primary"
                                className="!text-center !block !min-w-[200px] bg-blue-600"
                                size="large"
                            >
                                {id ? 'Chỉnh sửa' : 'Tạo'}
                            </Button>
                        </Form.Item>
                        <Form.Item className="flex justify-center w-full">
                            <Button
                                block
                                type="primary"
                                className="!text-center !block !min-w-[200px]"
                                size="large"
                                onClick={() => {
                                    navigate(`/project/${id}`);
                                }}
                            >
                                {'Hủy'}
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default CreateUpdateProject;
