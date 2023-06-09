import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Badge, Card, notification} from 'antd';
import {useState} from 'react';
import useProfile from '../../../../hooks/useProfile';
import {getDetailRole, removeRole} from '../../../../services/role';
import Action from '../../../Action';
import {ModalConfirm} from '../../../DashboardProject/components/Task/detailTask';
import CreateUpdateRoleModal from '../CreateUpdate/createUpdateRole';

const Item = ({item}: any) => {
    const [isShow, setIsShow] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [onlyCanView, setOnlyCanView] = useState(false);
    const [data, setData] = useState<any>([]);
    const {userProfile} = useProfile();
    const canUpdateRole = userProfile?.permissions?.includes('role:update');
    const canDeleteRole = userProfile?.permissions?.includes('role:delete');
    const canViewRole = userProfile?.permissions?.includes('role:view');
    const handleCancel = () => {
        setIsShow(false);
        setIsEdit(false);
    };

    const handleToggleModal = () => {
        if (canViewRole) {
            setIsShow(true);
            needFetch();
            setOnlyCanView(true);
        } else {
            notification.error({
                message: 'Error',
                description: 'Bạn không có quyền xem chi tiết vai trò',
            });
        }
    };

    const handleEdit = () => {
        if (canUpdateRole) {
            setOnlyCanView(false);
            setIsShow(true);
            setIsEdit(true);
            needFetch();
        } else {
            notification.error({
                message: 'Error',
                description: 'Bạn không có quyền chỉnh sửa vai trò',
            });
        }
    };

    const needFetch = async () => {
        const {data} = await getDetailRole(item?.id);
        
        const newData = data?.data?.permissions?.map(
            (item: any, index: any) => {
                return {
                    name: item?.groupName,
                    [item?.name]: true,  	
                    id: item?.name,
                    permissions: item?.permissions?.map(
                        (item: any, idx: any) => {
                            return {
                                [`checked${item?.value}`]: true,
                            };
                        },
                    ),
                };
            },
        );

        const flattenedData:any = {}	
        for (const item of newData) {	
            flattenedData[item?.id] = item[item?.id] || flattenedData[item?.id] || false;	
            // flattenedData["permissions"] = [...item?.permissions]	
        	
            for (const userObj of item.permissions) {	
                for (const key in userObj) {	
                    if (key.startsWith('check')) {	
                        flattenedData[key] = userObj[key];}	
                }	
            }	
        	
            	
         	
        }	
        setData({	
            ...flattenedData,	
            "name": data?.data?.name,
            "id": data?.data?.id	
        })

        return data;
    };
    const queryCLient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);

    const {mutate: removeRoleMutate} = useMutation({
        mutationFn: removeRole,
        mutationKey: ['removeRole'],
        onSuccess: () => {
            queryCLient?.refetchQueries(['getListRole']);
            notification.success({
                message: 'Thành công ',
                description: 'Remove successfully',
            });
            setIsOpen(false);
        },
        onError: (error: any) => {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        },
    });
    const handleRemove = () => {
        canDeleteRole
            ? removeRoleMutate(item?.id)
            : notification.error({
                  message: 'Error',
                  description: 'Bạn không có quyền xóa vai trò',
              });
    };

    return (
        <>
            <div>
                <Card
                    title={item?.name}
                    bordered={false}
                    className="h-full"
                    extra={
                        <Action
                            handleView={handleToggleModal}
                            handleEdit={handleEdit}
                            handleDelete={() => setIsOpen(true)}
                            onlyCanView={!item?.is_editable && true}
                            canView={canViewRole}
                            canUpdate={canUpdateRole && item?.is_editable}
                            canDelete={canDeleteRole && item?.is_editable}
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
                                        <span>{item?.groupName}</span>
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            </div>
            <ModalConfirm
                isShow={isOpen}
                onCancel={() => setIsOpen(false)}
                handleRemoveReportFile={handleRemove}
                title="Xóa vai trò"
            />
            <>
                <CreateUpdateRoleModal
                    visible={isShow}
                    onCancel={handleCancel}
                    mode={isEdit && 'update'}
                    initalValues={data}
                    viewOnly={onlyCanView || (!item?.is_editable && true)}
                />
            </>
        </>
    );
};

export default Item;
