import React, { Component } from 'react';
import HeaderMenu from './HeaderMenu'
import '../css/App.css';
import MyRouter from '../MyRouter'
import CollectionsPage from './Login'
import Register from './Register'
import GoodDetailPage from "./Gooditem/GoodDetailPage";


class App extends Component {
  render() {
    return (
      <div className="App">
          <GoodDetailPage/>
      </div>
  );
  }
}

export default App;
