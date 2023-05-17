import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import useStatus from '../../../../hooks/useStatus';

const ListTask = () => {
    const {statusOptions} = useStatus();
    const router = useNavigate();

    return (
        <>
            <div className="mb-10">
                <div className="flex justify-end gap-3 mb-10">
                    <Button
                        className="text-white bg-blue-600"
                        onClick={() => router(`/task/create`)}
                        size="large"
                    >
                        Tạo tạo task mới
                    </Button>
                </div>
                <div className="mb-2 text-lg font-semibold">
                    Danh sách dự task
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
                    <span className="font-semibold">Danh sách dự án</span>
                </div>
            </div>
            <div className="flex flex-col "></div>
            <div className="!bg-[#F5F5F5] mt-10"></div>
        </>
    );
};

export default ListTask;
