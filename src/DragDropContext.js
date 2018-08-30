import React, { Component, createContext } from "react";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getItems = quantity => {
  const result = [];
  for (let i = 0; i < quantity; i++) {
    result.push({
      id: i,
      content: "----------".concat(i).concat("----------"),
      filter: getRandomInt(0, 3)
    });
  }
  return result;
};

const Context = createContext({
  items: [],
  onModifyItem: () => {}
});

export class DragDropProvider extends Component {
  state = {
    items: getItems(10),
    onModifyItem: this.onModifyItem,
    currentElement: null
  };

  onUpdateItem = itemModified => {
    console.log(itemModified);
    const newArray = this.state.items.map(currentItem => {
      if (currentItem.id !== itemModified.id) {
        return currentItem;
      }

      return itemModified;
    });

    this.setState({ items: newArray });
  };

  onModifyItem = itemModified => {
    const newArray = this.state.items.map(v => v.id !== itemModified.id);
    this.setState({ items: newArray });
  };

  setCurrentElement = currentElement => {
    this.setState({ currentElement });
  };

  render() {
    const value = {
      ...this.state,
      onModifyItem: this.onModifyItem,
      onUpdateItem: this.onUpdateItem,
      setCurrentElement: this.setCurrentElement
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}

export const { Consumer: DragDropConsumer } = Context;
