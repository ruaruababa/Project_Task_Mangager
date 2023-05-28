// @ts-ignore
import {Droppable} from 'react-beautiful-dnd';
import {useParams} from 'react-router-dom';
import Task from './item';

function Column(props: any) {
    const {droppableId, list, type} = props;

    const {id} = useParams();

    let style = {
        width: '90%',
        height: '70%',
    };

    console.log(
        'type = ',
        droppableId,
        list?.map((v: any) => v.id),
    );

    const getLable = (status_id: any) => {
        switch (status_id) {
            case '1':
                return {
                    label: 'Not Started',
                    color: '#8f8f8f',
                };
            case '2':
                return {
                    label: 'Pending',
                    color: '#e0e00a',
                };
            case '3':
                return {
                    label: 'In Progress',
                    color: '#fa7725',
                };
            case '4':
                return {
                    label: 'Behind Schedule',
                    color: '#f7020f',
                };
            case '5':
                return {
                    label: 'Completed',
                    color: '#12b51d',
                };
            default:
                return {
                    label: 'Not Started',
                    color: '#8f8f8f',
                };
        }
    };

    return (
        <Droppable droppableId={droppableId?.toString()} type={type}>
            {(provided: any) => (
                <>
                    {' '}
                    <div
                        className="flex flex-col gap-2 overflow-y-auto"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={style}
                    >
                        <h2
                            className="p-3 text-lg font-semibold"
                            style={{
                                color: getLable(droppableId).color,
                            }}
                        >
                            {getLable(droppableId).label} ({list?.length || 0})
                            <div
                                className="mt-3"
                                style={{
                                    width: '100%    ',
                                    borderBottom: `5px solid ${
                                        getLable(droppableId).color
                                    }`,
                                }}
                            ></div>
                        </h2>

                        <div className="flex flex-col gap-2 p-3 overflow-y-scroll min-h-[550px]">
                            {' '}
                            {(list || [])?.map((val: any, index: any) => {
                                return (
                                    <Task
                                        id={val.id.toString()}
                                        key={val.id}
                                        index={index}
                                        title={val.name}
                                        data={val}
                                        idProject={id}
                                    />
                                );
                            })}
                        </div>

                        {provided.placeholder}
                    </div>
                </>
            )}
        </Droppable>
    );
}

export default Column;
