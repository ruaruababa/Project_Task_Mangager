import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Action from '../../../Action';
import CreateUpdateUserModal from '../CreateUpdate/createUpdateUser';

const UserItem = ({user}: any) => {
    const [isShow, setIsShow] = useState(false);
    const router = useNavigate();
    const handleViewDetail = () => {
        router(`/user/${user?.id}/detail`);
    };
    const handleShowModal = () => {
        setIsShow(!isShow);
    };
    const handleRemove = () => {};

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
        </div>
    );
};

export default UserItem;
