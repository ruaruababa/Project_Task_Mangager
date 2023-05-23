import {Button} from 'antd';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {convertDate} from '../../../utils/format';
import useTaskInProject from '../../DashboardProject/hooks/useTaskProject';

const AllListTask = () => {
    const [page, setPage] = useState(1);
    const {id} = useParams();
    const navigate = useNavigate();
    const {taskInProjects} = useTaskInProject();
    const router = useNavigate();

    return (
        <>
            <div className="mb-10">
                <div className="flex justify-end gap-3 mb-10">
                    <Button type="primary">Biểu đồ Gantt</Button>
                    <Button
                        className="text-white bg-blue-600"
                        onClick={() => navigate(`/project/${id}/tasks`)}
                    >
                        List task
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
                        className="text-gray-400 cursor-pointer"
                    >
                        Trang chủ
                    </span>
                    {' / '}
                    <span
                        className="font-semibold cursor-pointer"
                        onClick={() => navigate(`/project/${1}`)}
                    >
                        Project {id}
                    </span>
                </div>
            </div>
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
                        <div className="col-span-2">NGÀY BẮT ĐẦU</div>
                        <div className="col-span-2">NGÀY KẾT THÚC</div>
                        <div className="col-span-2">TRẠNG THÁI</div>
                    </div>
                    {(taskInProjects || [])?.map((task: any) => {
                        return (
                            <>
                                <div className="grid grid-cols-12 py-4 pb-4 border-bottom">
                                    <div className="col-span-2">{task?.id}</div>

                                    <div className="items-center col-span-4 text-blue-700 cursor-pointer hover:text-blue-900">
                                        {task?.name}
                                    </div>
                                    <div className="col-span-2">
                                        {convertDate(task?.starts_at)}
                                    </div>
                                    <div className="col-span-2">
                                        {convertDate(task?.ends_at)}
                                    </div>
                                    <div
                                        style={{
                                            color: task?.status?.color,
                                        }}
                                    >
                                        {task?.status?.name}
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
            {/* <div className="mt-5">
                <Pagination
                    currentPage={page}
                    totalCount={total}
                    pageSize={10}
                    onPageChange={(page: any) => setPage(page)}
                />
            </div> */}
        </>
    );
};

export default AllListTask;
