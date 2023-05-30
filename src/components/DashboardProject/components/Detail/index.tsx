import {Button} from 'antd';
import {useNavigate, useParams} from 'react-router-dom';
import {convertDate} from '../../../../utils/format';
import PiChart from '../../../Chart/PieChart';
import useDetailProject from '../../hooks/useDetailProject';
import UserAvatar from '../Item/avatar';
const DetailProject = () => {
    const {detailProject} = useDetailProject();
    const {id} = useParams();
    const navigate = useNavigate();

    const handleViewTask = () => {
        navigate(`/project/${id}/tasks`);
    };

    return (
        <>
            <div className="flex flex-col gap-10">
                {' '}
                <div className="flex flex-row-reverse justify-between gap-3 mb-10">
                    <div className="flex gap-2">
                        {' '}
                        <Button
                            type="primary"
                            className="text-white"
                            onClick={() => navigate(`/project/edit/${id}`)}
                            size="large"
                        >
                            Chỉnh sửa dự án
                        </Button>
                        <Button
                            className="text-white bg-blue-500"
                            onClick={() => navigate(`/project/edit/${id}`)}
                            size="large"
                        >
                            Gantt chart
                        </Button>
                    </div>

                    <div className="">
                        {' '}
                        <div className="text-lg font-semibold">
                            <span
                                onClick={() => {
                                    navigate('/');
                                }}
                                className="font-semibold text-gray-400 cursor-pointer hover:text-blue-500"
                            >
                                Trang chủ
                            </span>
                            {' / '}
                            <span
                                className="font-semibold text-gray-400 cursor-pointer hover:text-blue-500"
                                onClick={() => {
                                    navigate('/project');
                                }}
                            >
                                Danh sách dự án
                            </span>{' '}
                            {' / '}
                            <span className="font-semibold">
                                Chi tiết dự án
                            </span>
                        </div>
                    </div>
                </div>
                <div className="text-lg bg-white rounded-xl">
                    <div className="flex flex-col gap-10 p-10">
                        <div className="text-xl font-semibold">
                            {detailProject?.name} -{' '}
                            <span
                                style={{
                                    color: detailProject?.status?.color,
                                }}
                            >
                                {detailProject?.status?.name}
                            </span>
                        </div>
                        <div className="grid grid-cols-12 gap-3 text-lg">
                            <div
                                className="flex flex-col col-span-2 py-3 text-center"
                                style={{
                                    border: '1px dashed  #cccccc',
                                }}
                            >
                                <div className="text-lg font-semibold">
                                    {convertDate(detailProject?.starts_at)}
                                </div>

                                <div className="text-gray-400">
                                    Ngày bắt đầu
                                </div>
                            </div>
                            <div
                                className="flex flex-col col-span-2 py-3 text-center"
                                style={{
                                    border: '1px dashed  #cccccc',
                                }}
                            >
                                <div className="text-lg font-semibold">
                                    {convertDate(detailProject?.ends_at)}
                                </div>
                                <div className="text-gray-400">
                                    Ngày hoàn thành
                                </div>
                            </div>
                            <div
                                className="flex flex-col col-span-2 py-3 text-center"
                                style={{
                                    border: '1px dashed  #cccccc',
                                }}
                            >
                                <div className="text-lg font-semibold">
                                    {detailProject?.progress || 0} %
                                </div>
                                <div className="text-gray-400">
                                    Phần trăm hoàn thành
                                </div>
                            </div>
                            <div className="flex col-span-2 py-3 text-center">
                                <UserAvatar
                                    users={detailProject?.users || []}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 text-lg font-semibold text-gray-400">
                                Khách hàng:
                            </div>
                            <div className="col-span-10 font-semibold">
                                {detailProject?.customer_name}
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 text-lg font-semibold text-gray-400">
                                Code:
                            </div>
                            <div className="col-span-10 font-semibold">
                                {detailProject?.code}
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 text-lg font-semibold text-gray-400">
                                Duration:
                            </div>
                            <div className="col-span-10 font-semibold">
                                {detailProject?.duration}
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 text-lg font-semibold text-gray-400">
                                Summary:
                            </div>
                            <div className="col-span-10 font-semibold">
                                {detailProject?.summary || 'Không xác định'}
                            </div>
                        </div>
                    </div>
                </div>
                {/* ------------------------------------- CHART ------------------------------- */}
                <div className="flex flex-col text-lg bg-white rounded-xl">
                    <div className="flex flex-col p-10">
                        {' '}
                        <div
                            className="flex justify-between pb-10"
                            style={{
                                borderBottom: '1px solid #dddddd',
                            }}
                        >
                            <div className="font-semibold">
                                Tổng task:{' '}
                                <span>{detailProject?.tasks_count}</span>
                            </div>
                            <div className="">
                                {' '}
                                <Button
                                    size={'large'}
                                    type="primary"
                                    onClick={() => handleViewTask()}
                                >
                                    Danh sách task
                                </Button>
                            </div>
                        </div>
                        <div className="py-10">
                            <PiChart
                                dataChart={
                                    detailProject?.tasks_count_by_status || []
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailProject;
