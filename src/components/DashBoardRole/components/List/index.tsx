import {PlusOutlined} from '@ant-design/icons';
import {Card} from 'antd';
import useRole from '../../../../hooks/useRole';
import Item from '../Item/item';
const ListRole = () => {
    const {roles} = useRole();

    return (
        <div className="grid grid-cols-3 gap-3">
            <Card
                bordered={false}
                className="flex flex-col items-center justify-center"
            >
                <div className="flex flex-col items-center">
                    <PlusOutlined
                        style={{
                            fontSize: 50,
                        }}
                    />
                    <div className="">Thêm nhóm vai trò</div>
                </div>
            </Card>
            {roles?.map((item: any, index: any) => (
                <Item key={index} item={item} />
            ))}
        </div>
    );
};

export default ListRole;
