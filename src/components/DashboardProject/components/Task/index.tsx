import {useMemo, useState} from 'react';
// @ts-ignore
import {DragDropContext} from 'react-beautiful-dnd';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Button, notification} from 'antd';
import {useNavigate, useParams} from 'react-router';
import {
    filterTask,
    getListDragDrop,
    updateTask,
} from '../../../../services/project';
import FilterTask from '../Filter/taskFilter';
import Column from './col';

function TaskInProject() {
    const navigate = useNavigate();
    const {id} = useParams();


    const {isLoading: listTaskLoading, data: listTaskDragDropResponse} =
        useQuery({
            queryKey: ['getListDragDrop', id],
            queryFn: () => getListDragDrop(id),
            enabled: !!id,
        });

    const taskList = useMemo(() => {
        return listTaskDragDropResponse?.data?.data;
    }, [listTaskDragDropResponse?.data?.data]);

    const [taskListState, setTaskListState] = useState<any>(taskList);

    const [values, setValues] = useState<any>();

    const {data: taskFilterResponse} = useQuery({
        queryKey: ['filterTask', id, values],
        queryFn: () => filterTask({id, ...values}),
    });

    useMemo(() => {
        setTaskListState(taskFilterResponse?.data?.data || []);
    }, [taskFilterResponse]);

    const queryClient = useQueryClient();
    const {mutate: updateTaskInProject} = useMutation({
        mutationFn: (params: any) => updateTask(params, id, params?.idTask),
        mutationKey: ['updateTask'],
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Update successfully',
            });
            queryClient.refetchQueries(['getListDragDrop', id]);
        },
        onError: (error: any) => {
            const messError = error?.response?.data?.message;
            notification.error({
                message: 'Error',
                description: `${messError}` || 'Update failed',
            });
        },
    });

    if (listTaskLoading) {
        return <div>Loading...</div>;
    }

    function onDragEnd(val: any) {
        // Your version
        // let result = helper.reorder(val.source, val.destination, taskList);
        // setTasks(result);

        /// A different way!
        const {draggableId, source, destination} = val;

        const [sourceGroup] = taskList?.filter(
            (column: any) =>
                column?.status_id?.toString() === source?.droppableId,
        );

        // Destination might be `null`: when a task is
        // dropped outside any drop area. In this case the
        // task reamins in the same column so `destination` is same as `source`
        const [destinationGroup]: any = destination
            ? taskList.filter(
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
        // const newTaskList = taskList?.map((column: any) => {
        //     if (column.status_id === source.status_id) {
        //         return {
        //             status_id: column.status_id,
        //             tasks: newSourceGroupTasks,
        //         };
        //     }
        //     if (column.status_id === destination.status_id) {
        //         return {
        //             status_id: column.status_id,
        //             tasks: newDestinationGroupTasks,
        //         };
        //     }
        //     return column;
        // });
        updateTaskInProject({
            status_id: destination?.droppableId,
            idTask: draggableId,
        });
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
                            Project /{' '}
                        </span>
                        <span className="" onClick={() => {}}>
                            Danh sách task
                        </span>
                    </div>
                    <div className="flex gap-2">
                        {' '}
                        <Button
                            className="text-white"
                            onClick={() =>
                                navigate(`/project/${id}/create-task`)
                            }
                            type="primary"
                        >
                            Tạo tạo task mới
                        </Button>
                        <Button
                            type="primary"
                            onClick={() =>
                                navigate(`/project/${id}/gantt-chart`)
                            }
                        >
                            Biểu đồ Gantt
                        </Button>
                        <Button
                            className="text-white"
                            onClick={() => navigate(`/project/${id}/list-task`)}
                            type="primary"
                        >
                            List task
                        </Button>
                    </div>
                </div>
                <div className="">
                    {/* <div className="grid grid-cols-9 gap-3 mb-10">
                        <div className="col-span-2">
                            <Input
                                placeholder="Nhập tên task"
                                className="h-full"
                            />
                        </div>
                        <div className="col-span-2">
                            <SelectProject
                                options={[]}
                                name={'status'}
                                holder="Người thực hiện"
                            />
                        </div>
                        <div className="col-span-2">
                            <SelectProject
                                options={[]}
                                name={'status'}
                                holder="Chọn trạng thái"
                            />
                        </div>

                        <div className="col-span-1">
                            <Button type="primary" size={'large'}>
                                Tìm kiếm
                            </Button>
                        </div>
                    </div> */}
                    <FilterTask setValues={setValues} />
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="grid grid-cols-5 wrapper">
                        {taskListState?.map((item: any, index: number) => {
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
                        {/* <Column
                            className="column"
                            droppableId="5"
                            list={taskList[4]?.tasks}
                            type="TASK"
                            status_id={taskList[4]?.groupName}
                        /> */}
                    </div>
                </DragDropContext>
            </div>
        </>
    );
}

export default TaskInProject;
