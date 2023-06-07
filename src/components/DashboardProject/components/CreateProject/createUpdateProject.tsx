import {useParams} from 'react-router-dom';
import useDetailProject from '../Detail/useDetailProject';
import HeaderCreateUpdateProject from './navigateCreateUpdate';
import ProjectForm from './projectForm';
import useCreateUpdateProject from './useCreateUpdateProject';

const CreateUpdateProject = () => {
    const {id} = useParams();
    const {detailToUpdate} = useDetailProject();
    const {handleFinish} = useCreateUpdateProject();

    return (
        <div className="p-10 bg-white rounded-xl">
            <HeaderCreateUpdateProject id={id} />
            <ProjectForm
                onFinish={handleFinish}
                id={id}
                initialValues={detailToUpdate}
            />
        </div>
    );
};

export default CreateUpdateProject;
