import {Gantt, Task} from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import FilterGantt from '../../DashboardProject/components/Filter/ganttFilter';

const currentDate = new Date();

const tasks: Task[] = [
    {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
        name: 'Task List',
        id: 'ProjectSample',
        progress: 25,
        type: 'project',
        hideChildren: false,
    },
    {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        end: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            5,
            12,
            28,
        ),
        name: 'Build a demo',
        id: 'Task 0',
        progress: 45,
        type: 'task',
        project: 'ProjectSample',
    },
    {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
        end: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            10,
            0,
            0,
        ),
        name: 'Build API',
        id: 'Task 1',
        progress: 25,
        type: 'task',
        project: 'ProjectSample',
    },
    {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
        end: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            12,
            0,
            0,
        ),
        name: 'Build UI',
        id: 'Task 2',
        progress: 67,
        type: 'task',
        project: 'ProjectSample',
    },
    {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
        end: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            14,
            0,
            0,
        ),
        name: 'Testing',
        id: 'Task 3',
        progress: 76,
        type: 'task',
        project: 'ProjectSample',
    },
    {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
        name: 'Review',
        id: 'Task 4',
        type: 'task',
        progress: 50,
        project: 'ProjectSample',
    },
    {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
        name: 'Release',
        id: 'Task 6',
        progress: currentDate.getMonth(),
        type: 'task',
        project: 'ProjectSample',
    },
    {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
        name: 'Party Time',
        id: 'Task 9',
        progress: 1,
        isDisabled: true,
        type: 'task',
        project: 'ProjectSample',
    },
];
const TaskChart = () => {
    return (
        <div>
            <FilterGantt />
            <Gantt tasks={tasks} />
        </div>
    );
};

export default TaskChart;
