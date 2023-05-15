// @ts-ignore

import {Draggable} from 'react-beautiful-dnd';
import UserAvatar from '../Item/avatar';
import Action from './action';

function Task(props: any) {
    const {index, data} = props;
    let style = {
        backgroundColor: 'red',
    };

    return (
        <Draggable draggableId={data?.id?.toString()} index={index} type="TASK">
            {(provided: any) => (
                <div
                    className="p-4 bg-white rounded-md shadow-md"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="flex flex-col gap-5 p-3">
                        <div className="text-blue-500 line-clamp-1">
                            {data?.name}
                        </div>
                        <div className="flex flex-col gap-2">
                            {' '}
                            <div className="flex justify-between">
                                <div className="">#{data?.id}</div>
                                <div className="">
                                    <Action item={data} />
                                </div>
                            </div>
                            <div
                                className="flex col-span-2 py-2 text-center"
                                style={{
                                    borderTop: '1px solid #e5e7eb',
                                }}
                            >
                                <UserAvatar users={data?.users || []} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default Task;
