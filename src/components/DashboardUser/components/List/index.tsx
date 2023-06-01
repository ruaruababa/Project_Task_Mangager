import {useQuery} from '@tanstack/react-query';
import {Button, Form, Input} from 'antd';
import {useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {filterUser} from '../../../../services/user';
import Pagination from '../../../Pagination';
import CreateUpdateUserModal from '../CreateUpdate/createUpdateUser';
import UserItem from '../Item/item';

const ListUser = () => {
    const [page, setPage] = useState(1);
    const [form] = Form.useForm();
    const [isShowCreateModal, setIsShowCreateModal] = useState(false);
    // const {data: listUserResponse} = useQuery({
    //     queryKey: ['getListUserInSystem', page],
    //     queryFn: () => getListUserInSystem(page),
    //     keepPreviousData: true,
    // });

    // const listUser = useMemo(() => {
    //     return listUserResponse?.data?.data || [];
    // }, [listUserResponse]);

    // const [userData, setUserData] = useState<any>(listUser);

    // const total = useMemo(() => {
    //     return listUserResponse?.data?.meta?.total || 0;
    // }, [listUserResponse]);

    const [params, setParams] = useState<any>('');

    const {data: userFilterResponse} = useQuery({
        queryKey: ['filterUser', page, params],
        queryFn: () => filterUser({...params, page}),
    });

    const total = useMemo(() => {
        return userFilterResponse?.data?.meta?.total || 0;
    }, [userFilterResponse]);

    const listUser = useMemo(() => {
        return userFilterResponse?.data?.data || [];
    }, [userFilterResponse]);

    const navigate = useNavigate();

    return (
        <>
            <div className="mb-5 text-lg">
                <span
                    onClick={() => {
                        navigate('/');
                    }}
                    className="font-semibold text-gray-400 cursor-pointer hover:text-blue-500"
                >
                    Trang chủ /{' '}
                </span>
                <span className="mb-2 text-lg font-semibold">
                    Danh sách người dùng
                </span>
            </div>
            <div className="flex flex-col p-10 bg-white rounded-lg">
                <div className="flex justify-between gap-3 mb-10 ">
                    <Form
                        form={form}
                        name="basic"
                        onFinish={(values) => {
                            setParams(values);
                        }}
                        autoComplete="off"
                    >
                        <div className="grid grid-cols-8 gap-3">
                            <Form.Item name="userName" className="col-span-3">
                                <Input placeholder="Nhập tên người dùng" />
                            </Form.Item>

                            <Form.Item name="email" className="col-span-3">
                                <Input placeholder="Nhập email" />
                            </Form.Item>

                            <Form.Item>
                                <div className="flex gap-3">
                                    {' '}
                                    <Button type="primary" htmlType="submit">
                                        Tìm kiếm
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            form.resetFields();
                                        }}
                                        className="text-white bg-blue-500"
                                    >
                                        Xóa bộ lọc
                                    </Button>
                                </div>
                            </Form.Item>
                        </div>
                    </Form>
                    <div>
                        {' '}
                        <Button
                            className="text-white bg-blue-500"
                            size={'large'}
                            onClick={() => {
                                setIsShowCreateModal(true);
                            }}
                        >
                            Thêm người dùng
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col text-xl">
                    <div className="grid grid-cols-8 pb-4 text-xs font-semibold text-gray-400 border-bottom">
                        <div className="col-span-2">NGƯỜI DÙNG</div>
                        <div className="col-span-2">EMAIL</div>
                        <div className="">SỐ ĐIỆN THOẠI</div>
                        <div className="">CHỨC VỤ</div>
                        <div className="">TRẠNG THÁI</div>
                        <div className="text-center">ACTION</div>
                    </div>
                    {listUser?.map((user: any) => {
                        return (
                            <>
                                <UserItem user={user} key={user?.name} />
                            </>
                        );
                    })}
                </div>
            </div>
            <div className="mt-5">
                <Pagination
                    currentPage={page}
                    totalCount={total || listUser?.length || 0}
                    pageSize={10}
                    onPageChange={(page: any) => setPage(page)}
                />
            </div>
            {
                <CreateUpdateUserModal
                    visible={isShowCreateModal}
                    onCancel={() => setIsShowCreateModal((pre) => !pre)}
                />
            }
        </>
    );
};

export default ListUser;
