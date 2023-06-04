import {Button} from 'antd';
import {useNavigate, useParams} from 'react-router-dom';
import FilterTask from '../../DashboardProject/components/Filter/taskFilter';
import useTaskInProject from '../../DashboardProject/hooks/useTaskProject';
import TaskItem from './item';

const AllListTask = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {taskInProjects, setValues, id: projectId} = useTaskInProject();
    const router = useNavigate();

    return (
        <>
            {' '}
            <div className="mb-10">
                <div className="flex justify-end gap-3 mb-10">
                    <Button
                        size="large"
                        type="primary"
                        onClick={() => {
                            navigate(`/project/${id}/gantt-chart`);
                        }}
                    >
                        Biểu đồ Gantt
                    </Button>
                    <Button
                        size="large"
                        className="text-white bg-blue-600"
                        onClick={() => navigate(`/project/${id}/tasks`)}
                    >
                        List task
                    </Button>
                    <Button
                        size="large"
                        className="text-white bg-green-600"
                        onClick={() => navigate(`/project/${id}/create-task`)}
                    >
                        Tạo task mới
                    </Button>
                </div>
                <div className="mb-2 text-lg font-semibold">
                    Danh sách task của project {id}
                </div>
                <div className="">
                    <span
                        onClick={() => {
                            router('/');
                        }}
                        className="font-semibold text-gray-400 cursor-pointer"
                    >
                        Trang chủ /{' '}
                    </span>

                    <span
                        className="font-semibold text-gray-400 cursor-pointer"
                        onClick={() => navigate(`/project/${1}`)}
                    >
                        Project {id} /{' '}
                    </span>
                    <span className="font-semibold">List task</span>
                </div>
            </div>
            <FilterTask setValues={setValues} needHours={true} />
            <div className="flex flex-col p-10 bg-white rounded-lg">
                {/* <div className="grid grid-cols-6 gap-3 mb-10">
                    <SelectProject
                        options={options}
                        name={'project'}
                        holder="Chọn tên dự án"
                    />
                    <Input placeholder="Nhập tên task" />
                    <DatePickerCp name={'startDate'} holder="Ngày bắt đầu" />
                    <DatePickerCp name={'endDate'} holder="Ngày kết thúc" />
                    <Button type="primary" size={'large'}>
                        Tìm kiếm
                    </Button>
                </div> */}
                <div className="flex flex-col">
                    <div className="grid grid-cols-12 pb-4 text-xs font-semibold text-gray-400 border-bottom">
                        <div className="col-span-2">ID</div>
                        <div className="items-center col-span-4">
                            TÊN TASK/SUB-TASK
                        </div>
                        <div className="grid grid-cols-8 col-span-6">
                            {' '}
                            <div className="col-span-2">THỜI GIAN BẮT ĐẦU</div>
                            <div className="col-span-2 text-center">
                                THỜI GIAN KẾT KẾT THÚC
                            </div>
                            <div className="col-span-2 ml-[55%] translate-x-[-50%]">
                                TRẠNG THÁI
                            </div>
                            <div className="flex justify-center col-span-2">
                                ACTION
                            </div>
                        </div>
                    </div>
                    {(taskInProjects || [])?.map((task: any) => {
                        return (
                            <>
                                <TaskItem task={task} projectId={projectId} />
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default AllListTask;
