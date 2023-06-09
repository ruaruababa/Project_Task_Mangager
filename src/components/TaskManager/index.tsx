import {useQuery} from '@tanstack/react-query';
import {useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {filterMyTask} from '../../services/tasks';
import {convertDate} from '../../utils/format';
import FilterMyTask from '../Filter/filterMyTask';
import Pagination from '../Pagination';

const TaskManager = () => {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<any>();

    // const {data: tasksResponse} = useQuery({
    //     queryKey: ['getMyTasks', page],
    //     queryFn: () => getMyTasks(page),
    //     keepPreviousData: true,
    // });

    const {data: filterMyTaskResponse} = useQuery({
        queryKey: ['filterMyTask', page, filter],
        queryFn: () => filterMyTask({page, ...filter}),
        keepPreviousData: true,
    });

    const tasks = useMemo(() => {
        return filterMyTaskResponse?.data?.data || [];
    }, [filterMyTaskResponse]);

    const total = useMemo(() => {
        return filterMyTaskResponse?.data?.meta?.total || 0;
    }, [filterMyTaskResponse]);

    const router = useNavigate();

    console.log('tasks', tasks);

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
                <FilterMyTask setValues={setFilter} />
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
                    {tasks.map((task: any, idx: number) => {
                        return (
                            <>
                                <div className="grid grid-cols-12 py-4 pb-4 border-bottom">
                                    <div className="col-span-1">{task?.id}</div>
                                    <div
                                        onClick={() =>
                                            router(
                                                `/project/${task?.project_id}`,
                                            )
                                        }
                                        className="col-span-3 text-blue-700 cursor-pointer hover:text-blue-900"
                                    >
                                        {task?.project?.name}
                                    </div>
                                    <div className="col-span-2 text-blue-700 cursor-pointer hover:text-blue-900">
                                        {task?.project?.code}
                                    </div>
                                    <div
                                        onClick={() =>
                                            router(
                                                `/project/${task?.project_id}/tasks/${task?.id}`,
                                            )
                                        }
                                        className="items-center col-span-3 text-blue-700 cursor-pointer hover:text-blue-900"
                                    >
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
