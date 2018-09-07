import React, { Component } from 'react';
import HeaderMenu from './module/MainPages/HeaderMenu'
import './css/App.css';
import MyRouter from './MyRouter'
import Footer from "./module/MainPages/Footer";
import Cookies from "js-cookie";

class App extends Component {
    state = {
        isLogin: false,
        isAdmin: false,
    };

    componentWillMount() {
        let username = Cookies.get('username');
        if (typeof(username) !== "undefined" && username !== '') {
            if (username === "admin") {
                this.setState({
                    isLogin: true,
                    isAdmin: true
                });
            }
            else {
                this.setState({
                    isLogin: true
                });
            }
        }
    }

    handleLogin(loginState) {
        console.log("log state:");
        console.log(loginState);
        this.setState(loginState);
    }

    render() {
        return (
            <div className="App">
                {/*<VCode/>*/}
                <HeaderMenu isLogin={this.state.isLogin}
                            isAdmin={this.state.isAdmin}
                            handleLogin={this.handleLogin.bind(this)}/>
                <MyRouter isLogin={this.state.isLogin}
                          isAdmin={this.state.isAdmin}/>
                <Footer/>
            </div>
        );
    }
}

export default App;
