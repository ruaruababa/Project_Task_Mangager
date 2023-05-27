import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    Modal,
    Select,
    notification,
} from 'antd';
import dayjs from 'dayjs';
import {useEffect, useMemo, useState} from 'react';
import {styled} from 'styled-components';
import useRole from '../../../../hooks/useRole';
import {
    createUser,
    updateAvatarUser,
    updateUser,
} from '../../../../services/user';
import UploadCustom from './upload';

const {Option} = Select;

interface Props {
    visible: boolean;
    onCancel: () => void;
    initalValues?: any;
}

export const AvatarWrapper = styled.div`
    width: 200px;
    height: 200px;
    position: relative;

    img {
        border-radius: 50%;
        object-fit: cover;
    }

    .loading-percent {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #999999;
        opacity: 0.5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: white;
    }

    input {
        opacity: 0;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
`;

const CreateUpdateUserModal = (props: Props) => {
    const {visible, onCancel, initalValues} = props;

    const [form] = Form.useForm();
    const {roleOptions} = useRole();
    const queryCLient = useQueryClient();

    const detailConvert = useMemo(() => {
        return {
            ...initalValues,
            date_of_birth: dayjs(initalValues?.date_of_birth),
            roles_id: initalValues?.roles?.map((item: any) =>
                item?.id?.toString(),
            ),
            status: {
                label:
                    initalValues?.status === 1
                        ? 'Hoạt động'
                        : 'Không hoạt động',
                value: initalValues?.status,
            },
        };
    }, [initalValues]);

    useEffect(() => {
        if (initalValues) {
            form.setFieldsValue(detailConvert);
        }
    }, [detailConvert, form, initalValues]);

    const {mutate: createUserMutate, isLoading} = useMutation({
        mutationFn: createUser,
        mutationKey: ['createUser'],
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

    const {mutate: updateUserMutate} = useMutation({
        mutationFn: (data: any) => updateUser(initalValues?.id, data),
        mutationKey: ['updateUser', initalValues?.id],
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Update successfully',
            });
            queryCLient.refetchQueries(['getDetailUser', initalValues?.id]);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    const handleFinish = (values: any) => {
        if (initalValues) {
            console.log({...values});
            updateUserMutate({
                ...values,
                date_of_birth: dayjs(values.date_of_birth).format('YYYY-MM-DD'),
                status: values.status?.value === '1' ? true : false,
            });
        } else {
            createUserMutate({
                ...values,
                date_of_birth: dayjs(values.date_of_birth).format('YYYY-MM-DD'),
                role_ids: values.roles_id,
            });
        }
        onCancel();
    };

    const statusOptions = [
        {label: 'Kích hoạt', value: '1'},
        {label: 'Chưa kích hoạt', value: '0'},
    ];

    const dateFormat = 'YYYY/MM/DD';
    const [avatar, setAvatar] = useState('avatar.jpg');
    useEffect(() => {
        if (initalValues) {
            setAvatar(initalValues.avatar);
        }
    }, [initalValues]);

    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            title={initalValues ? 'Cập nhật người dùng' : 'Thêm mới người dùng'}
            footer={[]}
        >
            <Form form={form} onFinish={handleFinish} layout="vertical">
                <div className="flex justify-center">
                    <UploadCustom
                        url={updateAvatarUser(initalValues?.id)}
                        fieldName={'avatar'}
                        image={avatar || 'avatar.jpg'}
                        defaultImage={'avatar.jpg'}
                        wrapper={AvatarWrapper}
                        className="rounded"
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
                    <Input placeholder="Nhập họ và tên" />
                </Form.Item>
                <div className="flex justify-between">
                    {' '}
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {required: true, message: 'Vui lòng nhập email'},
                        ]}
                    >
                        <Input type="text" placeholder="Vui lòng nhập email" />
                    </Form.Item>{' '}
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                            {
                                required: initalValues ? false : true,
                                message: 'Vui lòng nhập mật khẩu',
                            },
                        ]}
                    >
                        <Input type="text" placeholder="Nhập mật khẩu" />
                    </Form.Item>
                </div>
                <div className="flex justify-between">
                    {' '}
                    <Form.Item name="date_of_birth" label="Ngày sinh">
                        <DatePicker format={dateFormat} />
                    </Form.Item>{' '}
                    <Form.Item name="address" label="Địa chỉ">
                        <Input type="text" placeholder="Nhập địa chỉ" />
                    </Form.Item>
                </div>
                <div className="flex justify-between">
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
                        <Input type="text" placeholder="Nhập số điện thoại" />
                    </Form.Item>{' '}
                    <Form.Item
                        name="job_title"
                        label="Chức vụ"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên chức vụ',
                            },
                        ]}
                    >
                        <Input type="text" placeholder="Nhập tên chức vụ" />
                    </Form.Item>{' '}
                </div>
                <div className="grid grid-cols-2 gap-10">
                    {' '}
                    <Form.Item
                        className=""
                        name="status"
                        label="Trạng thái"
                        rules={[{required: true, message: 'Chọn trạng thái'}]}
                    >
                        <Select
                            fieldNames={{label: 'label', value: 'value'}}
                            placeholder="Chọn trạng thái"
                            options={statusOptions}
                        ></Select>
                    </Form.Item>
                </div>
                <div className="flex flex-col">
                    <Form.Item
                        name="roles_id"
                        label="Phân quyền"
                        rules={[
                            {required: true, message: 'Vui lòng phân quyền'},
                        ]}
                    >
                        <Checkbox.Group
                            options={roleOptions}
                            className="flex flex-col"
                        />
                    </Form.Item>
                </div>
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
        </Modal>
    );
};

export default CreateUpdateUserModal;
