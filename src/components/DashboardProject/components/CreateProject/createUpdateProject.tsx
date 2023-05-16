import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, DatePicker, Form, Input, Select, notification} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import useUser from '../../../../hooks/useUser';
import {createProject} from '../../../../services/project';

interface Props {
    visible?: boolean;
    onCancel?: () => void;
    initalValues?: any;
}

const CreateUpdateProject = (props: Props) => {
    const {visible, onCancel, initalValues} = props;
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const {users} = useUser();
    const startDate = Form.useWatch('starts_at', form);
    const options: any = users?.map((user: any) => ({
        label: user.name,
        value: user.id,
    }));

    useEffect(() => {
        initalValues
            ? form.setFieldsValue(initalValues)
            : form.setFieldsValue({
                  starts_at: dayjs().format('YYYY/MM/DD'),
                  ends_at: dayjs().format('YYYY/MM/DD'),
              });
    }, [initalValues]);

    const {mutate: createProjectMutate, isLoading} = useMutation({
        mutationFn: createProject,
        mutationKey: ['createProject'],
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Create successfully',
            });
            form.resetFields();
        },
        onError: () => {
            notification.error({
                message: 'Error',
                description: 'Create failed',
            });
        },
    });

    const handleFinish = (values: any) => {
        if (initalValues) {
            return;
        }
        console.log('values: ', values);
        createProjectMutate({
            ...values,
            starts_at: dayjs(values.starts_at).format('YYYY/MM/DD'),
            ends_at: dayjs(values.starts_at).format('YYYY/MM/DD'),
            status_id: '1',
        });
    };
    return (
        <div className="p-10 bg-white rounded-xl">
            <Form form={form} onFinish={handleFinish} layout="vertical">
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
                            defaultValue={dayjs()}
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
                            disabledDate={(d) =>
                                !d ||
                                d.isBefore(
                                    dayjs(startDate).format('YYYY/MM/DD'),
                                )
                            }
                            onChange={() => {}}
                            format={'YYYY/MM/DD'}
                            style={{
                                backgroundColor: '#f5f5f5',
                                width: '100%',
                            }}
                            defaultValue={dayjs().add(1, 'day')}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    name="assigned_user_ids"
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
                        options={options}
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
                        <Select
                            disabled
                            mode="multiple"
                            style={{width: '100%'}}
                            placeholder="Chọn người thực hiện"
                            onChange={() => {}}
                            options={[{label: 'Not Started', value: '1'}]}
                            value={{
                                label: 'Not Started',
                                value: '1',
                            }}
                        />
                    </Form.Item>
                    <div className="w-1/2"></div>
                </div>

                <Form.Item name="description" label="Mô tả">
                    <TextArea
                        placeholder="Enter number of views"
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

export default CreateUpdateProject;
