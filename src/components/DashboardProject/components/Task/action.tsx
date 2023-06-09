import {
    DeleteOutlined,
    EditOutlined,
    EyeInvisibleOutlined,
} from '@ant-design/icons';
import {useNavigate, useParams} from 'react-router-dom';
import useProfile from '../../../../hooks/useProfile';

interface IProps {
    item: any;
    setShowModal?: any;
}

const Action = (props: IProps) => {
    const {item, setShowModal} = props;
    const {id} = useParams();
    const navigate = useNavigate();
    const {userProfile} = useProfile();
    const canViewTask = userProfile?.permissions?.includes('task:view');
    return (
        <div className="flex gap-1">
            {canViewTask && 
            (<div
                className="cursor-pointer"
                onClick={() => {
                    navigate(`/project/${id}/tasks/${item.id}`);
                }}
            >
                <EyeInvisibleOutlined />
            </div>)}
            {item?.can_update &&
            (<div
                className="cursor-pointer"
                onClick={() => navigate(`/project/${id}/tasks/${item.id}/edit`)}
            >
                <EditOutlined />
            </div>)}
            {item?.can_delete &&
            (<div className="cursor-pointer" onClick={() => setShowModal(true)}>
                <DeleteOutlined />
            </div>)}
        </div>
    );
};

export default Action;
