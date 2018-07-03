import React, { Component } from 'react';
import HeaderMenu from './HeaderMenu'
import '../css/App.css';
import MyRouter from '../MyRouter'


class App extends Component {
  render() {
    return (
      <div className="App">
          <HeaderMenu/>
          <MyRouter/>
      </div>
    );
  }
}

export default App;
