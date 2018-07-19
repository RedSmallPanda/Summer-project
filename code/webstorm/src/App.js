import React, { Component } from 'react';
import HeaderMenu from './module/MainPages/HeaderMenu'
import './css/App.css';
import MyRouter from './MyRouter'
import Footer from "./module/MainPages/Footer";
import VCode from "./module/MainPages/VCode"


class App extends Component {
  render() {
    return (
      <div className="App">
          {/*<VCode/>*/}
          <HeaderMenu/>
          <MyRouter/>
          <Footer/>
      </div>
  );
  }
}

export default App;
