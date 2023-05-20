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
                            {' '}
                            {item?.permissions?.Role && (
                                <p className="flex gap-2">
                                    <Badge color="#f50" />
                                    <span>{'Phân quyền'}</span>
                                </p>
                            )}
                            {item?.permissions?.User && (
                                <p className="flex gap-2">
                                    <Badge color="#f50" />{' '}
                                    <span>{'Quản lý người dùng'}</span>
                                </p>
                            )}
                            {item?.permissions?.Project && (
                                <p className="flex gap-2">
                                    <Badge color="#f50" />{' '}
                                    <span>{'Quản lý dự án'}</span>
                                </p>
                            )}
                            {item?.permissions?.Task && (
                                <p className="flex gap-2">
                                    <Badge color="#f50" />{' '}
                                    <span>{'Quản lý task'}</span>
                                </p>
                            )}
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
