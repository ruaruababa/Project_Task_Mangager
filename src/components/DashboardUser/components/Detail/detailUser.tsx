import {CheckOutlined, EditOutlined} from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query';
import {Form, Image, Input} from 'antd';
import {useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getDetailUser} from '../../../../services/user';
import {convertDate} from '../../../../utils/format';

const DetailUser = () => {
    const {id} = useParams();
    const [isEditMode, setIsEditMode] = useState(false);
    const {isLoading, data: detailUserResponse} = useQuery({
        queryKey: ['getDetailUser', id],
        queryFn: () => getDetailUser(id),
    });

    const detailUser = useMemo(() => {
        return detailUserResponse?.data?.data || [];
    }, [detailUserResponse]);

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const handleEdit = () => {
        setIsEditMode(!isEditMode);
    };

    return (
        <div className="p-10 bg-white rounded-lg">
            <div className="pb-8 text-3xl font-semibold text-center">
                Thông tin
            </div>
            <Form
                // labelCol={{span: 8}}
                // wrapperCol={{span: 16}}
                // style={{maxWidth: 600}}
                // initialValues={{remember: true}}
                initialValues={detailUser}
                onFinish={onFinish}
                autoComplete="off"
            >
                {' '}
                <div className="grid grid-cols-12">
                    <div className="flex flex-col col-span-4 gap-5">
                        <div className="">
                            <Image
                                preview={false}
                                width={200}
                                height={200}
                                src={detailUser?.avatar || '/avatar.jpg'}
                                className="rounded-full"
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="font-semibold">Họ và tên:</div>
                            {isEditMode ? (
                                <div className="">{detailUser?.name}</div>
                            ) : (
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            )}
                            <div
                                className="cursor-pointer"
                                onClick={handleEdit}
                            >
                                {!isEditMode ? (
                                    <CheckOutlined
                                        style={{
                                            color: 'green',
                                        }}
                                    />
                                ) : (
                                    <EditOutlined
                                        style={{
                                            color: 'gray',
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="font-semibold">
                            Đã tham gia vào:{' '}
                            {convertDate(detailUser?.created_at)}
                        </div>
                    </div>
                    <div className="flex flex-col col-span-8 gap-9">
                        <div className="grid grid-cols-7">
                            <div className="col-span-1 font-semibold">
                                Email:
                            </div>
                            {isEditMode ? (
                                <div className="">{detailUser?.email}</div>
                            ) : (
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập email',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            )}
                            <div
                                className="cursor-pointer"
                                onClick={handleEdit}
                            >
                                {!isEditMode ? (
                                    <CheckOutlined
                                        style={{
                                            color: 'green',
                                        }}
                                    />
                                ) : (
                                    <EditOutlined
                                        style={{
                                            color: 'gray',
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-7">
                            <div className="col-span-1 font-semibold ">
                                Số điện thoại:
                            </div>
                            {isEditMode ? (
                                <div className="">
                                    {detailUser?.phone || 'Chưa cập nhật'}
                                </div>
                            ) : (
                                <Form.Item
                                    name="phone"
                                    initialValue={detailUser?.phone || ''}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập số điện thoại',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            )}
                            <div
                                className="cursor-pointer"
                                onClick={handleEdit}
                            >
                                {!isEditMode ? (
                                    <CheckOutlined
                                        style={{
                                            color: 'green',
                                        }}
                                    />
                                ) : (
                                    <EditOutlined
                                        style={{
                                            color: 'gray',
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-7">
                            <div className="col-span-1 font-semibold">
                                Địa chỉ:
                            </div>
                            {isEditMode ? (
                                <div className="">{detailUser?.name}</div>
                            ) : (
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            )}
                            <div
                                className="cursor-pointer"
                                onClick={handleEdit}
                            >
                                {!isEditMode ? (
                                    <CheckOutlined
                                        style={{
                                            color: 'green',
                                        }}
                                    />
                                ) : (
                                    <EditOutlined
                                        style={{
                                            color: 'gray',
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            <div className="col-span-1 font-semibold">
                                Ngày sinh:
                            </div>
                            {isEditMode ? (
                                <div className="col-span-2">
                                    {detailUser?.name}
                                </div>
                            ) : (
                                <Form.Item
                                    className="col-span-2"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            )}
                            <div
                                className="cursor-pointer"
                                onClick={handleEdit}
                            >
                                {!isEditMode ? (
                                    <CheckOutlined
                                        style={{
                                            color: 'green',
                                        }}
                                    />
                                ) : (
                                    <EditOutlined
                                        style={{
                                            color: 'gray',
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-7">
                            <div className="font-semibold">Chức vụ:</div>
                            <div className="">
                                {detailUser?.job_title || 'Chưa cập nhật'}
                            </div>
                        </div>
                        <div className="grid grid-cols-7">
                            <div className="font-semibold">Trạng thái:</div>
                            <div className="">
                                {detailUser?.status === 1
                                    ? 'Kích hoạt'
                                    : 'Chưa kích hoạt'}
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default DetailUser;
