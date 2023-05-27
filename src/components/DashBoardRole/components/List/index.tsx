import {PlusOutlined} from '@ant-design/icons';
import {Card} from 'antd';
import {useState} from 'react';
import useRole from '../../../../hooks/useRole';
import CreateUpdateRoleModal from '../CreateUpdate';
import Item from '../Item/item';

const ListRole = () => {
    const {roles} = useRole();
    const [isShow, setIsShow] = useState(false);
    const handleCancel = () => {
        setIsShow(false);
    };

    const handleOpenModal = () => {
        setIsShow(true);
    };

    return (
        <>
            {' '}
            <div className="grid grid-cols-3 gap-3">
                <Card
                    bordered={false}
                    className="flex flex-col items-center justify-center cursor-pointer"
                    onClick={handleOpenModal}
                >
                    <div className="flex flex-col items-center gap-2">
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
            <CreateUpdateRoleModal
                visible={isShow}
                onCancel={handleCancel}
                mode={'create'}
            />
        </>
    );
};

export default ListRole;
