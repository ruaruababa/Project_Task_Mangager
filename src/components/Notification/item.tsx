import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Card} from 'antd';
import {markReadNoti} from '../../services/user';
import {convertDate} from '../../utils/format';

const Item = ({data}: any) => {
    const queryClient = useQueryClient();
    const {mutate: markNotiMutate, isLoading} = useMutation({
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
                <p className="text-base font-bold">
                    {data?.title || 'Thêm data vào title đi :))'}
                </p>
                <p className="text-sm line-clamp-2">{data?.content}</p>
                <p className="text-xs">{convertDate(data?.created_at)}</p>
            </Card>
        </>
    );
};

export default Item;
