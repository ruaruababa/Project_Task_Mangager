import {PlusOutlined} from '@ant-design/icons';
import {Card, notification} from 'antd';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useProfile from '../../../../hooks/useProfile';
import useRole from '../../../../hooks/useRole';
import CreateUpdateRoleModal from '../CreateUpdate/createUpdateRole';
import Item from '../Item/itemCardPermission';

const ListRole = () => {
    const {roles} = useRole();
    const {userProfile} = useProfile();
    const [isShow, setIsShow] = useState(false);
    const handleCancel = () => {
        setIsShow(false);
    };

    const canCreateRole = userProfile?.permissions?.includes('role:create');


    const handleOpenModal = () => {
        canCreateRole
            ? setIsShow(true)
            : notification.error({
                  message: 'Lỗi',
                  description: 'Bạn không có quyền tạo nhóm vai trò',
              });
    };

    const navigate = useNavigate();

    return (
        <>
            {' '}
            <div className="py-5 text-lg">
                <span
                    onClick={() => {
                        navigate('/');
                    }}
                    className="font-semibold text-gray-400 cursor-pointer hover:text-blue-500 "
                >
                    Trang chủ /{' '}
                </span>
                <span className="font-semibold">Quản lý vai trò</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {canCreateRole &&
                (<Card
                    bordered={false}
                    className="flex flex-col items-center justify-center cursor-pointer"
                    onClick={handleOpenModal}
                >
                    <div className="flex flex-col items-center gap-2">
                        <PlusOutlined
                            style={{
                                fontSize: 50,
                            }}
                        />
                        <div className="">Thêm vai trò</div>
                    </div>
                </Card>)}
                {roles?.map((item: any, index: any) => (
                    <Item key={index} item={item} />
                ))}
            </div>
            <CreateUpdateRoleModal
                visible={isShow}
                onCancel={handleCancel}
                mode={'create'}
            />
        </>
    );
};

export default ListRole;
