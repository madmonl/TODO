import React from 'react';
import Fab from '@material-ui/core/Fab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AddIcon from '@material-ui/icons/Add';
import './Header.css';

export default function Header() {
  return (
    <AppBar id="header" position="static" >
      <Toolbar className="header__container">
        <div className="header-title">Todos</div>
        <Fab
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Toolbar>
    </AppBar>
  );
}
