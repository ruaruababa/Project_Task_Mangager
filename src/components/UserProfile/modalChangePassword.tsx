import {Button, Form, Input, Modal} from 'antd';
interface Props {
    visible: boolean;
    onCancel: () => void;
}
const ModalChangePassword = (props: Props) => {
    const [form] = Form.useForm();
    const {visible, onCancel} = props;
    const handleFinish = (values: any) => {};
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            title="Create new task"
            footer={[]}
        >
            <Form form={form} onFinish={handleFinish} layout="vertical">
                <Form.Item
                    name="oldPassword"
                    label="Video URL"
                    rules={[{required: true}]}
                >
                    <Input.Password placeholder="Enter video URL" />
                </Form.Item>

                <Form.Item
                    name="numberOfViews"
                    label="Number of Views"
                    rules={[{required: true}]}
                >
                    <Input.Password type="number" placeholder="Enter number of views" />
                </Form.Item>

                <Form.Item>
                    <Button
                        htmlType="submit"
                        block
                        type="primary"
                        className="!text-center !block bg-blue-600"
                        size="large"
                    >
                        {'Đổi mật khẩu'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalChangePassword;
