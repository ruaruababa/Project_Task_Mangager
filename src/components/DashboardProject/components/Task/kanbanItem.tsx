import {useMutation, useQueryClient} from '@tanstack/react-query';
import {notification} from 'antd';
import {useState} from 'react';
// @ts-ignore
import {Draggable} from 'react-beautiful-dnd';
import {useNavigate} from 'react-router-dom';
import {removeTaskInProject} from '../../../../services/tasks';
import UserAvatar from '../Item/avatar';
import Action from './action';
import {ModalConfirm} from './detailTask';

function Task(props: any) {
    const {index, data, idProject} = props;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [visible, setVisible] = useState(false);

    const {mutate: removeTaskMutate} = useMutation({
        mutationFn: () => removeTaskInProject(idProject, data?.id),
        mutationKey: ['removeTaskInProject', idProject, data?.id],
        onSuccess: () => {
            notification.success({
                message: 'Thành công ',
                description: 'Xóa đầu việc thành công',
            });
            queryClient.invalidateQueries(['filterTask']);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });
    return (
        <>
            <Draggable
                draggableId={data?.id?.toString()}
                index={index}
                type="TASK"
                isDragDisabled={!data?.can_update}
            >
                {(provided: any) => (
                    <div
                        className="p-4 bg-white rounded-md shadow-md"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="flex flex-col gap-5 p-3">
                            <div
                                className="text-blue-500 cursor-pointer line-clamp-1"
                                onClick={() =>
                                    navigate(
                                        `/project/${idProject}/tasks/${data?.id}`,
                                    )
                                }
                            >
                                {data?.name}
                            </div>
                            <div className="flex flex-col gap-2">
                                {' '}
                                <div className="flex justify-between">
                                    <div className="">#{data?.id}</div>
                                    <div className="">
                                        <Action
                                            item={data}
                                            setShowModal={setVisible}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="flex col-span-2 py-2 text-center"
                                    style={{
                                        borderTop: '1px solid #e5e7eb',
                                    }}
                                >
                                    <UserAvatar users={data?.users || []} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
            {
                <ModalConfirm
                    isShow={visible}
                    onCancel={() => setVisible(false)}
                    handleRemoveReportFile={() => {
                        removeTaskMutate(idProject, data?.id);
                        setVisible(false);
                    }}
                    title={'Bạn có chắc xóa đầu việc này'}
                />
            }
        </>
    );
}

export default Task;
