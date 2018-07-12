import React, { Component } from 'react';
import HeaderMenu from './module/MainPages/HeaderMenu'
import './css/App.css';
import MyRouter from './MyRouter'
import Footer from "./module/MainPages/Footer";


class App extends Component {
  render() {
    return (
      <div className="App">
          <HeaderMenu/>
          <MyRouter/>
          <Footer/>
      </div>
  );
  }
}

export default App;
