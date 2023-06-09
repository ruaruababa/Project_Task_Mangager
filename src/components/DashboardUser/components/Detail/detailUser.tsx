import {useQuery} from '@tanstack/react-query';
import {Button, Image} from 'antd';
import {useMemo, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useProfile from '../../../../hooks/useProfile';
import {getDetailUser} from '../../../../services/user';
import {convertDate} from '../../../../utils/format';
import CreateUpdateUserModal from '../CreateUpdate/createUpdateUser';

const DetailUser = () => {
    const {id} = useParams();
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();
    const {userProfile} = useProfile();
    const handleShowModal = () => {
        setIsShow(!isShow);
    };
    const {data: detailUserResponse} = useQuery({
        queryKey: ['getDetailUser', id],
        queryFn: () => getDetailUser(id),
    });

    const detailUser = useMemo(() => {
        return detailUserResponse?.data?.data || [];
    }, [detailUserResponse]);

    const canViewUser = userProfile?.permissions?.includes('user:view');
    const canUpdateUser = userProfile?.permissions?.includes('user:update');

    return (
        <>
            {canViewUser && (
                <>
                    <div className="py-5">
                        <span
                            className="font-semibold text-gray-400 cursor-pointer hover:text-blue-500"
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Trang chủ /{' '}
                        </span>
                        <span
                            onClick={() => navigate('/user')}
                            className="font-semibold text-gray-400 cursor-pointer hover:text-blue-500"
                        >
                            Danh sách người dùng /{' '}
                        </span>
                        <span>Chi tiết người dùng</span>
                    </div>{' '}
                    <div className="p-10 bg-white rounded-lg">
                        <div className="flex justify-end">
                            {(canUpdateUser && detailUser?.is_editable) &&
                            (<Button
                                type="primary"
                                size="large"
                                onClick={handleShowModal}
                            >
                                {' '}
                                Chỉnh sửa thông tin
                            </Button>)}
                        </div>
                        <div className="pb-8 text-3xl font-semibold text-center">
                            Thông tin
                        </div>

                        <div className="grid grid-cols-12">
                            <div className="flex flex-col col-span-4 gap-5">
                                <div className="">
                                    <Image
                                        preview={false}
                                        width={200}
                                        height={200}
                                        src={
                                            detailUser?.avatar || '/avatar.jpg'
                                        }
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <div className="font-semibold">
                                        Họ và tên:
                                    </div>
                                    <div className="">{detailUser.name}</div>
                                </div>
                                <div className="font-semibold">
                                    Đã tham gia vào:{' '}
                                    {convertDate(detailUser?.created_at)}
                                </div>
                            </div>
                            <div className="flex flex-col col-span-8 gap-9">
                                <div className="grid grid-cols-7 gap-2">
                                    <div className="col-span-1 font-semibold">
                                        Email:
                                    </div>
                                    <div className="col-span-2">
                                        {detailUser?.email}
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    <div className="col-span-1 font-semibold ">
                                        Số điện thoại:
                                    </div>
                                    <div className="col-span-2">
                                        {detailUser?.phone || 'Chưa cập nhật'}
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    <div className="col-span-1 font-semibold">
                                        Địa chỉ:
                                    </div>
                                    <div className="col-span-2">
                                        {detailUser?.address || 'Chưa cập nhật'}
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    <div className="col-span-1 font-semibold">
                                        Ngày sinh:
                                    </div>
                                    <div className="col-span-2">
                                        {detailUser?.date_of_birth ||
                                            'Chưa cập nhật'}
                                    </div>
                                </div>
                                <div className="grid grid-cols-7">
                                    <div className="font-semibold">
                                        Chức vụ:
                                    </div>
                                    <div className="">
                                        {detailUser?.job_title ||
                                            'Chưa cập nhật'}
                                    </div>
                                </div>
                                <div className="grid grid-cols-7">
                                    <div className="font-semibold">
                                        Trạng thái:
                                    </div>
                                    <div className="">
                                        {detailUser?.status === 1
                                            ? 'Kích hoạt'
                                            : 'Chưa kích hoạt'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            <CreateUpdateUserModal
                                onCancel={handleShowModal}
                                visible={isShow}
                                initalValues={detailUser}
                            />
                        }
                    </div>
                </>
            )}
        </>
    );
};

export default DetailUser;
