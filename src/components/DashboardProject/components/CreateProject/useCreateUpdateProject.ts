import {useMutation, useQueryClient} from '@tanstack/react-query';
import {notification} from 'antd';
import dayjs from 'dayjs';
import {useNavigate, useParams} from 'react-router-dom';
import {createProject, updateProject} from '../../../../services/project';

const useCreateUpdateProject = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: createProjectMutate, isLoading} = useMutation({
        mutationFn: createProject,
        mutationKey: ['createProject'],
        onSuccess: (data) => {
            notification.success({
                message: 'Success ',
                description: 'Create successfully',
            });
            navigate(`/project/${data?.data?.data?.id}`);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    const {mutate: updateProjectMutate} = useMutation({
        mutationFn: (data: any) => updateProject(data, id),
        mutationKey: ['updateProject', id],
        onSuccess: () => {
            notification.success({
                message: 'Success ',
                description: 'Update successfully',
            });
            queryClient.refetchQueries(['getDetailProject', id]);

            navigate(`/project/${id}`);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });

    const handleFinish = (values: any) => {
        id
            ? updateProjectMutate({
                  ...values,
                  starts_at: dayjs(values?.starts_at).format('YYYY/MM/DD'),
                  ends_at: dayjs(values?.ends_at).format('YYYY/MM/DD'),
              })
            : createProjectMutate({
                  ...values,
                  starts_at: dayjs(values?.starts_at).format('YYYY/MM/DD'),
                  ends_at: dayjs(values?.ends_at).format('YYYY/MM/DD'),
                  status_id: 1,
              });
    };
    return {handleFinish, isLoading};
};

export default useCreateUpdateProject;
