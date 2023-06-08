import {DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {notification} from 'antd';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useProfile from '../../../../hooks/useProfile';
import {removeProject} from '../../../../services/project';
import {ModalConfirm} from '../Task/detailTask';
const Action = (props: any) => {
    const {item} = props;
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false);
    const {userProfile} = useProfile();
    const canViewProject = userProfile?.permissions?.includes('project:view');
    const canUpdateProject =
        userProfile?.permissions?.includes('project:update');
    const canDeleteProject =
        userProfile?.permissions?.includes('project:delete');
    const handleViewDetail = () => {
        canViewProject
            ? navigate(`/project/${item.id}`)
            : notification.error({
                  message: 'Error',
                  description: 'Bạn không có quyền xem chi tiết Project',
              });
    };

    const handleEditProject = () => {
        canUpdateProject
            ? navigate(`/project/edit/${item.id}`)
            : notification.error({
                  message: 'Error',
                  description: 'Bạn không có quyền chỉnh sửa Project',
              });
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
            queryClient.invalidateQueries(['filterProject']);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    const handleRemoveProject = () => {
        if (canDeleteProject) {
            removeProjectMutate();
            setIsShow(false);
        } else {
            notification.error({
                message: 'Error',
                description: 'Bạn không có quyền xóa Project',
            });
        }
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
