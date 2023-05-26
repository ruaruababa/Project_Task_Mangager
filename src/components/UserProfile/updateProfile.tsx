import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, DatePicker, Form, Input, notification} from 'antd';
import dayjs from 'dayjs';
import {useEffect, useMemo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useProfile from '../../hooks/useProfile';
import {uploadAvatar} from '../../services/uploadAvatar';
import {updateProfile} from '../../services/user';
import Upload from '../DashboardUser/components/CreateUpdate/upload';

const UpdateProfile = () => {
    const [form] = Form.useForm();
    const {userProfile} = useProfile();
    const queryClient = useQueryClient();
    const navagate = useNavigate();
    const id = useParams();
    const userConvert = useMemo(() => {
        if (!userProfile) return;
        return {
            ...userProfile,
            avatar: userProfile.avatar || 'avatar.jpg',
            date_of_birth: userProfile.date_of_birth
                ? dayjs(userProfile.date_of_birth)
                : null,
        };
    }, [userProfile]);

    useEffect(() => {
        if (userConvert) {
            form.setFieldsValue(userConvert);
        }
    }, [form, userConvert, userProfile]);

    const {mutate: updateProfileMutate} = useMutation({
        mutationFn: updateProfile,
        mutationKey: ['updateProfile'],
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Update successfully',
            });
            navagate('/profile');
            queryClient.refetchQueries(['getMe']);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    const handleUpdate = (values: any) => {
        updateProfileMutate({
            ...values,
            date_of_birth: dayjs(values.date_of_birth).format('YYYY-MM-DD'),
        });
    };

    return (
        <div>
            <>
                <Form
                    form={form}
                    onFinish={handleUpdate}
                    initialValues={userConvert}
                    layout="vertical"
                >
                    <div className="flex justify-center rounded-full">
                        <Upload
                            url={uploadAvatar(id)}
                            isSingle={true}
                            fieldName={'avatar'}
                            image={userProfile?.avatar || 'avatar.jpg'}
                            defaultImage={'avatar.jpg'}
                            className="rounded-full"
                            // onUploadSuccess={(media) => {
                            //     updateAvatarMutate({
                            //         media_id: media.id,
                            //     });
                            // }}
                        />
                    </div>

                    <Form.Item
                        name="name"
                        label="Họ và tên"
                        rules={[{required: true}]}
                    >
                        <Input disabled placeholder="Nhập họ và tên" />
                    </Form.Item>
                    <div className="grid grid-cols-2 gap-10">
                        {' '}
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email',
                                },
                            ]}
                        >
                            <Input
                                type="text"
                                placeholder="Vui lòng nhập email"
                            />
                        </Form.Item>{' '}
                        <Form.Item name="address" label="Địa chỉ">
                            <Input type="text" placeholder="Nhập địa chỉ" />
                        </Form.Item>
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                        {' '}
                        <Form.Item
                            name="phone"
                            label="Số điện thoại"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại',
                                },
                            ]}
                        >
                            <Input
                                type="text"
                                placeholder="Nhập số điện thoại"
                            />
                        </Form.Item>{' '}
                        <Form.Item
                            name="date_of_birth"
                            label="Ngày sinh"
                            className="w-full"
                        >
                            <DatePicker
                                format={'YYYY/MM/DD'}
                                className="w-full"
                            />
                        </Form.Item>{' '}
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                        {' '}
                        <Form.Item name="job_title" label="Chức vụ">
                            <Input
                                disabled
                                type="text"
                                placeholder="Nhập tên chức vụ"
                            />
                        </Form.Item>{' '}
                    </div>
                    <div className="flex justify-center">
                        <div className="flex gap-3">
                            {' '}
                            <Form.Item className="flex justify-center">
                                <Button
                                    htmlType="submit"
                                    block
                                    type="primary"
                                    className="!text-center !block bg-blue-600"
                                    size="large"
                                >
                                    {'Cập nhật'}
                                </Button>
                            </Form.Item>{' '}
                            <Form.Item className="flex justify-center">
                                <Button
                                    onClick={() => navagate('/profile')}
                                    type="primary"
                                    className="!text-center !block"
                                    size="large"
                                >
                                    {'Hủy'}
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </>
        </div>
    );
};

export default UpdateProfile;
