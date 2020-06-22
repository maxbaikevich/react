import React, { Component } from "react";
import "./add-item.css";

export default class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      label: "",
    };
    this.onLabelChange = (evt) => {
      this.setState({
        label: evt.target.value,
      });
    };
    this.onSubmit = (evt)=>{
      evt.preventDefault();
      this.props.onAddItem(this.state.label)
      this.setState({
        label:''
      })

    }
  }

  render() {
    const { onAddItem } = this.props;
    return (
      <form className="add-item d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="wat needs to be done"
          value={this.state.label}
        />
        <button
          className="btn btn-outline-secondary"
        >
          Add item
        </button>
      </form>
    );
  }
}
