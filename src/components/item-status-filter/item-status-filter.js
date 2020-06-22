import React, { Component } from "react";

import "./item-status-filter.css";

export default class ItemStatusFilter extends Component {
  buttons = [
    { name: "all", label: "all" },
    { name: "active", label: "Active" },
    { name: "Done", label: "Done" },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const bottons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? "btn-info" : "btn-outline-secondary";

      return (
        <button type="button" 
        key={name} 
        className={`btn ${clazz}`}
        onClick={()=> onFilterChange(name)}>
          {label}
        </button>
      );
    });
    return <div className="btn-group">{bottons}</div>;
  }
}
