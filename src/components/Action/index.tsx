import {DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';

interface Props {
    handleView?: () => void;
    handleEdit?: () => void;
    handleDelete?: () => void;
    onlyCanView?: boolean;
    canView?: boolean,
    canUpdate?: boolean;
    canDelete?: boolean;
}

const Action = (props: Props) => {
    const {handleDelete, handleEdit, handleView, onlyCanView, canView, canUpdate, canDelete} = props;
    
    return (
        <div className="flex items-center justify-center col-span-2 gap-2">
            {canView &&
            (<div className="cursor-pointer" onClick={handleView}>
                <EyeOutlined />
            </div>)}
            {(!onlyCanView || canUpdate) && 
            (<div className="cursor-pointer" onClick={handleEdit}>
                <EditOutlined />
            </div>)}

            {(!onlyCanView || canDelete) && 
            (<div
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
