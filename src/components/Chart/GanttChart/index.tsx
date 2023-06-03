import {Gantt} from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import {useNavigate} from 'react-router';
import FilterGantt from '../../DashboardProject/components/Filter/ganttFilter';
import useGant from './useGant';

const GanttChart = () => {
    const navigate = useNavigate();
    const {data, setValues} = useGant();
    if (!data) {
        return null;
    }
    return (
        <div>
            <div className="py-10">
                <span
                    onClick={() => navigate('/')}
                    className="text-lg font-semibold text-gray-400 cursor-pointer"
                >
                    Trang chủ /{' '}
                </span>
                <span
                    onClick={() => navigate(`/project`)}
                    className="font-semibold text-gray-400 cursor-pointer"
                >
                    Danh sách dự án /{' '}
                </span>
                <span className="text-sm">Gantt chart</span>
            </div>
            <FilterGantt setValues={setValues} />
            {data?.length > 0 && <Gantt tasks={data} />}
        </div>
    );
};

export default GanttChart;
