import {useMutation, useQueryClient} from '@tanstack/react-query';
import {notification} from 'antd';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useProfile from '../../../../hooks/useProfile';
import {removeUser} from '../../../../services/user';
import Action from '../../../Action';
import {ModalConfirm} from '../../../DashboardProject/components/Task/detailTask';
import CreateUpdateUserModal from '../CreateUpdate/createUpdateUser';

const UserItem = ({user}: any) => {
    const [isShow, setIsShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const {userProfile} = useProfile();
    const canViewUser = userProfile?.permissions?.includes('user:view');
    const canUpdateUser = userProfile?.permissions?.includes('user:update');
    const canDeleteUser = userProfile?.permissions?.includes('user:delete');
    const router = useNavigate();
    const handleViewDetail = () => {
        canViewUser
            ? router(`/user/${user?.id}/detail`)
            : notification.error({
                  message: 'Error',
                  description: 'Bạn không có quyền xem chi tiết người dùng',
              });
    };
    const handleShowModal = () => {
        canUpdateUser
            ? setIsShow(!isShow)
            : notification.error({
                  message: 'Error',
                  description: 'Bạn không có quyền chỉnh sửa người dùng',
              });
    };
    const handleRemove = () => {
        canDeleteUser
            ? setShowModal(true)
            : notification.error({
                  message: 'Error',
                  description: 'Bạn không có quyền xóa người dùng',
              });
    };

    const queryCLient = useQueryClient();

    const {mutate: removeUserMutate} = useMutation({
        mutationFn: removeUser,
        mutationKey: ['removeUser'],
        onSuccess: () => {
            queryCLient?.refetchQueries(['filterUser']);
            notification.success({
                message: 'Success ',
                description: 'Remove successfully',
            });
            setShowModal(false);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    return (
        <div className="grid grid-cols-8 py-4 text-base font-semibold text-black ">
            <div className="col-span-2">{user?.name}</div>
            <div className="col-span-2">{user?.email}</div>
            <div className="">{user?.phone}</div>
            <div className="">{user?.job_title}</div>
            <div className="">
                {user?.status === 1 ? 'Đã Kích hoạt' : 'Chưa kích hoạt'}
            </div>
            <div className="">
                <Action
                    handleView={handleViewDetail}
                    handleEdit={handleShowModal}
                    handleDelete={handleRemove}
                />
            </div>
            {
                <CreateUpdateUserModal
                    onCancel={handleShowModal}
                    visible={isShow}
                    key={user?.email}
                    initalValues={user}
                />
            }
            {
                <ModalConfirm
                    isShow={showModal}
                    onCancel={() => setShowModal(false)}
                    handleRemoveReportFile={() => {
                        removeUserMutate(user?.id);
                    }}
                    title={'Xóa người dùng'}
                />
            }
        </div>
    );
};

export default UserItem;
