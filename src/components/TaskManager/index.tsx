import {useQuery} from '@tanstack/react-query';
import {Button, Input} from 'antd';
import {useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getMyTasks} from '../../services/tasks';
import {convertDate} from '../../utils/format';
import useProject from '../DashboardProject/hooks/useProject';
import DatePickerCp from '../DatePicker';
import Pagination from '../Pagination';
import SelectProject from '../SelectProject';

const TaskManager = () => {
    const [page, setPage] = useState(1);
    const {options} = useProject();

    const {isLoading, data: tasksResponse} = useQuery({
        queryKey: ['getMyTasks', page],
        queryFn: () => getMyTasks(page),
        keepPreviousData: true,
    });

    const tasks = useMemo(() => {
        return tasksResponse?.data?.data || [];
    }, [tasksResponse]);

    const total = useMemo(() => {
        return tasksResponse?.data?.meta?.total || 0;
    }, [tasksResponse]);

    const router = useNavigate();

    return (
        <>
            <div className="mb-10">
                <div className="mb-2 text-lg font-semibold">
                    Danh sách task/Subtask của tôi
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
                    <span className="font-semibold">
                        Danh sách task/Subtask của tôi
                    </span>
                </div>
            </div>
            <div className="flex flex-col p-10 bg-white rounded-lg">
                <div className="grid grid-cols-6 gap-3 mb-10">
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
                </div>
                <div className="flex flex-col">
                    <div className="grid grid-cols-12 pb-4 text-xs font-semibold text-gray-400 border-bottom">
                        <div className="col-span-1">ID</div>
                        <div className="col-span-3">TÊN DỰ ÁN</div>
                        <div className="col-span-2">MÃ CODE DỰ ÁN</div>
                        <div className="items-center col-span-3">
                            TÊN TASK/SUB-TASK
                        </div>
                        <div className="">NGÀY BẮT ĐẦU</div>
                        <div className="">NGÀY KẾT THÚC</div>
                        <div className="">TRẠNG THÁI</div>
                    </div>
                    {tasks.map((task: any) => {
                        return (
                            <>
                                <div className="grid grid-cols-12 py-4 pb-4 border-bottom">
                                    <div className="col-span-1">{task?.id}</div>
                                    <div className="col-span-3 text-blue-700 cursor-pointer hover:text-blue-900">
                                        {task?.project?.name}
                                    </div>
                                    <div className="col-span-2 text-blue-700 cursor-pointer hover:text-blue-900">
                                        {task?.project?.code}
                                    </div>
                                    <div className="items-center col-span-3 text-blue-700 cursor-pointer hover:text-blue-900">
                                        {task?.name}
                                    </div>
                                    <div className="">
                                        {convertDate(task?.starts_at)}
                                    </div>
                                    <div className="">
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
            <div className="mt-5">
                <Pagination
                    currentPage={page}
                    totalCount={total}
                    pageSize={10}
                    onPageChange={(page: any) => setPage(page)}
                />
            </div>
        </>
    );
};

export default TaskManager;
