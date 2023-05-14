// import {Button, Col, Input} from 'antd';
// import {useState} from 'react';
// import {useNavigate} from 'react-router-dom';
// import useStatus from '../../../../hooks/useStatus';
// import useUser from '../../../../hooks/useUser';
// import {reorder} from '../../../../utils/reorder';
// import {DragDrop} from '../../../DragDrop';
// import SelectProject from '../../../SelectProject';
// import useTaskInProject from '../../hooks/useTaskProject';

// const TaskInProject = () => {
//     const [dataSource, setDataSource] = useState<any>([]);
//     const router = useNavigate();
//     const {statusOptions} = useStatus();
//     const {listUser} = useUser();
//     const {taskInProjects} = useTaskInProject();
//     console.log('taskInProjects', taskInProjects);
//     const BannerItem = ({data: e, idx: index}: any) => {
//         return (
//             <Col
//                 span={24}
//                 key={index}
//                 className={`banner-content-container flex-center border-radius-8 ${
//                     e?.hidden ? 'banner-content-container-hidden' : ''
//                 }`}
//             >
//                 <div className="banner-content-items">
//                     <svg
//                         className={`${
//                             e?.hidden ? 'banner-content-items-hidden' : ''
//                         }`}
//                         width="20"
//                         height="20"
//                         viewBox="0 0 20 20"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             d="M5.83333 3.33333C5.83333 3.79357 6.20643 4.16667 6.66667 4.16667C7.1269 4.16667 7.5 3.79357 7.5 3.33333C7.5 2.8731 7.1269 2.5 6.66667 2.5C6.20643 2.5 5.83333 2.8731 5.83333 3.33333Z"
//                             stroke="#B1B5C4"
//                             strokeWidth="2"
//                         />
//                         <path
//                             d="M12.5003 3.33333C12.5003 3.79357 12.8734 4.16667 13.3337 4.16667C13.7939 4.16667 14.167 3.79357 14.167 3.33333C14.167 2.8731 13.7939 2.5 13.3337 2.5C12.8734 2.5 12.5003 2.8731 12.5003 3.33333Z"
//                             stroke="#B1B5C4"
//                             strokeWidth="2"
//                         />
//                         <path
//                             d="M5.83333 10.0013C5.83333 10.4615 6.20643 10.8346 6.66667 10.8346C7.1269 10.8346 7.5 10.4615 7.5 10.0013C7.5 9.54106 7.1269 9.16797 6.66667 9.16797C6.20643 9.16797 5.83333 9.54106 5.83333 10.0013Z"
//                             stroke="#B1B5C4"
//                             strokeWidth="2"
//                         />
//                         <path
//                             d="M12.5003 10.0013C12.5003 10.4615 12.8734 10.8346 13.3337 10.8346C13.7939 10.8346 14.167 10.4615 14.167 10.0013C14.167 9.54106 13.7939 9.16797 13.3337 9.16797C12.8734 9.16797 12.5003 9.54106 12.5003 10.0013Z"
//                             stroke="#B1B5C4"
//                             strokeWidth="2"
//                         />
//                         <path
//                             d="M5.83333 16.6654C5.83333 17.1256 6.20643 17.4987 6.66667 17.4987C7.1269 17.4987 7.5 17.1256 7.5 16.6654C7.5 16.2051 7.1269 15.832 6.66667 15.832C6.20643 15.832 5.83333 16.2051 5.83333 16.6654Z"
//                             stroke="#B1B5C4"
//                             strokeWidth="2"
//                         />
//                         <path
//                             d="M12.5003 16.6654C12.5003 17.1256 12.8734 17.4987 13.3337 17.4987C13.7939 17.4987 14.167 17.1256 14.167 16.6654C14.167 16.2051 13.7939 15.832 13.3337 15.832C12.8734 15.832 12.5003 16.2051 12.5003 16.6654Z"
//                             stroke="#B1B5C4"
//                             strokeWidth="2"
//                         />
//                     </svg>
//                     <div
//                         className={`banner-content-items-index border-radius-8 ${
//                             e?.hidden ? 'banner-content-items-hidden' : ''
//                         }`}
//                     >
//                         {index + 1}
//                     </div>
//                     <div className="banner-content-items-text">{e?.name}</div>
//                 </div>
//             </Col>
//         );
//     };

//     const onDragEnd = (result: any) => {
//         if (!result.destination) {
//             return;
//         }

//         if (result.destination.index === result.source.index) {
//             return;
//         }

//         const items = reorder(
//             dataSource,
//             result.source.index,
//             result.destination.index,
//         );

//         setDataSource(items);
//         const positionVariables = items?.map((item: any, index: any) => ({
//             id: item.id,
//             position: index,
//         }));

//         // updateBannerPosition({
//         //     variables: {
//         //         input: positionVariables,
//         //     },
//         // });
//     };

//     return (
//         <>
//             <div className="mb-10">
//                 <div className="mb-2 text-lg font-semibold">Danh sách task</div>
//                 <div className="">
//                     <span
//                         onClick={() => {
//                             router('/');
//                         }}
//                         className="text-gray-400 cursor-pointer"
//                     >
//                         Trang chủ {' / '}
//                     </span>

