import React, { Component } from 'react';
import { Router, Route, browserHistory} from 'react-router'
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
    render(){
        return(
            <Router history={browserHistory}>
                <Route path='/' component={HomePage}/>
                <Route path='/home' component={HomePage}/>
                <Route path='/info' component={InfoSpace}/>
                <Route path='/dir/:type' component={Directory}/>
                <Route path="/commentPage" component={CommentPage}/>
                <Route path="/detail" component={GoodDetailPage}/>
                <Route path="/admin" component={AdminSpace}/>
                <Route path="/buyStep" component={BuyStep}/>
                <Route path="/us" component={Us}/>
                <Route path="/help" component={Help}/>
                <Route path="/refundPage" component={RefundPage}/>
                <Route path="/register" component={Register}/>
            </Router>
        )
    }
}

export default MyRouter;