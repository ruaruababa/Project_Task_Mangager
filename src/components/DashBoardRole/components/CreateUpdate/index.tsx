import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Button, Checkbox, Form, Input, Modal, Select, notification} from 'antd';
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import {CheckboxValueType} from 'antd/es/checkbox/Group';
import dayjs from 'dayjs';
import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {styled} from 'styled-components';
import usePermission from '../../../../hooks/usePermission';
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

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

const CreateUpdateRoleModal = (props: Props) => {
    const {visible, onCancel, initalValues, mode} = props;
    const {id} = useParams();
    const [form] = Form.useForm();
    const role = Form.useWatch('role', form);
    console.log('role', role);
    const {permissions} = usePermission();
    const [listPermission, setListPermission] = useState<any>();
    // const [groupRole, setGroupId] = useState<any>();
    // const [groupUser, setGroupId] = useState<any>();
    // const [groupTask, setGroupId] = useState<any>();
    // const [groupId, setGroupId] = useState<any>();
    const queryCLient = useQueryClient();

    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);

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

        console.log('dataPermission', dataPermission);

        setListPermission([...dataPermission]);
        setCheckedList(e.target.checked ? permissions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
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
        console.log('values', values);

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
    const [checked, setChecked] = useState(false);
    const checked1 = Form.useWatch('checked1', form);
    console.log('checked1', checked1);
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
                    console.log('allValues', allValues);
                    form.setFieldsValue({
                        rules101: allValues?.rules1,
                        rules102: allValues?.rules1,
                        rules103: allValues?.rules1,
                        rules104: allValues?.rules1,
                        rules105: allValues?.rules1,
                    });
                    // const data = allValues?.rules?.map((item: any) => {
                    //     return {
                    //         ...item,
                    //         checkall:
                    //             item?.groupName === isTrue &&
                    //             e?.target?.checked,
                    //     };
                    // });
                    // setListPermission([...data]);
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
                    {permissions?.map((item: any, index: any) => {
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
                                    <Checkbox>{item?.groupName}</Checkbox>
                                </Form.Item>
                                <div className="grid grid-cols-4 col-span-5">
                                    {' '}
                                    {item?.permissions?.map((item: any) => {
                                        return (
                                            // <Form.Item
                                            //     name={`checked${item?.value}`}
                                            //     valuePropName="checked"
                                            // >
                                            //     {' '}
                                            //     <Checkbox>{item?.label}</Checkbox>
                                            // </Form.Item>
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