//                     <span
//                         onClick={() => {
//                             router('/project');
//                         }}
//                         className="text-gray-400 cursor-pointer"
//                     >
//                         Quản lý dự án {' / '}
//                     </span>

//                     <span className="font-semibold">Tổng quát</span>
//                 </div>
//             </div>
//             <div className="flex flex-col p-10 bg-white rounded-lg">
//                 <div className="grid grid-cols-9 gap-3 mb-10">
//                     <div className="col-span-2">
//                         {' '}
//                         <Input placeholder="Nhập tên task" className="h-full" />
//                     </div>
//                     <div className="col-span-2">
//                         {' '}
//                         <SelectProject
//                             options={listUser}
//                             name={'user_do'}
//                             holder="Chọn người thực hiện"
//                         />
//                     </div>
//                     <div className="col-span-2">
//                         <SelectProject
//                             options={statusOptions}
//                             name={'status'}
//                             holder="Trạng thái"
//                         />
//                     </div>

//                     <Button type="primary" size={'large'}>
//                         Tìm kiếm
//                     </Button>
//                 </div>
//                 <div className="flex flex-col">
//                     <div className="grid grid-cols-5 text-xs font-semibold text-gray-400">
//                         <div className="">
//                             <div className="w-10/12 border-bottom">
//                                 Not started
//                             </div>
//                         </div>
//                         <div className="">
//                             <div className="w-10/12 border-bottom">Pending</div>
//                         </div>
//                         <div className="">
//                             <div className="w-10/12 border-bottom">
//                                 Not started
//                             </div>
//                         </div>
//                         <div className="">
//                             <div className="w-10/12 border-bottom">
//                                 Not started
//                             </div>
//                         </div>
//                         <div className="">
//                             <div className="w-10/12 border-bottom">
//                                 <div className="">Complete</div>
//                                 <div className="">
//                                     <DragDrop
//                                         onDragEnd={onDragEnd}
//                                         droppableId={'list_tasks'}
//                                         items={taskInProjects || []}
//                                         RenderComponent={BannerItem}
//                                         itemId="id"
//                                         configs={{
//                                             dragInContainer: true,
//                                         }}
//                                     ></DragDrop>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default TaskInProject;

import {useState} from 'react';
// @ts-ignore
import {DragDropContext} from 'react-beautiful-dnd';

import Column from './col';

function App() {
    let initialState = [
        {
            groupName: 'Today',
            tasks: [
                {id: '1', title: 'Test-1'},
                {id: '2', title: 'Test-2'},
            ],
        },
        {
            groupName: 'Tomorrow',
            tasks: [
                {id: '3', title: 'Test-3'},
                {id: '4', title: 'Test-4'},
            ],
        },
    ];

    const [taskList, setTasks] = useState(initialState);

    function onDragEnd(val: any) {
        // Your version
        // let result = helper.reorder(val.source, val.destination, taskList);
        // setTasks(result);

        /// A different way!
        const {draggableId, source, destination} = val;

        console.log('destination', destination);

        const [sourceGroup] = taskList.filter(
            (column) => column.groupName === source.droppableId,
        );
        console.log('source', source);
        console.log('sourceGroup', sourceGroup);
        console.log('draggableId', draggableId);

        // Destination might be `null`: when a task is
        // dropped outside any drop area. In this case the
        // task reamins in the same column so `destination` is same as `source`
        const [destinationGroup]: any = destination
            ? taskList.filter(
                  (column) => column.groupName === destination.droppableId,
              )
            : {...sourceGroup};

        // We save the task we are moving
        const [movingTask] = sourceGroup.tasks.filter(
            (t) => t.id === draggableId,
        );

        console.log('movingTask', movingTask);

        const newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 1);

        console.log('newSourceGroupTasks', newSourceGroupTasks);
        const newDestinationGroupTasks = destinationGroup.tasks.splice(
            destination.index,
            0,
            movingTask,
        );
        console.log('newDestinationGroupTasks>>>', newDestinationGroupTasks);

        // Mapping over the task lists means that you can easily
        // add new columns
        const newTaskList = taskList.map((column) => {
            if (column.groupName === source.groupName) {
                return {
                    groupName: column.groupName,
                    tasks: newSourceGroupTasks,
                };
            }
            if (column.groupName === destination.groupName) {
                return {
                    groupName: column.groupName,
                    tasks: newDestinationGroupTasks,
                };
            }
            return column;
        });
        setTasks(newTaskList);
    }

    console.log('taskList', taskList);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="wrapper">
                <Column
                    className="column"
                    droppableId="Today"
                    list={taskList[0].tasks}
                    type="TASK"
                />
                <Column
                    className="column"
                    droppableId="Tomorrow"
                    list={taskList[1].tasks}
                    type="TASK"
                />
                <div> context hello world </div>
            </div>
        </DragDropContext>
    );
}

export default App;
