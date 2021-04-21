import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// utility functions
const grid = 8;

const handleReorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const getItemStyle = (isDragging, draggableStyle, isLast) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "#FFFFFF",
  borderBottom: !isLast ? "1px solid #EAEAEA" : '',
  // styles we need to apply on draggables
  ...draggableStyle
});

 const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "#FFFFFF",
  padding: grid,
});

const DraggableList = (props) => {
  // props
  const {
    list,
    listElement: Element,
    params,
  } = props;

  // handlers
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = handleReorder(
      list,
      result.source.index,
      result.destination.index
    );

    params.onReorder(newItems);
  }

  // render
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable
        droppableId="droppable"
      >
        {
          (provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {
                list.map((item, index) => (
                  <Draggable
                    key={`list-draggable-${index}`}
                    draggableId={`list-draggable-${index}`}
                    index={index}
                  >
                    {
                      (innerProvided, innerSnapshot) => (
                        <div
                          ref={innerProvided.innerRef}
                          {...innerProvided.draggableProps}
                          {...innerProvided.dragHandleProps}
                          style={getItemStyle(
                            innerSnapshot.isDragging,
                            innerProvided.draggableProps.style,
                            index === list.length - 1
                          )}
                        >
                          <Element 
                            {...item}
                            {...params}
                            index={index}
                          />
                        </div>
                      )
                    }
                  </Draggable>
                ))
              }
              { provided.placeholder}
            </div>
          )}
      </Droppable>
    </DragDropContext>
  );
}

export default DraggableList;
