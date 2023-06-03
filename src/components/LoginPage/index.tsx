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
                message: 'Login successful',
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        },
        onError: () => {
            notification.error({
                message: 'Wrong username or password',
            });
        },
    });
    const onFinish = (values: any) => {
        loginMutate(values);
    };

    return (
        <div className="loginPageContainer">
            <Card title="👻 Login">
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
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
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
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginPage;
