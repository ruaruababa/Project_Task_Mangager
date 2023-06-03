import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, Checkbox, Form, Input, Modal, notification} from 'antd';
import {useEffect, useMemo} from 'react';
import {styled} from 'styled-components';
import usePermission from '../../../../hooks/usePermission';
import {createRole, updateRole} from '../../../../services/role';

interface Props {
    visible: boolean;
    onCancel: () => void;
    initalValues?: any;
    mode?: any;
    viewOnly?: boolean;
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
    const {visible, onCancel, initalValues, mode, viewOnly} = props;
    const [form] = Form.useForm();
    const {permissions} = usePermission();

    const queryCLient = useQueryClient();

    useEffect(() => {
        if (initalValues) {
            form.setFieldsValue(initalValues);
        }
    }, [form, initalValues]);

    useEffect(() => {
        if (viewOnly) {
            const fields = form.getFieldsValue(); // Get the current values of all fields
            const disabledFields = Object.keys(fields).reduce(
                (acc: any, key: any) => {
                    acc[key] = true; // Set the disabled prop to true for each field
                    return acc;
                },
                {},
            );
            form.setFieldsValue(disabledFields);
        }
    }, [form, viewOnly]);

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

    const {mutate: createRoleMutate, isLoading} = useMutation({
        mutationFn: createRole,
        mutationKey: ['createRole'],
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Create successfully',
            });
            queryCLient?.refetchQueries(['getListRole']);
            form.resetFields();
        },
        onError: () => {
            notification.error({
                message: 'Error',
                description: 'Create failed',
            });
        },
    });

    const {mutate: updateRoleMutate} = useMutation({
        mutationFn: (input: any) => updateRole(initalValues?.id, input),
        mutationKey: ['updateRole'],
        onSuccess: () => {
            queryCLient?.refetchQueries(['getListRole']);
            notification.success({
                message: 'Success ',
                description: 'Update successfully',
            });
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    const handleFinish = (values: any) => {
        const values_ = [];
        for (let x in values) {
            if (values[x] === true) {
                values_.push(x);
            }
        }
        const lastResult = values_.map((item: any) => {
            if (item.includes('checked')) {
                return item.split('checked')[1];
            }
        });

        const input_ = lastResult.filter((item: any) => {
            return item !== undefined;
        });

        const input = {
            name: values?.name,
            permission_ids: input_,
        };
        if (initalValues) {
            updateRoleMutate(input);
        } else {
            createRoleMutate(input);
        }
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
                disabled={viewOnly}
                form={form}
                onFinish={handleFinish}
                layout="vertical"
                onValuesChange={(changedValues, allValues) => {
                    const dataPer = data.filter((item: any) => {
                        return changedValues[item?.name] === true;
                    });

                    console.log('dataPer', dataPer);

                    if (dataPer?.length > 0) {
                        dataPer[0]?.permissions?.map((per: any) => {
                            return form.setFieldsValue({
                                [`checked${per?.value}`]: true,
                            });
                        });
                    }

                    const dataPerFalse = data?.filter((item: any) => {
                        return changedValues[item?.name] === false;
                    });
                    dataPerFalse?.map((item: any) => {
                        return item?.permissions?.map((per: any) => {
                            return form.setFieldsValue({
                                [`checked${per?.value}`]: false,
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
                                                name={`checked${item?.value}`}
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
