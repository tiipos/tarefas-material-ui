import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
  Checkbox, Divider, IconButton, InputAdornment, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, TextField, Typography } 
  from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Add from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    marginTop: 20,
    marginLeft: 20,
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: 5,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
});

class Task {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.concluded = false;
  }

  close = () => {
    this.concluded = true;
  }


  static getAll = () => {
    return [
      new Task(Task.getNewId(), "My task no 1"),
      new Task(Task.getNewId(), "My task no 2"),
      new Task(Task.getNewId(), "My task no 3"),
      new Task(Task.getNewId(), "My task no 4"),
      new Task(Task.getNewId(), "My task no 5"),
      new Task(Task.getNewId(), "My task no 6"),
    ];
  }

  static getNewId = () => {
    if (!Task.count) { Task.count = 0;}
    return ++Task.count;
  }
}

class Notepad extends Component {
  constructor(props) {
    super(props);
    const tasks = Task.getAll();
    this.state = {
      checked: [0],
      tasks: tasks,
    };
  }

  handleToggle = value => () => {    
    value.close();
    
    const { tasks } = this.state;
    this.setState({
      tasks: tasks,
    });
  };

  onKeyPressNewTask = (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      const task = new Task(Task.getNewId(), ev.target.value);
      const { tasks, checked } = this.state;
      tasks.push(task);
      ev.target.value = "";
      this.setState({
        checked: checked,
        tasks: tasks,
      });
    }
  }

  renderTasks(tasks, className) {
    return tasks.map(value => (
      <ListItem
        key={value.id}
        role={undefined}
        dense
        button
        onClick={this.handleToggle(value)}
        className={className}
      >
        <Checkbox
          // checked={this.state.checked.indexOf(value) !== -1}
          checked={value.concluded}
          tabIndex={-1}
          color="primary"
        />
        <ListItemText primary={value.title} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))
  }

  renderNewTask(className) {
    return (
      <TextField 
        id="new-task"
        className={className}
        label="New task"
        onKeyPress={this.onKeyPressNewTask}
        placeholder="Enter a new task"
        type="text"
        variant="outlined" 
      />
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <Typography className={classes.title} variant="title" color="inherit">
          Minhas tarefas de hoje
        </Typography>
        {this.renderNewTask(classes.textField)}
        <Divider />
        <List>
          {this.renderTasks(this.state.tasks)}
        </List>
      </Paper>
    );
  }
}

Notepad.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notepad);