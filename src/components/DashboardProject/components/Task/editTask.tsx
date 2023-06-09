import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, DatePicker, Form, Input, Select, notification} from 'antd';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import useUser from '../../../../hooks/useUser';
import {createTask} from '../../../../services/tasks';

interface Props {
    visible?: boolean;
    onCancel?: () => void;
    initalValues?: any;
}

const EditTask = (props: Props) => {
    const {visible, onCancel, initalValues} = props;
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const {listUser} = useUser();

    useEffect(() => {
        initalValues
            ? form.setFieldsValue(initalValues)
            : form.setFieldsValue({
                  startDate: dayjs().format('YYYY/MM/DD'),
                  endDate: dayjs().format('YYYY/MM/DD'),
              });
    }, [initalValues]);

    const {mutate: createTaskMutate, isLoading} = useMutation({
        mutationFn: createTask,
        mutationKey: ['createTask'],
        onSuccess: () => {
            notification.success({
                message: 'Thành công ',
                description: 'Create successfully',
            });
            form.resetFields();
            queryClient.refetchQueries(['getTasks']);
        },
        onError: () => {
            notification.error({
                message: 'Lỗi',
                description: 'Create failed',
            });
        },
    });

    const handleFinish = (values: any) => {
        if (initalValues) {
            return;
        }
        createTaskMutate(values);
    };
    return (
        <div className="p-10 bg-white rounded-xl">
            <Form form={form} onFinish={handleFinish} layout="vertical">
                <Form.Item
                    name="videoUrl"
                    label="Tên Sub-task"
                    rules={[{required: true}]}
                >
                    <Input
                        placeholder="Nhập tên Sub-task"
                        style={{
                            backgroundColor: '#f5f5f5',
                        }}
                    />
                </Form.Item>
                <div className="flex gap-10">
                    {' '}
                    <Form.Item
                        name="numberOfViews"
                        label="Number of Views"
                        rules={[{required: true}]}
                        className="w-1/2"
                    >
                        <Input
                            type="number"
                            placeholder="Enter number of views"
                            style={{
                                backgroundColor: '#f5f5f5',
                            }}
                        />
                    </Form.Item>{' '}
                    <Form.Item
                        name="numberOfViews"
                        label="Number of Views"
                        rules={[{required: true}]}
                        className="w-1/2"
                    >
                        <Input
                            type="number"
                            placeholder="Enter number of views"
                            style={{
                                backgroundColor: '#f5f5f5',
                            }}
                        />
                    </Form.Item>
                </div>

                <div className="flex gap-10">
                    {' '}
                    <Form.Item
                        name="startDate"
                        label="Ngày bắt đầu"
                        className="w-1/2"
                        valuePropName="startDate"
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
                        name="endDate"
                        label="Ngày kết thúc"
                        className="w-1/2"
                        valuePropName="endDate"
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
                </div>

                <Form.Item
                    name="user"
                    label="Người thực hiện"
                    rules={[{required: true}]}
                >
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Chọn người thực hiện"
                        onChange={() => {}}
                        options={listUser}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        disabled={isLoading}
                        htmlType="submit"
                        block
                        type="primary"
                        className="!text-center !block"
                        size="large"
                    >
                        {isLoading ? 'Loading...' : 'Submit'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditTask;
