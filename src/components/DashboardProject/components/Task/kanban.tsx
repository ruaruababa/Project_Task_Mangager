import {useMemo, useState} from 'react';
// @ts-ignore
import {DragDropContext} from 'react-beautiful-dnd';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Button, notification} from 'antd';
import {useNavigate, useParams} from 'react-router';
import {filterTask, updateTask} from '../../../../services/project';
import FilterTask from '../../../Filter/taskFilter';
import Column from './colKanban';
import ModalPendingReason from './modalPendingReason';
import useProfile from '../../../../hooks/useProfile';

function Kanban() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState<any>();

    const [values, setValues] = useState<any>();
    const {userProfile} = useProfile();
    const canCreateTask = userProfile?.permissions?.includes('task:create');
    const {data: taskFilterResponse, isLoading: taskListLoading} = useQuery({
        queryKey: ['filterTask', id, values],
        queryFn: () => filterTask({id, ...values}),
        keepPreviousData: true,
    });

    const taskFilter = useMemo(() => {
        return taskFilterResponse?.data?.data;
    }, [taskFilterResponse]);

    const queryClient = useQueryClient();
    const {mutate: updateTaskInProject} = useMutation({
        mutationFn: (params: any) => updateTask(params, id, params?.idTask),
        mutationKey: ['updateTask'],
        onSuccess: () => {
            notification.success({
                message: 'Thành công ',
                description: 'Cập nhật thành công',
            });
            queryClient.refetchQueries(['filterTask']);
        },
        onError: (error: any) => {
            const messError = error?.response?.data?.message;
            if (error.request.status === 422 || error.request.status === 403){
                notification.error({
                    message: messError,
                });
            }
            else {
                notification.error({
                    message: 'Lỗi hệ thống, hãy thử lại sau',
                });
            }
            queryClient.refetchQueries(['filterTask']);
        },
    });

    const handleClose = () => {
        setIsShow(false);
        queryClient.refetchQueries(['filterTask']);
    };

    if (taskListLoading) {
        return <div>Loading...</div>;
    }

    function onDragEnd(val: any) {
        // Your version
        // let result = helper.reorder(val.source, val.destination, taskList);
        // setTasks(result);

        /// A different way!
        const {draggableId, source, destination} = val;

        console.log('draggableId', draggableId);
        console.log('source', source);
        console.log('destination', destination);

        const [sourceGroup] = taskFilter?.filter(
            (column: any) =>
                column?.status_id?.toString() === source?.droppableId,
        );

        // Destination might be `null`: when a task is
        // dropped outside any drop area. In this case the
        // task reamins in the same column so `destination` is same as `source`
        const [destinationGroup]: any = destination
            ? taskFilter.filter(
                  (column: any) =>
                      column?.status_id?.toString() === destination.droppableId,
              )
            : {...sourceGroup};

        // We save the task we are moving
        const [movingTask] = sourceGroup?.tasks?.filter(
            (t: any) => t?.id?.toString() === draggableId,
        );

        const newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 1);

        const newDestinationGroupTasks = destinationGroup?.tasks?.splice(
            destination.index,
            0,
            movingTask,
        );

        // Mapping over the task lists means that you can easily
        // add new columns
        const newTaskList = taskFilter?.map((column: any) => {
            if (column.status_id === source.status_id) {
                return {
                    status_id: column.status_id,
                    tasks: newSourceGroupTasks,
                };
            }
            if (column.status_id === destination.status_id) {
                return {
                    status_id: column.status_id,
                    tasks: newDestinationGroupTasks,
                };
            }
            return column;
        });
        if (destination?.droppableId === '3' && source?.droppableId !== '3') {
            setIsShow(true);
            setData({
                status_id: destination?.droppableId,
                idTask: draggableId,
            });
        }
        if (
            source?.droppableId !== destination?.droppableId &&
            destination?.droppableId !== '3'
        ) {
            updateTaskInProject({
                status_id: destination?.droppableId,
                idTask: draggableId,
            });
        }
    }

    return (
        <>
            <div className="h-full">
                {' '}
                <div className="flex justify-between gap-3 mb-10">
                    <div className="">
                        <span
                            className="font-semibold text-gray-400 cursor-pointer"
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Trang chủ /{' '}
                        </span>
                        <span
                            className="font-semibold text-gray-400 cursor-pointer"
                            onClick={() => {
                                navigate('/project');
                            }}
                        >
                            Danh sách dự án /{' '}
                        </span>
                        <span
                            className="font-semibold text-gray-400 cursor-pointer"
                            onClick={() => {
                                navigate(`/project/${id}`);
                            }}
                        >
                            Chi tiết dự án /{' '}
                        </span>
                        <span className="" onClick={() => {}}>
                            Bảng Kanban
                        </span>
                    </div>
                    <div className="flex gap-2">
                        {' '}
                        {canCreateTask &&
                        (<Button
                            className="text-white"
                            onClick={() =>
                                navigate(`/project/${id}/create-task`)
                            }
                            type="primary"
                            size="large"
                        >
                            Thêm đầu việc mới
                        </Button>)}
                        <Button
                            size="large"
                            type="primary"
                            onClick={() =>
                                navigate(`/project/${id}/gantt-chart`)
                            }
                        >
                            Biểu đồ Gantt
                        </Button>
                        <Button
                            size="large"
                            className="text-white"
                            onClick={() => navigate(`/project/${id}/list-task`)}
                            type="primary"
                        >
                            Danh sách đầu việc
                        </Button>
                    </div>
                </div>
                <div className="">
                    <FilterTask setValues={setValues} needHours={true} />
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="grid grid-cols-6 wrapper">
                        {taskFilter?.map((item: any, index: number) => {
                            return (
                                <Column
                                    className="column"
                                    droppableId={item?.status_id.toString()}
                                    list={item?.tasks}
                                    type="TASK"
                                    status_id={item?.status_id}
                                />
                            );
                        })}
                    </div>
                </DragDropContext>
            </div>
            {
                <ModalPendingReason
                    visible={isShow}
                    onCancel={handleClose}
                    data={data}
                    setVisible={setIsShow}
                />
            }
        </>
    );
}

export default Kanban;
