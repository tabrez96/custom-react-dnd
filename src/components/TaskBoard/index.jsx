import React, { Component } from 'react';

import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "../TaskList/index";
import * as _ from 'lodash';

import './styles.css';

class TaskBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showTextBox: false,
      userName: ''
    }

    this.addUser = this.addUser.bind(this)
  }

  onDragStart = (result) => {
  }

  onDragEnd = ({ draggableId, source, destination }) => {
    console.log('drag start', draggableId, source, destination);
    const payload = {
      taskId: draggableId,
      sourceUserId: source.droppableId,
      sourceIndex: source.index,
      destinationUserId: destination.droppableId,
      destinationIndex: destination.index
    }
    // console.log(payload, 'am i on the right path?')
    this.props.moveTask(payload);
  }

  addUser = () => {
    this.props.addUser({
      userName: this.state.userName
    });
    this.resetText();
    this.toggleShowTextbox();
  }

  handleChange = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  toggleShowTextbox = () => {
    this.setState(({showTextBox}) => {
      return {showTextBox: !showTextBox};
    });
    this.resetText();
  }

  resetText = () => {
    this.setState({
      userName: ''
    })
  }

  render() {

    const { showTextBox, userName } = this.state;
    const { addTask, deleteTask, users } = this.props;

    var content;
    if (showTextBox) {
      content = (
        <form className="addUserForm" onSubmit={this.addUser}>
          <input type="text" value={userName} onChange={this.handleChange} />
          <div>
            <button type="submit">Add</button>
            <button onClick={this.toggleShowTextbox}>Cancel</button>
          </div>
        </form>
      )
    }
    else {
      content = (
        <span className="addBtn" onClick={this.toggleShowTextbox}>
          Add User
        </span>
      )
    }

    return (
      <div className="boardContainer">
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          {
            _.map(users, user => {
              return (
                <TaskList
                  key={user.id}
                  user={user}
                  onAddTask={addTask}
                  onDeleteTask={deleteTask}
                />
              )
            })
          }
        </DragDropContext>
        {
          content
        }
      </div>
    );
  }
}

export default TaskBoard;
