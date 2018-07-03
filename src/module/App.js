import React, { Component } from 'react';
import HeaderMenu from './HeaderMenu'
import InfoSpace from './InfoSpace'
import '../css/App.css';
import BasicInfo from "./InfoItem/BasicInfo";

class App extends Component {
  render() {
    return (
      <div className="App">
          <HeaderMenu/>
          <InfoSpace/>
      </div>
    );
  }
}

export default App;
