import React, { Component } from 'react';
import { Router, Route, Link, hashHistory} from 'react-router'
import HomePage from './module/HomePage'
import InfoSpace from './module/InfoSpace'
import Directory from './module/Directory'
import AdminSpace from './module/AdminSpace'
import BuyStep from './module/BuyStep'
import GoodDetailPage from "./module/Gooditem/GoodDetailPage";
import CommentPage from "./module/CommentPage";
class MyRouter extends Component{
    render(){
        return(
            <Router history={hashHistory}>
                <Route path='/' component={HomePage}/>
                <Route path='/home' component={HomePage}/>
                <Route path='/info/:keyId' component={InfoSpace}/>
                <Route path='/dir/:type' component={Directory}/>
                <Route path="/commentPage" component={CommentPage}/>
                <Route path="/detail" component={GoodDetailPage}/>
                <Route path="/admin/:keyId" component={AdminSpace}/>
                <Route path="/buyStep" component={BuyStep}/>
            </Router>
        )
    }
}

export default MyRouter;