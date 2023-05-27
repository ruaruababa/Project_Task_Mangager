import {Badge, Card} from 'antd';
import {useState} from 'react';
import {getDetailRole} from '../../../../services/role';
import Action from '../../../Action';
import CreateUpdateRoleModal from '../CreateUpdate';

const Item = ({item}: any) => {
    const [isShow, setIsShow] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState<any>([]);
    const handleCancel = () => {
        setIsShow(false);
        setIsEdit(false);
    };

    const handleToggleModal = () => {
        setIsShow(!isShow);
        // setShouldFetch(!shouldFetch);
    };

    const handleEdit = () => {
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
        console.log('newData', newData);

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
        console.log('lastData', lastData);

        console.log('flattenedData', flattenedData);

        return data;
    };

    console.log('data', data);

    // const {data: roleResponse} = useQuery({
    //     queryKey: ['getDetailRole', item?.id],
    //     queryFn: () => getDetailRole(item?.id),
    // });

    // console.log('roleResponse', roleResponse);

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
                                        <span>{item?.groupName}</span>
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
                    initalValues={data}
                />
            }
        </>
    );
};

export default Item;
