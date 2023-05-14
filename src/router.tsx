import {createBrowserRouter} from 'react-router-dom';
import DefaultLayout from './Layout/DefaultLayout';
import DetailProject from './components/DashboardProject/components/Detail';
import ProjectManager from './components/DashboardProject/components/List';
import TaskInProject from './components/DashboardProject/components/Task';
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
        ],
    },
]);

export default router;
