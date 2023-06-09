import {useMutation, useQueryClient} from '@tanstack/react-query';
import {notification} from 'antd';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useProfile from '../../../hooks/useProfile';
import {removeTaskInProject} from '../../../services/tasks';
import {convertDateTime} from '../../../utils/format';
import Action from '../../Action';
import {ModalConfirm} from '../../DashboardProject/components/Task/detailTask';

const TaskItem = ({task, projectId}: any) => {
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false);
    const queryClient = useQueryClient();
    const {userProfile} = useProfile();
    const canEditTask = userProfile?.permissions?.includes('task:update');
    const canDeleteTask = userProfile?.permissions?.includes('task:delete');
    const canViewTask = userProfile?.permissions?.includes('task:view');

    const {mutate: removeTaskMutate} = useMutation({
        mutationFn: () => removeTaskInProject(projectId, task?.id),
        mutationKey: ['removeTaskInProject', projectId, task?.id],
        onSuccess: () => {
            notification.success({
                message: 'Thành công ',
                description: 'Xóa đầu việc thành công',
            });
            queryClient.invalidateQueries(['getListTaskInProject']);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Lỗi',
                description: error?.response?.data?.message,
            });
        },
    });


    return (
        <>
            {' '}
            <div className="grid grid-cols-12 py-4 pb-4 border-bottom">
                <div className="col-span-2">{task?.id}</div>

                <div
                    className="items-center col-span-4 text-blue-700 cursor-pointer hover:text-blue-900"
                    onClick={() =>
                        navigate(
                            `/project/${task?.project_id}/tasks/${task?.id}}`,
                        )
                    }
                >
                    {task?.name}
                </div>
                <div className="grid grid-cols-8 col-span-6">
                    <div className="col-span-2">
                        {convertDateTime(task?.starts_at)}
                    </div>
                    <div className="col-span-2 text-center">
                        {convertDateTime(task?.ends_at)}
                    </div>
                    <div
                        className="flex col-span-2 ml-[55%] translate-x-[-50%]"
                        style={{
                            color: task?.status?.color,
                        }}
                    >
                        {task?.status?.name}
                    </div>
                    <div className="flex justify-center col-span-2">
                        <Action
                            handleView={() =>
                                canViewTask
                                    ? navigate(
                                          `/project/${projectId}/tasks/${task?.id}`,
                                      )
                                    : notification.error({
                                          message: 'Lỗi',
                                          description:
                                              'Bạn không có quyền xem đầu việc',
                                      })
                            }
                            handleEdit={() =>
                                canEditTask && task?.can_update
                                    ? navigate(
                                          `/project/${projectId}/tasks/${task?.id}/edit`,
                                      )
                                    : notification.error({
                                          message: 'Lỗi',
                                          description:
                                              'Bạn không có quyền chỉnh sửa đầu việc',
                                      })
                            }
                            handleDelete={() => {
                                canDeleteTask && task?.can_delete
                                    ? setIsShow(true)
                                    : notification.error({
                                          message: 'Lỗi',
                                          description:
                                              'Bạn không có quyền xóa đầu việc',
                                      });
                            }}

                            onlyCanView={true}
                            canView={canViewTask}
                            canUpdate={canEditTask && task?.can_update}
                            canDelete={canDeleteTask && task?.can_delete}
                        />
                    </div>
                </div>
            </div>
            {
                <ModalConfirm
                    isShow={isShow}
                    onCancel={() => setIsShow(false)}
                    handleRemoveReportFile={() => {
                        removeTaskMutate(projectId, task?.id);
                        setIsShow(false);
                    }}
                    title={'Bạn có chắc xóa đầu việc này'}
                />
            }
        </>
    );
};

export default TaskItem;
