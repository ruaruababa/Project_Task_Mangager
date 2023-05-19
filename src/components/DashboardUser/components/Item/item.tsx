import {useNavigate} from 'react-router-dom';
import Action from '../../../Action';

const UserItem = ({user}: any) => {
    const router = useNavigate();
    const handleViewDetail = () => {
        router(`/user/${user?.id}/detail`);
    };
    const handleEdit = () => {
        router(`/user/${user?.id}/edit`);
    };
    const handleRemove = () => {};

    return (
        <div
            className="grid grid-cols-8 py-4 text-base font-semibold text-black "
        >
            <div className="col-span-2">{user?.name}</div>
            <div className="col-span-2">{user?.email}</div>
            <div className="">{user?.phone}</div>
            <div className="">{user?.job_title}</div>
            <div className="">
                {user?.status === 1 ? 'Kích hoạt' : 'Chưa kích hoạt'}
            </div>
            <div className="">
                <Action
                    handleView={handleViewDetail}
                    handleEdit={handleEdit}
                    handleDelete={handleRemove}
                />
            </div>
        </div>
    );
};

export default UserItem;
