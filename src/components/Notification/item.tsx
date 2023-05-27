import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Card} from 'antd';
import {markReadNoti} from '../../services/user';

const Item = ({data}: any) => {
    const queryClient = useQueryClient();
    const {mutate: markNotiMutate} = useMutation({
        mutationFn: markReadNoti,
        mutationKey: ['markReadNoti'],
        onSuccess: () => {
            queryClient.invalidateQueries(['getListNoti']);
        },
    });

    const handleMarkNoti = () => {
        markNotiMutate(data?.id);
    };

    return (
        <>
            {' '}
            <Card
                onClick={handleMarkNoti}
                bordered={false}
                className={`${
                    !data?.read_at && 'bg-slate-300'
                } cursor-pointer !shadow-2xl`}
            >
                <p className="text-sm font-bold line-clamp-2">
                    {data?.content}
                </p>
                <p className="text-xs">{data?.created_at_for_human}</p>
            </Card>
        </>
    );
};

export default Item;
