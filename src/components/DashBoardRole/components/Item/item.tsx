import {Badge, Card} from 'antd';

const Item = ({item}: any) => {
    console.log('item', item?.permissions?.Role);
    return (
        <>
            {' '}
            <div>
                <Card title={item?.name} bordered={false} className="h-full">
                    <div className="">
                        <div className="flex flex-col gap-2">
                            {' '}
                            {item?.permissions?.Role && (
                                <p>
                                    <Badge color="#f50" /> {'Phân quyền'}
                                </p>
                            )}
                            {item?.permissions?.User && (
                                <p>
                                    <Badge color="#f50" />{' '}
                                    {'Quản lý người dùng'}
                                </p>
                            )}
                            {item?.permissions?.Project && (
                                <p>
                                    <Badge color="#f50" /> {'Quản lý dự án'}
                                </p>
                            )}
                            {item?.permissions?.Task && (
                                <p>
                                    <Badge color="#f50" /> {'Quản lý task'}
                                </p>
                            )}
                        </div>
                        <div className=""></div>
                    </div>
                </Card>
            </div>
            {}
        </>
    );
};

export default Item;
