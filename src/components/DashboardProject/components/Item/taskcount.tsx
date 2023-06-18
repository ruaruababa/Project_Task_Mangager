const TaskCountStatus = (props: any) => {
    const {data} = props;
    return (
        <div className="grid grid-cols-6 text-center h-[100%]">
            {data?.map((item: any) => {
                return (
                    <div
                        className="flex flex-col gap-2"
                        style={{
                            color: item?.color,
                            borderLeft: `1px solid black`,
                        }}
                    >
                        <div className="">{item?.tasks_count}</div>
                        <div className=""> {item?.name}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default TaskCountStatus;
