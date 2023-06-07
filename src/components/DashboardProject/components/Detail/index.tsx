import {useNavigate} from 'react-router-dom';
import Chart from './chart';
import History from './historyProject';
import HeaderDetailProject from './navigateDetail';
import ProjectDetail from './projectDetail';
import useDetailProject from './useDetailProject';
const DetailProject = () => {
    const {detailProject, historyList, id} = useDetailProject();
    const navigate = useNavigate();

    const handleViewTask = () => {
        navigate(`/project/${id}/list-task`);
    };

    return (
        <>
            <div className="flex flex-col gap-10">
                {' '}
                <HeaderDetailProject />
                <ProjectDetail detailProject={detailProject} />
                {/* ------------------------------------- CHART ------------------------------- */}
                <Chart
                    detailProject={detailProject}
                    handleViewTask={handleViewTask}
                />
                {/* ------------------------------------- HISTORY ------------------------------- */}
                <History historyList={historyList} />
            </div>
        </>
    );
};

export default DetailProject;
