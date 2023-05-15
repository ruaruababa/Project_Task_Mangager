import {DragOutlined} from '@ant-design/icons';
// @ts-ignore
import {get} from 'lodash';
// @ts-ignore
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
export const DragDrop = ({
    onDragEnd,
    droppableId,
    items,
    itemId = 'id',
    RenderComponent,
    configs = {dragInContainer: false},
}: any) => {
    const DroppableItem = ({data, idx}: any) => {
        const wrapperProps = (provided: any) => {
            if (configs.dragInContainer) {
                return {
                    ...provided.draggableProps,
                    ...provided.dragHandleProps,
                };
            }
            return {...provided.draggableProps};
        };

        console.log('get(data, itemId)', get(data, itemId));

        return (
            <Draggable
                draggableId={get(data, itemId).toString()}
                index={idx}
                key={itemId}
            >
                {(provided: any) => (
                    <div
                        ref={provided.innerRef}
                        {...wrapperProps(provided)}
                        className="dragContainer"
                    >
                        {!configs?.dragInContainer && (
                            <div
                                className="dragIcon"
                                {...provided.dragHandleProps}
                            >
                                123
                                <DragOutlined />
                            </div>
                        )}

                        <RenderComponent data={data} idx={idx} />
                    </div>
                )}
            </Draggable>
        );
    };

    const DroppableList = function MenuList({data}: any) {
        console.log('data', data);
        return data.map((item: any, index: any) => (
            <DroppableItem
                data={item}
                idx={index}
                index={index}
                key={item?.id}
            />
        ));
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={droppableId}>
                {(provided: any) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <DroppableList data={items} />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
