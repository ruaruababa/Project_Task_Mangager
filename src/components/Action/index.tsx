import {DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';

interface Props {
    handleView?: () => void;
    handleEdit?: () => void;
    handleDelete?: () => void;
    onlyCanView?: boolean;
}

const Action = (props: Props) => {
    const {handleDelete, handleEdit, handleView, onlyCanView} = props;
    
    return (
        <div className="flex items-center justify-center col-span-2 gap-2">
            <div className="cursor-pointer" onClick={handleView}>
                <EyeOutlined />
            </div>
            {!onlyCanView && (<div className="cursor-pointer" onClick={handleEdit}>
                <EditOutlined />
            </div>)}

            {!onlyCanView && (<div
                className={`cursor-pointer ${
                    onlyCanView && 'pointer-events-none'
                }`}
                onClick={handleDelete}
            >
                <DeleteOutlined />
            </div>)}
        </div>
    );
};

export default Action;
