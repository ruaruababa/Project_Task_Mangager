import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import useProfile from '../../hooks/useProfile';
import {convertDate} from '../../utils/format';

const UserProfile = () => {
    const {userProfile} = useProfile();
    const navigate = useNavigate();
    const getUpdatePage = () => {
        navigate('/profile/update');
    };

    return (
        <>
            {' '}
            <div className="bg-white shadow-lg rounded-xl">
                <div className="grid grid-cols-12 p-10">
                    <div className="flex flex-col items-center col-span-3 gap-3">
                        <img
                            src={userProfile?.avatar}
                            alt=""
                            className="rounded-full"
                            style={{
                                width: 150,
                                height: 150,
                            }}
                        />
                        <div className="font-bold">{userProfile?.name}</div>
                        <div className="text-xs">
                            Tham gia vào: {convertDate(userProfile?.created_at)}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Button type="primary" onClick={getUpdatePage}>
                                Chỉnh sửa thông tin
                            </Button>
                            <Button
                                type="primary"
                                onClick={getUpdatePage}
                                className="bg-blue-600"
                            >
                                Đổi mật khẩu
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-9 gap-5">
                        <div className="flex gap-3">
                            <div className="font-semibold">Email:</div>
                            <div className="">
                                {userProfile?.email || 'Chưa cập nhật'}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="font-semibold">Ngày sinh:</div>
                            <div className="">
                                {userProfile?.date_of_birth || 'Chưa cập nhật'}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="font-semibold">Số điện thoại:</div>
                            <div className="">
                                {userProfile?.phone || 'Chưa cập nhật'}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="font-semibold">Chức vụ:</div>
                            <div className="">
                                {userProfile?.job_title || 'Chưa cập nhật'}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="font-semibold">Trạng thái:</div>
                            <div className="">
                                {userProfile?.status == 0
                                    ? ' Chưa kích hoạt'
                                    : 'Đã kích hoạt'}
                            </div>
                        </div>
                        {/* <div className="flex gap-3">
                            <div className="font-semibold">Permisstion:</div>
                            <div className="grid grid-cols-6 gap-5">
                                {' '}
                                {userProfile?.permissions?.map((item: any) => {
                                    return (
                                        <Tag
                                            icon={<CheckCircleOutlined />}
                                            color="success"
                                        >
                                            {item}
                                        </Tag>
                                    );
                                })}
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
