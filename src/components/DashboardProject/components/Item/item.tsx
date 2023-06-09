import {CalendarOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router';
import {convertDate} from '../../../../utils/format';
import Action from '../Action/action';
import TaskCountStatus from './taskcount';
interface Props {
    data: any;
}

const Item = (props: Props) => {
    const {data} = props;
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg card">
            <div className="grid grid-cols-12 gap-3 p-5">
                <div className="col-span-5 pr-5">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between ">
                            <div
                                className="font-semibold cursor-pointer hover:text-blue-500"
                                onClick={() => {
                                    navigate(`/project/${data?.id}`);
                                }}
                            >
                                {data?.name || 'Tên dự án'}
                            </div>
                            <div
                                style={{
                                    color: data?.status?.color,
                                }}
                            >
                                {data?.status?.name} ({data?.progress}%)
                            </div>
                        </div>
                        <div className="flex">
                            <div className="px-2 py-1 text-gray-700 bg-gray-300 rounded-md text-[12px]">
                                {data?.code}
                            </div>
                        </div>
                        <div className="font-semibold">
                            <CalendarOutlined /> {convertDate(data?.starts_at)}{' '}
                            - {convertDate(data?.ends_at)}
                        </div>
                    </div>
                </div>
                <div className="h-full col-span-7">
                    <div className="grid h-full grid-cols-12">
                        <div className="h-full col-span-10">
                            <TaskCountStatus
                                data={data?.tasks_count_by_status}
                            />
                        </div>
                        <Action item={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;
