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
      term: "",
      filter: "all",
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

      return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
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
    this.onSearchChange = (term) => {
      this.setState({ term });
    };
    this.search = (items, term) => {
      if (term.length === 0) {
        return items;
      }
      return items.filter((item) => {
        return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
      });
    };
    this.filter = (items, filter) => {
      switch ((items, filter)) {
        case "all":
          return items;
        case "active":
          return items.filter((items) => !items.done);
        case "done":
          return items.filter((items) => items.done);
          default:
            return items;
      }
    };
    this.onFilterChange = (filter)=>{
      this.setState({filter});
    }
  }

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems =this.filter( this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filter = {filter} 
          onFilterChange = {this.onFilterChange}/>
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.diliteItem}
          onTogleImportant={this.onTogleImportant}
          onTogleDone={this.onTogleDone}
        />
        <AddItem onAddItem={this.onAddItem} />
      </div>
    );
  }
}
