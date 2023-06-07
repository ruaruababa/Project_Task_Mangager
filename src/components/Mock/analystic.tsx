import {Button, DatePicker, Select, Tag} from 'antd';
import {styled} from 'styled-components';
import PiChart from '../Chart/PieChart';
import useDetailProject from '../DashboardProject/components/Detail/useDetailProject';
const {RangePicker} = DatePicker;

const Container = styled.div`
    ul {
        display: none;
    }
`;

const Analystic = () => {
    const {detailProject} = useDetailProject();
    const fakeMock = [];
    fakeMock.push({
        name: 'In Progress',
        id: 1,
        tasks_count: 2,
    });
    fakeMock.push({
        name: 'Completed',
        id: 5,
        tasks_count: 5,
    });
    fakeMock.push({
        name: 'Behind Schedule',
        id: 4,
        tasks_count: 3,
    });
    fakeMock.push({
        name: 'Not Started',
        id: 1,
        tasks_count: 1,
    });
    fakeMock.push({
        name: 'Pending',
        id: 3,
        tasks_count: 2,
    });

    return (
        <>
            {' '}
            <div className="">
                <div className="flex flex-col gap-2 mb-5">
                    <div className="text-xl font-bold">Thống kê</div>
                    <div className="">
                        <span className="font-semibold text-gray-400">
                            Trang chủ /{' '}
                        </span>
                        <span className="font-semibold ">Thống kê </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 ">
                    <div className="p-3 bg-white rounded-lg shadow-lg ">
                        <div className="flex flex-col gap-3">
                            <div className="text-lg font-bold">Dự án</div>
                            <div className="grid grid-cols-5 gap-3">
                                <Select
                                    className="col-span-2"
                                    showSearch
                                    placeholder="Chọn trạng thái"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '')
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: 'notStarted',
                                            label: 'Not Started',
                                        },
                                        {
                                            value: 'pending',
                                            label: 'Pending',
                                        },
                                        {
                                            value: 'completed',
                                            label: 'Completed',
                                        },
                                    ]}
                                />
                                <div className="col-span-3">
                                    {' '}
                                    <RangePicker
                                        showTime={{format: 'HH:mm'}}
                                        format="YYYY-MM-DD HH:mm"
                                    />
                                </div>
                            </div>
                            <div className="">
                                <Button className="w-full text-white bg-blue-500">
                                    Tìm kiếm
                                </Button>
                            </div>
                            <Container className="min-h-[500px]">
                                <PiChart
                                    dataChart={
                                        detailProject?.tasks_count_by_status ||
                                        []
                                    }
                                />
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#f50">
                                                Behind Schedule
                                            </Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'56%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#2b2ee9">Inprogess</Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'17%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#383838">
                                                Not Started
                                            </Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'17%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#eeeb36">Pending</Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'11%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#3bbe13">Complete</Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'0%'}
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <div
                            className="pt-3 font-semibold"
                            style={{
                                borderTop: '1px solid #dddddd',
                            }}
                        >
                            Tổng dự án: 12
                        </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-lg ">
                        <div className="flex flex-col gap-3">
                            <div className="text-lg font-bold">Đầu việc</div>
                            <div className="grid grid-cols-5 gap-3">
                                <Select
                                    className="col-span-2"
                                    showSearch
                                    placeholder="Chọn trạng thái"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '')
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: 'notStarted',
                                            label: 'Not Started',
                                        },
                                        {
                                            value: 'pending',
                                            label: 'Pending',
                                        },
                                        {
                                            value: 'completed',
                                            label: 'Completed',
                                        },
                                    ]}
                                />
                                <div className="col-span-3">
                                    {' '}
                                    <RangePicker
                                        showTime={{format: 'HH:mm'}}
                                        format="YYYY-MM-DD HH:mm"
                                    />
                                </div>
                            </div>
                            <div className="">
                                <Button className="w-full text-white bg-blue-500">
                                    Tìm kiếm
                                </Button>
                            </div>
                            <Container className="min-h-[500px]">
                                <PiChart dataChart={fakeMock || []} />
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#f50">
                                                Behind Schedule
                                            </Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'8%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#2b2ee9">Inprogess</Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'23%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#383838">
                                                Not Started
                                            </Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'15%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#eeeb36">Pending</Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'38%'}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="">
                                            {' '}
                                            <Tag color="#3bbe13">Complete</Tag>
                                        </div>
                                        <div className="text-base font-semibold">
                                            {'15%'}
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <div
                            className="pt-3 font-semibold"
                            style={{
                                borderTop: '1px solid #dddddd',
                            }}
                        >
                            Tổng task: 53
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Analystic;
