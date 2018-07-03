import React, { Component } from 'react';
import logo from './logo.svg';
import Button from 'antd/lib/button'
import './App.css';
import Login from './components/Login'
class App extends Component {
  render() {
      const ele=(<div><p>asdasd</p></div>);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <Button type="primary">Button</Button>
          <div><Login/></div>
      </div>
    );
  }
}

export default App;
