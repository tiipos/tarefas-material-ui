import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

import Header from './components/Header';
import Notepad from './components/Notepad';

class App extends Component {
  render() {
    return (
      <div>
        <Header title="Lista de tarefas pessoais" />
        <Notepad />
      </div>
    );
  }
}

export default App;
