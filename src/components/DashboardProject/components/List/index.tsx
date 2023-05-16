import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import useStatus from '../../../../hooks/useStatus';
import DatePickerCp from '../../../DatePicker';
import Pagination from '../../../Pagination';
import SelectProject from '../../../SelectProject';
import useProject from '../../hooks/useProject';
import Item from '../Item/item';
const ProjectManager = () => {
    const {projects, total, page, setPage, options} = useProject();
    const {statusOptions} = useStatus();
    const router = useNavigate();

    return (
        <>
            <div className="mb-10">
                <div className="flex justify-end gap-3 mb-10">
                    <Button
                        className="text-white bg-blue-600"
                        onClick={() => router(`/project/create`)}
                        size="large"
                    >
                        Tạo dự án
                    </Button>
                </div>
                <div className="mb-2 text-lg font-semibold">
                    Danh sách dự án
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
            <div className="flex flex-col ">
                <div className="grid grid-cols-6 gap-3 mb-10">
                    <div className="col-span-2">
                        <SelectProject
                            options={options}
                            name={'project'}
                            holder="Chọn tên dự án"
                        />
                    </div>
                    <DatePickerCp name={'startDate'} holder="Ngày bắt đầu" />
                    <DatePickerCp name={'endDate'} holder="Ngày kết thúc" />
                    <SelectProject
                        options={statusOptions}
                        name={'status'}
                        holder="Chọn trạng thái"
                    />

                    <Button type="primary" size={'large'}>
                        Tìm kiếm
                    </Button>
                </div>
                <div className="flex flex-col gap-4">
                    {projects.map((project: any) => {
                        return <Item data={project} />;
                    })}
                </div>
            </div>
            <div className="!bg-[#F5F5F5] mt-10">
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

export default ProjectManager;
