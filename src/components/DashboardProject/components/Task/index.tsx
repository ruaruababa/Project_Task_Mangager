import {useMemo, useState} from 'react';
// @ts-ignore
import {DragDropContext} from 'react-beautiful-dnd';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Button, notification} from 'antd';
import {useNavigate, useParams} from 'react-router';
import {filterTask, updateTask} from '../../../../services/project';
import FilterTask from '../Filter/taskFilter';
import Column from './col';
import ModalPendingReason from './modalPendingReason';

function TaskInProject() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState<any>();

    // const {isLoading: listTaskLoading, data: listTaskDragDropResponse} =
    //     useQuery({
    //         queryKey: ['getListDragDrop', id],
    //         queryFn: () => getListDragDrop(id),
    //         enabled: !!id,
    //     });

    // const taskList = useMemo(() => {
    //     return listTaskDragDropResponse?.data?.data;
    // }, [listTaskDragDropResponse?.data?.data]);

    const [values, setValues] = useState<any>();

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
                message: 'Success ',
                description: 'Update successfully',
            });
            queryClient.refetchQueries(['filterTask']);
        },
        onError: (error: any) => {
            const messError = error?.response?.data?.message;
            notification.error({
                message: 'Error',
                description: `${messError}` || 'Update failed',
            });
        },
    });

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
        if (destination?.droppableId === '3') {
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
                            size="large"
                        >
                            Tạo tạo task mới
                        </Button>
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
                    onCancel={() => setIsShow(false)}
                    data={data}
                    setVisible={setIsShow}
                />
            }
        </>
    );
}

export default TaskInProject;
