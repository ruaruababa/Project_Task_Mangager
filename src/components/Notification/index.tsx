import {CheckOutlined} from '@ant-design/icons';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useEffect, useMemo, useState} from 'react';
import {useInView} from 'react-intersection-observer';
import {getListNoti} from '../../services/user';
import HorizontalThreeDotsIcon from '../icons/hozizontaldot';
import Item from './item';
const MarkAllAsRead = () => {
    return (
        <>
            <div className="absolute w-[150px] right-[25px] top-0 bg-white shadow-lg z-0">
                <div className="flex gap-2 px-2">
                    {' '}
                    <CheckOutlined />
                    <span> Mark all as read</span>
                </div>
            </div>
        </>
    );
};
const Notification = () => {
    const [isShow, setIsShow] = useState(false);
    const handleOpenMarkAllAsRead = () => {
        setIsShow((prev) => !prev);
    };
    const {ref, inView} = useInView();

    const {
        data,

        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery({
        queryKey: ['getListNoti'],
        queryFn: ({pageParam = 0}) => getListNoti(pageParam),

        getNextPageParam: (lastPage: any, pages) => {
            console.log(
                'lastPage?.links?.next',
                lastPage?.data?.meta?.next_cursor,
            );
            console.log('pages', pages);
            if (lastPage?.data?.meta?.next_cursor)
                return lastPage?.data?.meta?.next_cursor;
            return undefined;
        },
    });

    console.log('data>>>>', data);

    const listPage = useMemo(() => {
        return (data?.pages || [])?.reduce((result, response) => {
            console.log('response', response?.data);
            console.log('result', result);
            // @ts-ignore
            return [...result, ...(response?.data?.data || [])];
        }, []);
    }, [data]);

    console.log('listPage', listPage);
    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);
    return (
        <div className="flex flex-col justify-center min-w-[350px] px-4  ">
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

            <div className="max-h-[400px] overflow-y-auto " ref={ref}>
                {listPage?.map((item: any, index: any) => (
                    <Item data={item} />
                ))}
            </div>
            {hasNextPage && (
                <div
                    ref={ref}
                    className="text-center cursor-pointer"
                    onClick={() => fetchNextPage()}
                >
                    Xem thêm
                </div>
            )}
        </div>
    );
};

export default Notification;
