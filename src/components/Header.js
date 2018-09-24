import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component {
  state = {
    auth: false,
    anchor: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchor: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchor: null });
  };

  renderMenu(className) {
    return (
      <IconButton className={className} color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
    );
  }

  renderTitle(title, className) {
    return (
      <Typography variant="title" color="inherit" className={className}>
        {title}
      </Typography>
    );
  }

  renderUser() {
    const { auth, anchor } = this.state;
    if (auth) {

      return (
        <div>
          <IconButton
            aria-owns={'menu-user'}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-user"
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
            <MenuItem onClick={this.handleClose} divider={true}>My account</MenuItem>
            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      );
    } else {

      return (
        <div>
          <IconButton
            aria-owns={'menu-user'}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-user"
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose} divider={true}>Login</MenuItem>
            <MenuItem onClick={this.handleClose}>Signup</MenuItem>
          </Menu>
        </div>
      );
    }
  }

  render() {
    const { title, classes } = this.props;

    return (
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            {this.renderMenu(classes.menuButton)}
            {this.renderTitle(title, classes.grow)}
            {this.renderUser()}
          </Toolbar>
        </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);