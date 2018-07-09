import React, { Component } from 'react';
import HeaderMenu from './HeaderMenu'
import '../css/App.css';
import MyRouter from '../MyRouter'
import CollectionsPage from './Login'
import Register from './Register'
import GoodDetailPage from "./Gooditem/GoodDetailPage";
import Footer from "./Footer";


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
