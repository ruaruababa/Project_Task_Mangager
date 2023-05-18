import {CopyOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useNavigate, useParams} from 'react-router-dom';

interface IProps {
    item: any;
}

const Action = (props: IProps) => {
    const {item} = props;
    const {id} = useParams();
    const navigate = useNavigate();

    return (
        <div className="flex gap-1">
            <div
                className="cursor-pointer"
                onClick={() => navigate(`/project/${id}/tasks/${item.id}/edit`)}
            >
                <EditOutlined />
            </div>
            <div className="cursor-pointer">
                <DeleteOutlined />
            </div>
            <div className="cursor-pointer">
                <CopyOutlined />
            </div>
        </div>
    );
};

export default Action;
