import {Gantt, Task} from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import FilterGantt from '../../DashboardProject/components/Filter/ganttFilter';
import useGant from './useGant';

const currentDate = new Date();

console.log(currentDate);

const tasks: Task[] = [
    {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
        name: 'Some Project',
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
            2,
            12,
            28,
        ),
        name: 'Idea',
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
            4,
            0,
            0,
        ),
        name: 'Research',
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
            8,
            0,
            0,
        ),
        name: 'Discussion with team',
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
            9,
            0,
            0,
        ),
        name: 'Developing',
        id: 'Task 3',
        progress: 88,
        type: 'task',
        project: 'ProjectSample',
    },
    {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
        name: 'Review',
        id: 'Task 4',
        type: 'task',
        progress: 70,
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
const GanttChart = () => {
    const {data, setValues} = useGant();
    if (!data) {
        return null;
    }
    return (
        <div>
            <FilterGantt setValues={setValues} />
            <Gantt tasks={data || tasks} />
        </div>
    );
};

export default GanttChart;
