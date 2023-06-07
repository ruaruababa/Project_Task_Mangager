import {createBrowserRouter} from 'react-router-dom';
import DefaultLayout from './Layout/DefaultLayout';
import GanttChartProject from './components/Chart/GanttChart/projectGanttChart';
import GanttChartTask from './components/Chart/GanttChart/taskGanttChart';
import ListRole from './components/DashBoardRole/components/List/listRoles';
import CreateUpdateProject from './components/DashboardProject/components/CreateProject/createUpdateProject';
import DetailProject from './components/DashboardProject/components/Detail/detailProject';
import ProjectManager from './components/DashboardProject/components/List/listProject';
import CreateUpdateSubTask from './components/DashboardProject/components/Task/createUpdateSubTask';
import DetailTask from './components/DashboardProject/components/Task/detailTask';
import Kanban from './components/DashboardProject/components/Task/kanban';
import CreateUpdateTask from './components/DashboardTask/components/Create/createUpdateTask';
import DetailUser from './components/DashboardUser/components/Detail/detailUser';
import ListUser from './components/DashboardUser/components/List/listUser';
import ListTaskInProject from './components/ListTask/components/listTaskProject';
import Analystic from './components/Analystic/analystic';
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
                element: <Kanban />,
            },
            {
                path: '/project/:id/list-task',
                element: <ListTaskInProject />,
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
                path: '/project/gantt-chart',
                element: <GanttChartProject />,
            },
            {
                path: '/project/:id/gantt-chart',
                element: <GanttChartTask />,
            },
            {
                path: '/project/:id/task/:taskId/create-subtask',
                element: <CreateUpdateSubTask />,
            },
        ],
    },
]);

export default router;
