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
            title="Đổi mật khẩu"
            footer={[]}
        >
            <Form form={form} onFinish={handleFinish} layout="vertical">
                <Form.Item
                    name="oldPassword"
                    label="Mật khẩu cũ"
                    rules={[{required: true}]}
                >
                    <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="Mật khẩu mới"
                    rules={[{required: true}]}
                >
                    <Input.Password
                        type="number"
                        placeholder="Nhập lại mật khẩu mới"
                    />
                </Form.Item>

                <Form.Item
                    name="reNewPassword"
                    label="Nhập lại mật khẩu mới"
                    rules={[{required: true}]}
                >
                    <Input.Password
                        type="number"
                        placeholder="Nhập lại mật khẩu mới"
                    />
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
