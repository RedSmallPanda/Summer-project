import React, { Component } from 'react';
import HeaderMenu from './HeaderMenu'
import '../css/App.css';
import MyRouter from '../MyRouter'
import CollectionsPage from './Login'
import Register from './Register'


class App extends Component {
  render() {
    return (
      <div className="App">
          <HeaderMenu/>
          <MyRouter/>
          <CollectionsPage/>
          <Register/>
      </div>
    );
  }
}

export default App;
