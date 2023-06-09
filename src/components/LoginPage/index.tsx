import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {useMutation} from '@tanstack/react-query';
import {Button, Card, Checkbox, Form, Input, notification} from 'antd';
import {login} from '../../services/auth.service';
import {setAccessToken} from '../../utils/auth';

const LoginPage = () => {
    const {isLoading, mutate: loginMutate} = useMutation({
        mutationFn: login,
        mutationKey: ['login'],
        onSuccess: (response: any) => {
            const token = response?.data?.data?.access_token?.token || '';
            setAccessToken(token);
            notification.success({
                message: 'Đăng nhập thành công',
            });
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        },
        onError: (error: any) => {
            console.log(error.request);

            if (error.request.status === 401){
                notification.error({
                    message: 'Thông tin đăng nhập không chính xác',
                });
            }
            else {
                notification.error({
                    message: 'Lỗi hệ thống, hãy thử lại sau',
                });
            }
        },

    });
    const onFinish = (values: any) => {
        loginMutate(values);
    };

    return (
        <div className="loginPageContainer">
            <Card title="Đăng nhập">
                <Form
                    name="login"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    className="login-form"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập email',
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                            loading={isLoading}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginPage;
