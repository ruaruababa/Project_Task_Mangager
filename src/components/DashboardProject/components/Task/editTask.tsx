import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, DatePicker, Form, Input, Select, notification} from 'antd';
import dayjs from 'dayjs';
import {useEffect} from 'react';
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

    useEffect(() => {
        if (initalValues) {
            form.setFieldsValue(initalValues);
        }
    }, [initalValues]);

    const {mutate: createTaskMutate, isLoading} = useMutation({
        mutationFn: createTask,
        mutationKey: ['createTask'],
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Create successfully',
            });
            form.resetFields();
            queryClient.refetchQueries(['getTasks']);
        },
        onError: () => {
            notification.error({
                message: 'Error',
                description: 'Create failed',
            });
        },
    });

    const handleFinish = (values: any) => {
        console.log('values: ', values);
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
                        rules={[{required: true}]}
                        className="w-1/2"
                    >
                        <DatePicker
                            onChange={() => {}}
                            format={'YYYY/MM/DD'}
                            defaultValue={dayjs()}
                            style={{
                                backgroundColor: '#f5f5f5',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="endDate"
                        label="Ngày kết thúc"
                        rules={[{required: true}]}
                        className="w-1/2"
                    >
                        <DatePicker
                            onChange={() => {}}
                            format={'YYYY/MM/DD'}
                            defaultValue={dayjs()}
                            style={{
                                backgroundColor: '#f5f5f5',
                            }}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    name="user"
                    label="Chọn người thực hiện"
                    rules={[{required: true}]}
                >
                    <Select
                        mode="tags"
                        style={{width: '100%'}}
                        placeholder="Chọn người thực hiện"
                        onChange={() => {}}
                        options={[]}
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
