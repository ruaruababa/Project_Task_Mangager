import {useMemo} from 'react';
// @ts-ignore
import {DragDropContext} from 'react-beautiful-dnd';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Button, Input, notification} from 'antd';
import {useNavigate, useParams} from 'react-router';
import {getListDragDrop, updateTask} from '../../../../services/project';
import SelectProject from '../../../SelectProject';
import Column from './col';

function TaskInProject() {
    const navigate = useNavigate();
    const {id} = useParams();
    let initialState = [
        {
            groupName: 'NotStarted',
            tasks: [
                {id: '1', title: 'Test-1'},
                {id: '2', title: 'Test-2'},
            ],
        },
        {
            groupName: 'Pending',
            tasks: [
                {id: '3', title: 'Test-3'},
                {id: '4', title: 'Test-4'},
            ],
        },
        {
            groupName: 'InProgress',
            tasks: [
                {id: '5', title: 'Test-3'},
                {id: '6', title: 'Test-4'},
            ],
        },
        {
            groupName: 'BehindSchedule',
            tasks: [
                {id: '7', title: 'Test-3'},
                {id: '8', title: 'Test-4'},
            ],
        },
        {
            groupName: 'Completed',
            tasks: [
                {id: '9', title: 'Test-3'},
                {id: '10', title: 'Test-4'},
            ],
        },
    ];
    // const [taskList, setTasks] = useState(initialState);

    console.log('id', id);
    const {isLoading: listTaskLoading, data: listTaskDragDropResponse} =
        useQuery({
            queryKey: ['getListDragDrop', id],
            queryFn: () => getListDragDrop(id),
            enabled: !!id,
        });

    const taskList = useMemo(() => {
        return listTaskDragDropResponse?.data?.data;
    }, [listTaskDragDropResponse?.data?.data]);

    console.log('taskList', listTaskDragDropResponse);
    const queryClient = useQueryClient();
    const {mutate: updateTaskInProject, isLoading} = useMutation({
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
            console.log('error', error);
            const messError = error?.response?.data?.message;
            notification.error({
                message: 'Error',
                description: `${messError}` || 'Update failed',
            });
        },
    });

    console.log('listTaskDragDropResponse', taskList);

    if (listTaskLoading) {
        return <div>Loading...</div>;
    }

    function onDragEnd(val: any) {
        // Your version
        // let result = helper.reorder(val.source, val.destination, taskList);
        // setTasks(result);

        /// A different way!
        const {draggableId, source, destination} = val;

        console.log('taskList', taskList);
        console.log('destination', destination);

        const [sourceGroup] = taskList?.filter(
            (column: any) =>
                column?.status_id?.toString() === source?.droppableId,
        );
        console.log('source', source);
        console.log('sourceGroup', sourceGroup);
        console.log('draggableId', draggableId);

        // Destination might be `null`: when a task is
        // dropped outside any drop area. In this case the
        // task reamins in the same column so `destination` is same as `source`
        const [destinationGroup]: any = destination
            ? taskList.filter(
                  (column: any) =>
                      column?.status_id?.toString() === destination.droppableId,
              )
            : {...sourceGroup};

        console.log('destinationGroup', destinationGroup);
        // We save the task we are moving
        const [movingTask] = sourceGroup?.tasks?.filter(
            (t: any) => t?.id?.toString() === draggableId,
        );

        console.log('movingTask', movingTask);

        const newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 1);

        console.log('newSourceGroupTasks', newSourceGroupTasks);
        const newDestinationGroupTasks = destinationGroup?.tasks?.splice(
            destination.index,
            0,
            movingTask,
        );
        console.log('newDestinationGroupTasks>>>', newDestinationGroupTasks);

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
                <div className="flex justify-end gap-3 mb-10">
                    <Button type="primary">Gantt chart</Button>
                    <Button
                        className="text-white bg-blue-600"
                        onClick={() => navigate(`/project/${id}/list-task`)}
                    >
                        List task
                    </Button>
                </div>
                <div className="">
                    <div className="grid grid-cols-9 gap-3 mb-10">
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
                    </div>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="grid grid-cols-5 wrapper">
                        <Column
                            className="column"
                            droppableId="1"
                            list={taskList[0]?.tasks}
                            type="TASK"
                        />
                        <Column
                            className="column"
                            droppableId="2"
                            list={taskList[1]?.tasks}
                            type="TASK"
                        />
                        <Column
                            className="column"
                            droppableId="3"
                            list={taskList[2]?.tasks}
                            type="TASK"
                        />
                        <Column
                            className="column"
                            droppableId="4"
                            list={taskList[3]?.tasks}
                            type="TASK"
                        />
                        <Column
                            className="column"
                            droppableId="5"
                            list={taskList[4]?.tasks}
                            type="TASK"
                            status_id={taskList[4]?.groupName}
                        />
                    </div>
                </DragDropContext>
            </div>
        </>
    );
}

export default TaskInProject;
