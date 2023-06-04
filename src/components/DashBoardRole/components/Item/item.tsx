import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Badge, Card, notification} from 'antd';
import {useState} from 'react';
import {getDetailRole, removeRole} from '../../../../services/role';
import Action from '../../../Action';
import {ModalConfirm} from '../../../DashboardProject/components/Task/detailTask';
import CreateUpdateRoleModal from '../CreateUpdate';

const Item = ({item}: any) => {
    const [isShow, setIsShow] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [onlyCanView, setOnlyCanView] = useState(false);
    const [data, setData] = useState<any>([]);
    const handleCancel = () => {
        setIsShow(false);
        setIsEdit(false);
    };

    const handleToggleModal = () => {
        setIsShow(true);
        needFetch();
        setOnlyCanView(true);
        // setShouldFetch(!shouldFetch);
    };

    const handleEdit = () => {
        setOnlyCanView(false);
        setIsShow(true);
        setIsEdit(true);
        needFetch();
    };

    const needFetch = async () => {
        const {data} = await getDetailRole(item?.id);
        const newData = data?.data?.permissions?.map(
            (item: any, index: any) => {
                return {
                    name: item?.groupName,
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

        const flattenedData = newData.flatMap(({name, permissions}: any) =>
            permissions.map((user: any) => ({name, ...user})),
        );

        const lastData: any = {};

        let count = 1;

        const uniqueNames = Array.from(
            new Set(flattenedData.map((obj: any) => obj.name)),
        );

        uniqueNames.forEach((name, index) => {
            lastData[`rules${index + 1}`] = true;
        });

        flattenedData.forEach((obj: any) => {
            Object.entries(obj).forEach(([key, value]) => {
                if (key !== 'name') {
                    lastData[key] = value;
                }
            });
        });

        setData({
            id: data?.data?.id,
            name: data?.data?.name,
            ...lastData,
        });

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
                message: 'Success ',
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
        removeRoleMutate(item?.id);
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
                title="Xóa danh mục phân quyền"
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
