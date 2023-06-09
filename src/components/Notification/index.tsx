import {CheckOutlined} from '@ant-design/icons';
import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import {useEffect, useMemo, useRef, useState} from 'react';
import {getListNoti, markReadAllNoti} from '../../services/user';
import HorizontalThreeDotsIcon from '../icons/hozizontaldot';
import Item from './item';
const MarkAllAsRead = () => {
    const queryClient = useQueryClient();
    const {mutate: markAllMutate} = useMutation({
        mutationFn: markReadAllNoti,
        mutationKey: ['markReadAllNoti'],
        onSuccess: () => {
            queryClient.invalidateQueries(['getListNoti']);
        },
    });

    const handleMarkNoti = () => {
        markAllMutate();
    };

    return (
        <>
            <div className="absolute w-[150px] right-[25px] top-0 bg-white shadow-xl z-100">
                <div className="flex gap-2 px-2" onClick={handleMarkNoti}>
                    {' '}
                    <CheckOutlined />
                    <span className="font-semibold">Đánh dấu tất cả đã đọc</span>
                </div>
            </div>
        </>
    );
};
const Notification = ({shouldRefetch}: {shouldRefetch: boolean;}) => {
    const [isShow, setIsShow] = useState(false);
    const handleOpenMarkAllAsRead = () => {
        setIsShow((prev) => !prev);
    };

    const {
        data,
        refetch,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['getListNoti'],
        queryFn: ({pageParam = 0}) => getListNoti(pageParam),

        getNextPageParam: (lastPage: any, pages) => {

            console.log('pages', pages);
            if (lastPage?.data?.meta?.next_cursor)
                return lastPage?.data?.meta?.next_cursor;
            return undefined;
        },
    });

    useEffect(() => {
        if (shouldRefetch) {
            console.log('refetch');
            refetch();
        }
    }, [shouldRefetch]);


    const listPage = useMemo(() => {
        return (data?.pages || [])?.reduce((result, response) => {
            // @ts-ignore
            return [...result, ...(response?.data?.data || [])];
        }, []);
    }, [data]);

    const listInnerRef = useRef<any>();

    const onScroll = () => {
        if (listInnerRef.current) {
            const {scrollTop, scrollHeight, clientHeight} =
                listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                // TO SOMETHING HERE
                hasNextPage && fetchNextPage();
            }
        }
    };

    return (
        <div className="flex flex-col justify-center w-[310px]">
            <div className="flex justify-between">
                <div className="font-semibold text-[18px]">Thông báo</div>
                <div className="relative cursor-pointer">
                    <HorizontalThreeDotsIcon
                        className="z-20"
                        onClick={handleOpenMarkAllAsRead}
                    />
                    {isShow && <MarkAllAsRead />}
                </div>
            </div>

            <div
                className="max-h-[400px] overflow-y-auto flex flex-col gap-3 py-3"
                ref={listInnerRef}
                onScroll={onScroll}
            >
                {listPage?.map((item: any, idx: any) => (
                    <Item data={item} key={idx} />
                ))}
            </div>
            {/* {hasNextPage && (
                <div
                    className="font-bold text-center cursor-pointer"
                    onClick={() => fetchNextPage()}
                >
                    Xem thêm
                </div>
            )} */}
        </div>
    );
};

export default Notification;
