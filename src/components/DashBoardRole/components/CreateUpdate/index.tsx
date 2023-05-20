import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Button, Form, Modal, Select, notification} from 'antd';
import dayjs from 'dayjs';
import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {styled} from 'styled-components';
import useRole from '../../../../hooks/useRole';
import {createUser, getDetailUser, updateUser} from '../../../../services/user';

const {Option} = Select;

interface Props {
    visible: boolean;
    onCancel: () => void;
    initalValues?: any;
    mode?: any;
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

const CreateUpdateRoleModal = (props: Props) => {
    const {visible, onCancel, initalValues, mode} = props;

    const {id} = useParams();
    const [form] = Form.useForm();
    const {roleOptions} = useRole();
    const queryCLient = useQueryClient();

    const getLableMode = () => {
        switch (mode) {
            case 'create':
                return 'Tạo';
            case 'update':
                return 'Update';
            default:
                return '';
        }
    };

    const {data: detailUserResponse} = useQuery({
        queryKey: ['getDetailUser', id],
        queryFn: () => getDetailUser(id),
    });

    const detailUser = useMemo(() => {
        return detailUserResponse?.data?.data || [];
    }, [detailUserResponse]);

    const detailConvert = useMemo(() => {
        return {
            ...detailUser,
            date_of_birth: dayjs(detailUser?.date_of_birth),
            roles_id: detailUser?.roles?.map((item: any) =>
                item?.id?.toString(),
            ),
            status: {
                label:
                    detailUser?.status === 1 ? 'Hoạt động' : 'Không hoạt động',
                value: detailUser?.status,
            },
        };
    }, [detailUser]);

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
        mutationFn: (data: any) => updateUser(id, data),
        mutationKey: ['updateUser', id],
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Update successfully',
            });
            queryCLient.refetchQueries(['getDetailUser', id]);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    const handleFinish = (values: any) => {
        if (id) {
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
        if (detailUser) {
            setAvatar(detailUser.avatar);
        }
    }, [detailUser]);

    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            title="Thêm danh mục phân quyền"
            footer={[]}
            width={1000}
        >
            <Form
                form={form}
                onFinish={handleFinish}
                initialValues={detailConvert}
                layout="vertical"
            >
                {getLableMode() && (
                    <Form.Item className="flex justify-center">
                        <Button
                            disabled={isLoading}
                            htmlType="submit"
                            block
                            type="primary"
                            className="!text-center !block"
                            size="large"
                        >
                            {isLoading ? 'Loading...' : getLableMode()}
                        </Button>
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
};

export default CreateUpdateRoleModal;
