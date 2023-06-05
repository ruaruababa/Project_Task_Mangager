import {Button} from 'antd';
import {Gantt} from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import {useNavigate} from 'react-router';
import FilterTask from '../../DashboardProject/components/Filter/taskFilter';
import useGanttTask from './useGanttTask';

const TaskChart = () => {
    const navigate = useNavigate();
    const {data, setValues, id} = useGanttTask();
    if (!data) {
        return null;
    }
    return (
        <div>
            <div className="flex justify-end gap-3">
                <Button
                    type="primary"
                    size="large"
                    onClick={() => navigate(`/project/${id}/list-task`)}
                >
                    Danh sách task
                </Button>
                <Button
                    className="text-white bg-blue-500"
                    size="large"
                    onClick={() => navigate(`/project/${id}/tasks`)}
                >
                    Bảng Kanban
                </Button>
            </div>
            <div className="py-10">
                <span
                    onClick={() => navigate('/')}
                    className="text-lg font-semibold text-gray-400 cursor-pointer"
                >
                    Trang chủ /{' '}
                </span>
                <span
                    onClick={() => navigate(`/project/${id}`)}
                    className="font-semibold text-gray-400 cursor-pointer"
                >
                    Danh sách dự án /{' '}
                </span>
                <span className="text-sm">Gantt chart</span>
            </div>
            <FilterTask setValues={setValues} needHours={true}/>
            {data?.length > 0 && <Gantt tasks={data} />}
        </div>
    );
};

export default TaskChart;
