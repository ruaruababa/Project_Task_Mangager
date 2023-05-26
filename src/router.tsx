import {createBrowserRouter} from 'react-router-dom';
import DefaultLayout from './Layout/DefaultLayout';
import GanttChart from './components/Chart/GanttChart';
import ListRole from './components/DashBoardRole/components/List';
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
import Analystic from './components/Mock/analystic';
import TaskManagerPage from './components/TaskManager';
import UserProfile from './components/UserProfile';
import UpdateProfile from './components/UserProfile/updateProfile';
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
                path: '/statistic',
                element: <Analystic />,
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
            {
                path: '/role',
                element: <ListRole />,
            },
            {
                path: '/profile',
                element: <UserProfile />,
            },
            {
                path: '/profile/update',
                element: <UpdateProfile />,
            },
            {
                path: '/mock',
                element: <GanttChart />,
            },
        ],
    },
]);

export default router;
