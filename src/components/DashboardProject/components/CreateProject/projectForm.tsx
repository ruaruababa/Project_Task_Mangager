import {Button, DatePicker, Form, Input, Select} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useStatus from '../../../../hooks/useStatus';
import useUser from '../../../../hooks/useUser';
import {dateFormat} from '../../../../utils/common';

interface Props {
    onFinish: any;
    id?: string;
    initialValues?: any;
}

const ProjectForm = (props: Props) => {
    const {onFinish, id, initialValues} = props;
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const parmas = useParams();
    const {optionsUser} = useUser();
    const statusSelected = Form.useWatch('status_id', form);
    const {statusOptions} = useStatus();

    useEffect(() => {
        !!id
            ? form.setFieldsValue(initialValues)
            : form.setFieldsValue({
                  status_id: 'Not Started',
              });
    }, [initialValues, parmas]);

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
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
                        rules={[{required: true}]}
                    >
                        <DatePicker
                            format={dateFormat}
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
                        rules={[{required: true}]}
                    >
                        <DatePicker
                            format={dateFormat}
                            style={{
                                backgroundColor: '#f5f5f5',
                                width: '100%',
                            }}
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
                        rules={[{required: true}]}
                    >
                        <DatePicker
                            format={dateFormat}
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
                        rules={[{required: true}]}
                    >
                        <DatePicker
                            format={dateFormat}
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
                    options={optionsUser || []}
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
                        />
                    ) : (
                        <Select
                            disabled
                            mode="multiple"
                            style={{width: '100%'}}
                            options={statusOptions}
                        />
                    )}
                </Form.Item>
                {id && statusSelected === 3 && (
                    <Form.Item
                        className="w-1/2"
                        name="pending_reason"
                        label="Lý do trì hoãn"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập lý do!',
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            placeholder="Nhập lý do"
                            style={{
                                backgroundColor: '#f5f5f5',
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                )}
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
                            htmlType="submit"
                            block
                            type="primary"
                            className="!text-center !block !min-w-[200px] bg-blue-600"
                            size="large"
                        >
                            {id ? 'Lưu' : 'Tạo'}
                        </Button>
                    </Form.Item>
                    <Form.Item className="flex justify-center w-full">
                        <Button
                            block
                            type="primary"
                            className="!text-center !block !min-w-[200px]"
                            size="large"
                            onClick={() => {
                                navigate(
                                    `${id ? `/project/${id}` : '/project'}`,
                                );
                            }}
                        >
                            {'Hủy'}
                        </Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default ProjectForm;
