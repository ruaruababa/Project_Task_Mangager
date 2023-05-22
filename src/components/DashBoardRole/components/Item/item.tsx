import {Badge, Card} from 'antd';
import {useState} from 'react';
import Action from '../../../Action';
import CreateUpdateRoleModal from '../CreateUpdate';

const Item = ({item}: any) => {
    const [isShow, setIsShow] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const handleCancel = () => {
        setIsShow(false);
        setIsEdit(false);
    };

    const handleToggleModal = () => {
        setIsShow(!isShow);
    };

    const handleEdit = () => {
        setIsShow(true);
        setIsEdit(true);
    };

    console.log('item', item?.permissions?.Role);
    return (
        <>
            {' '}
            <div>
                <Card
                    title={item?.name}
                    bordered={false}
                    className="h-full"
                    extra={
                        <Action
                            handleView={handleToggleModal}
                            handleEdit={handleEdit}
                        />
                    }
                >
                    <div className="">
                        <div className="flex flex-col gap-2">
                            {item?.permissions?.map((item: any, index: any) => {
                                return (
                                    <p
                                        className="flex gap-2"
                                        key={item?.groupName}
                                    >
                                        <Badge color="#f50" />
                                        <span>{'Phân quyền'}</span>
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            </div>
            {
                <CreateUpdateRoleModal
                    visible={isShow}
                    onCancel={handleCancel}
                    mode={isEdit && 'update'}
                />
            }
        </>
    );
};

export default Item;
