import {DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';

interface Props {
    handleView?: () => void;
    handleEdit?: () => void;
    handleDelete?: () => void;
}

const Action = (props: Props) => {
    const {handleDelete, handleEdit, handleView} = props;

    return (
        <div className="flex items-center justify-center col-span-2 gap-2">
            <div className="cursor-pointer" onClick={handleView}>
                <EyeOutlined />
            </div>
            <div className="cursor-pointer" onClick={handleEdit}>
                <EditOutlined />
            </div>

            <div className="cursor-pointer" onClick={handleDelete}>
                <DeleteOutlined />
            </div>
        </div>
    );
};

export default Action;
