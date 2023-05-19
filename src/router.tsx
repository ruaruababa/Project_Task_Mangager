import {createBrowserRouter} from 'react-router-dom';
import DefaultLayout from './Layout/DefaultLayout';
import CreateUpdateProject from './components/DashboardProject/components/CreateProject/createUpdateProject';
import DetailProject from './components/DashboardProject/components/Detail';
import ProjectManager from './components/DashboardProject/components/List';
import TaskInProject from './components/DashboardProject/components/Task';
import DetailTask from './components/DashboardProject/components/Task/detailTask';
import SubTask from './components/DashboardProject/components/Task/subTask';
import CreateUpdateTask from './components/DashboardTask/components/Create/createUpdateTask';
import DetailUser from './components/DashboardUser/components/Detail/detailUser';
import ListUser from './components/DashboardUser/components/List';
import AllListTask from './components/ListTask/components';
import TaskManagerPage from './components/TaskManager';
const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <TaskManagerPage />,
            },

            {
                path: '/project',
                element: <ProjectManager />,
            },
            {
                path: '/project/:id',
                element: <DetailProject />,
            },
            {
                path: '/project/:id/tasks',
                element: <TaskInProject />,
            },
            {
                path: '/project/:id/list-task',
                element: <AllListTask />,
            },
            {
                path: '/project/:id/tasks/:taskId',
                element: <DetailTask />,
            },
            {
                path: '/project/:id/tasks/:taskId/edit',
                element: <CreateUpdateTask />,
            },
            {
                path: '/project/:id/subtask/:subTaskId',
                element: <SubTask />,
            },
            {
                path: '/project/create',
                element: <CreateUpdateProject />,
            },
            {
                path: '/project/edit/:id',
                element: <CreateUpdateProject />,
            },
            {
                path: '/task',
                element: <TaskManagerPage />,
            },
            {
                path: '/project/:id/create-task',
                element: <CreateUpdateTask />,
            },
            {
                path: '/user',
                element: <ListUser />,
            },
            {
                path: '/user/create',
                element: <ListUser />,
            },

            {
                path: '/user/:id/detail',
                element: <DetailUser />,
            },
        ],
    },
]);

export default router;
