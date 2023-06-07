import {Avatar, List, Popover, Typography} from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface Props {
    historyList: any;
}

const History = (props: Props) => {
    const {historyList} = props;
    const navigate = useNavigate();
    return (
        <div className="flex flex-col text-lg bg-white rounded-xl">
            <div className="flex flex-col p-10">
                <List
                    header={<div className="text-lg font-bold">LỊCH SỬ</div>}
                    pagination={{
                        pageSize: 10,
                        total: historyList?.length,
                        showSizeChanger: false,
                    }}
                    itemLayout="horizontal"
                    dataSource={historyList}
                    renderItem={(item: any, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Popover content={item?.user?.email}>
                                        <Avatar
                                            src={item?.user?.avatar}
                                            size={'large'}
                                        />
                                    </Popover>
                                }
                                title={
                                    <>
                                        {' '}
                                        <Typography.Text mark>
                                            [
                                            {dayjs(item?.created_at).format(
                                                'DD/MM/YYYY HH:mm',
                                            )}
                                            ]
                                        </Typography.Text>
                                        {' - '}
                                        <b
                                            className="font-bold cursor-pointer hover:text-blue-500"
                                            onClick={() =>
                                                navigate(
                                                    `/user/${item?.user?.id}/detail`,
                                                )
                                            }
                                        >
                                            {item.user?.name}
                                        </b>
                                    </>
                                }
                                description={item?.description}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default History;
