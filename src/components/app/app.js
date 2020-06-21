import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddItem from "../add-item";

import "./app.css";

export default class App extends Component {
  maxId = 100;
  constructor() {
    super();
    this.createTodoItem = (label) => {
      return {
        label,
        important: false,
        done: false,
        id: this.maxId++,
      };
    };
    this.state = {
      todoData: [
        this.createTodoItem("drink coffee"),
        this.createTodoItem("Make Awesom App"),
        this.createTodoItem("Have a lanch"),
      ],
    };

    this.diliteItem = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const before = todoData.slice(0, idx);
        const after = todoData.slice(idx + 1, todoData.length);

        const newArr = [...before, ...after];
        return {
          todoData: newArr,
        };
      });
    };
    this.onAddItem = (text) => {
      const newItem = this.createTodoItem(text);
      this.setState(({ todoData }) => {
        const newArr = [...todoData, newItem];
        return {
          todoData: newArr,
        };
      });
    };
    this.togleProperty = (arr, id, propName) => {
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };
      const newArray = [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    };
    this.onTogleImportant = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.togleProperty(todoData, id, "important"),
        };
      });
    };

    this.onTogleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.togleProperty(todoData, id, "done"),
        };
      });
    };
  }

  render() {
    const doneCount = this.state.todoData
    .filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={this.state.todoData}
          onDeleted={this.diliteItem}
          onTogleImportant={this.onTogleImportant}
          onTogleDone={this.onTogleDone}
        />
        <AddItem onAddItem={this.onAddItem} />
      </div>
    );
  }
}
