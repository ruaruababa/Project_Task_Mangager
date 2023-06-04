import {DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {notification} from 'antd';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {removeProject} from '../../../../services/project';
import {ModalConfirm} from '../Task/detailTask';
const Action = (props: any) => {
    const {item} = props;
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false);

    const handleViewDetail = () => {
        navigate(`/project/${item.id}`);
    };

    const handleEditProject = () => {
        navigate(`/project/edit/${item.id}`);
    };
    const queryClient = useQueryClient();

    const {mutate: removeProjectMutate} = useMutation({
        mutationKey: ['removeProject'],
        mutationFn: () => removeProject(item?.id),
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Xóa Project thành công',
            });
            queryClient.invalidateQueries(['getListProject']);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    const handleRemoveProject = () => {
        removeProjectMutate();
        setIsShow(false);
    };

    return (
        <>
            {' '}
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
                {/* <div className="cursor-pointer">
            <CopyOutlined />
        </div> */}
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        setIsShow(true);
                    }}
                >
                    <DeleteOutlined />
                </div>
            </div>
            {
                <ModalConfirm
                    isShow={isShow}
                    onCancel={() => setIsShow(false)}
                    handleRemoveReportFile={handleRemoveProject}
                    title={'Xóa Project'}
                />
            }
        </>
    );
};

export default Action;
