import {Button} from 'antd';
import PiChart from '../../../Chart/PieChart';

interface Props {
    detailProject: any;
    handleViewTask: () => void;
}

const Chart = (props: Props) => {
    const {detailProject, handleViewTask} = props;
    return (
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
                        Tổng task: <span>{detailProject?.tasks_count}</span>
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
                        dataChart={detailProject?.tasks_count_by_status || []}
                    />
                </div>
            </div>
        </div>
    );
};

export default Chart;
