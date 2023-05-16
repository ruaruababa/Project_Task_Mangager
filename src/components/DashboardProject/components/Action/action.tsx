import {
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
const Action = (props: any) => {
    const {item} = props;
    const navigate = useNavigate();

    const handleViewDetail = () => {
        navigate(`/project/${item.id}`);
    };

    const handleEditProject = () => {
        navigate(`/project/edit/${item.id}`);
    };

    return (
        <div
            className="flex items-center justify-center col-span-2 gap-2"
            style={{
                borderLeft: `1px solid black`,
            }}
        >
            <div className="cursor-pointer" onClick={handleViewDetail}>
                <EyeOutlined />
            </div>
            <div className="cursor-pointer" onClick={handleEditProject}>
                <EditOutlined />
            </div>
            <div className="cursor-pointer">
                <CopyOutlined />
            </div>
            <div className="cursor-pointer">
                <DeleteOutlined />
            </div>
        </div>
    );
};

export default Action;
