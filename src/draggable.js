import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import { ItemTypes } from "./constants";
import "./styles.css";

/**
 * Implements the drag source contract.
 */
const dragSourceNode = {
  beginDrag(props) {
    props.setCurrentElement(props.item);

    return {
      text: props.item.text
    };
  },

  endDrag(props, monitor) {
    props.setCurrentElement(null);
    if (!monitor.didDrop()) return;
    // console.log(props);
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Draggable extends Component {
  static propTypes = {
    text: PropTypes.node.isRequired,

    // Injected by React DnD:
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
  };

  render() {
    const { isDragging, connectDragSource, item } = this.props;
    return connectDragSource(
      <div
        style={{
          color: isDragging ? "yellow" : "black",
          opacity: isDragging ? 0.5 : 1
        }}
      >
        {item.content}
      </div>
    );
  }
}

//the wrapped component:
export default DragSource(ItemTypes.THING, dragSourceNode, collect)(Draggable);
