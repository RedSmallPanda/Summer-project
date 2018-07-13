import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'
import HomePage from './module/MainPages/HomePage'
import InfoSpace from './module/MainPages/InfoSpace'
import Directory from './module/MainPages/Directory'
import AdminSpace from './module/MainPages/AdminSpace'
import BuyStep from './module/MainPages/BuyStep'
import CommentPage from './module/MainPages/CommentPage'
import GoodDetailPage from "./module/Gooditem/GoodDetailPage";
import Us from "./module/MainPages/Us";
import Help from "./module/MainPages/Help";
import RefundPage from "./module/MainPages/RefundPage";
import Register from "./module/MainPages/Register";

class MyRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin:false
        }
    }

    componentWillMount(){
        let key = document.cookie.split(";")[0].split("=")[0];
        let username = document.cookie.split(";")[0].split("=")[1];
        if (username&&key==="username") {
            this.setState({
                isLogin:true
            })
        }
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