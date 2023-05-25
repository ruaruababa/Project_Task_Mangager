import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Button, Checkbox, Form, Input, Modal, Select, notification} from 'antd';
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import dayjs from 'dayjs';
import {useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {styled} from 'styled-components';
import usePermission from '../../../../hooks/usePermission';
import {createRole} from '../../../../services/role';
import {getDetailUser} from '../../../../services/user';

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

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

const CreateUpdateRoleModal = (props: Props) => {
    const {visible, onCancel, initalValues, mode} = props;
    const {id} = useParams();
    const [form] = Form.useForm();
    const {permissions} = usePermission();
    const [listPermission, setListPermission] = useState<any>();
    // const [groupRole, setGroupId] = useState<any>();
    // const [groupUser, setGroupId] = useState<any>();
    // const [groupTask, setGroupId] = useState<any>();
    // const [groupId, setGroupId] = useState<any>();
    const queryCLient = useQueryClient();

    const data = useMemo(() => {
        return permissions?.map((item: any, index: any) => {
            return {
                ...item,
                name: `rules${index + 1}`,
                permissions: item?.permissions?.map((item: any, idx: any) => {
                    return {
                        ...item,
                        name: `rules${idx + 100}`,
                        parent: `rules${index + 1}`,
                    };
                }),
            };
        });
    }, [permissions]);

    const listGroupName = useMemo(() => {
        return permissions?.map((item: any) => item?.groupName);
    }, [permissions]);

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        const isTrue = listGroupName?.find((item: any) => item === e.target.id);
        const dataPermission = listPermission?.map((item: any) => {
            return {
                ...item,
                checkall: item?.groupName === isTrue && e?.target?.checked,
            };
        });
    };

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

    const {mutate: createRoleMutate, isLoading} = useMutation({
        mutationFn: createRole,
        mutationKey: ['createRole'],
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

    const {mutate: create} = useMutation({
        mutationFn: (data: any) => createRole(data),
        mutationKey: ['updateUser'],
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
    const [valuesSubmit, setValuesSubmit] = useState<any>([]);

    const handleFinish = (values: any) => {
        console.log('values', values);
        const input = {
            name: values?.name,
            permission_ids: valuesSubmit,
        };
        createRoleMutate(input);
        form.resetFields();
        onCancel();
    };

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
                layout="vertical"
                onValuesChange={(changedValues, allValues) => {
                    console.log('changedValues', changedValues);
                    console.log('data', data);
                    console.log('allValues', allValues);
                    const dataPer = data.filter((item: any) => {
                        return changedValues[item?.name] === true;
                    });

                    if (dataPer.length > 0) {
                        const permission_ids: any = dataPer[0]?.permissions.map(
                            (item: any) => {
                                return item?.value;
                            },
                        );

                        console.log('permission_ids', permission_ids);

                        setValuesSubmit((pre: any) => [
                            ...pre,
                            ...permission_ids,
                        ]);
                    }

                    dataPer?.map((item: any) => {
                        return item?.permissions?.map((per: any) => {
                            return form.setFieldsValue({
                                [`rules${per?.value + 100}`]: true,
                            });
                        });
                    });

                    const dataPerFalse = data?.filter((item: any) => {
                        return changedValues[item?.name] === false;
                    });
                    dataPerFalse?.map((item: any) => {
                        return item?.permissions?.map((per: any) => {
                            return form.setFieldsValue({
                                [`rules${per?.value + 100}`]: false,
                            });
                        });
                    });
                }}
            >
                <Form.Item
                    name={'name'}
                    label="Tên nhóm vai trò"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên nhóm vai trò',
                        },
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Vui lòng nhập tên nhóm vai trò"
                    />
                </Form.Item>
                <div className="grid grid-cols-6">
                    {' '}
                    {data?.map((per: any, index: any) => {
                        return (
                            <>
                                {/* <Form.Item
                                name={`role${index}`}
                                className="col-span-3"
                                valuePropName="checked"
                            >
                                <Checkbox>{item?.groupName}</Checkbox>
                            </Form.Item> */}
                                <Form.Item
                                    name={`rules${index + 1}`}
                                    valuePropName="checked"
                                    className="col-span-1"
                                >
                                    <Checkbox value={index + 1}>
                                        {per?.groupName}
                                    </Checkbox>
                                </Form.Item>
                                <div className="grid grid-cols-4 col-span-5">
                                    {' '}
                                    {per?.permissions?.map((item: any) => {
                                        return (
                                            <Form.Item
                                                name={`rules${
                                                    item?.value + 100
                                                }`}
                                                valuePropName="checked"
                                            >
                                                <Checkbox>
                                                    {item?.label}
                                                </Checkbox>
                                            </Form.Item>
                                        );
                                    })}
                                </div>
                            </>
                        );
                    })}
                </div>

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
