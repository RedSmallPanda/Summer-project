import React, { Component } from 'react';
import { Router, Route, Link, hashHistory} from 'react-router'
import HomePage from './module/HomePage'
import InfoSpace from './module/InfoSpace'
import Directory from './module/Directory'

class MyRouter extends Component{
    render(){
        return(
            <Router history={hashHistory}>
                <Route path='/' component={HomePage}/>
                <Route path='/home' component={HomePage}/>
                <Route path='/info' component={InfoSpace}/>
                <Route path='/all' component={Directory}/>
            </Router>
        )
    }
}

export default MyRouter;