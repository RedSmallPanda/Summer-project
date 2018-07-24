import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'
import Cookies from 'js-cookie'
import HomePage from './module/MainPages/HomePage'
import InfoSpace from './module/InfoItem/InfoSpace'
import Directory from './module/MainPages/Directory'
import AdminSpace from './module/AdminItem/AdminSpace'
import BuyStep from './module/Gooditem/BuyStep'
import CommentPage from './module/Gooditem/CommentPage'
import GoodDetailPage from "./module/Gooditem/GoodDetailPage";
import Us from "./module/MainPages/Us";
import Help from "./module/MainPages/Help";
import RefundPage from "./module/InfoItem/RefundPage";
import Register from "./module/MainPages/Register";

class MyRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin:false
        }
    }

    componentWillMount(){

        let username = Cookies.get('username');
        if(typeof(username) !== "undefined" && username !== ''){
            this.setState({
                isLogin:true
            })
        }
        // let strCookie = document.cookie;
        // let arrCookie = strCookie.split(";");
        // for(let i = 0; i < arrCookie.length; i++){
        //     let arr = arrCookie[i].split("=");
        //     if("username" === arr[0] && arr[1]) {
        //         this.setState({
        //             isLogin: true
        //         })
        //     }
        // }
    }

    renderRouter = () =>{
        const loginRouter =
            <Router history={browserHistory}>
                <Route path='/' component={HomePage}/>
                <Route path='/home' component={HomePage}/>
                <Route path='/info' component={InfoSpace}/>
                <Route path='/dir(/:type)' component={Directory}/>
                <Route path="/commentPage" component={CommentPage}/>
                <Route path="/detail" component={GoodDetailPage}/>
                <Route path="/admin" component={AdminSpace}/>
                <Route path="/buyStep" component={BuyStep}/>
                <Route path="/us" component={Us}/>
                <Route path="/help" component={Help}/>
                <Route path="/refundPage" component={RefundPage}/>
                <Route path="/register" component={Register}/>
            </Router>;

        const unLoginRouter =
            <Router history={browserHistory}>
                <Route path='/' component={HomePage}/>
                <Route path='/home' component={HomePage}/>
                <Route path='/info' component={Us}/>
                <Route path='/dir(/:type)' component={Directory}/>
                <Route path="/commentPage" component={Us}/>
                <Route path="/detail" component={GoodDetailPage}/>
                <Route path="/admin" component={Us}/>
                <Route path="/buyStep" component={Us}/>
                <Route path="/us" component={Us}/>
                <Route path="/help" component={Help}/>
                <Route path="/refundPage" component={Us}/>
                <Route path="/register" component={Register}/>
            </Router>;

        if(this.state.isLogin){
            return loginRouter;
        }
        else
            return unLoginRouter;
    };

    render(){
        return(
            this.renderRouter()
        )
    }
}

export default MyRouter;