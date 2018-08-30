import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { ItemTypes } from "./constants";
import { DragDropConsumer } from "./DragDropContext";

const dropTarget = {
  drop(props, monitor) {
    props.onUpdateItem({
      ...props.currentItem,
      filter: props.droppableId
    });
    // console.log(props);
    // console.log(monitor);
    // <DragDropConsumer>
    //   {({ onModifyItem }) => {
    //     onModifyItem()
    //   }
    //   }
    // </DragDropConsumer>
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

class Droppable extends Component {
  render() {
    const { children, connectDropTarget } = this.props;
    return connectDropTarget(
      <div
        style={{ margin: 15, width: 200, height: 200, backgroundColor: "red" }}
      >
        {children}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.THING, dropTarget, collect)(Droppable);
