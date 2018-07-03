import React, { Component } from 'react';
import { Router, Route, Link, hashHistory} from 'react-router'
import HomePage from './module/HomePage'
import InfoSpace from './module/InfoSpace'

class MyRouter extends Component{
    render(){
        return(
            <Router history={hashHistory}>
                <Route path='/home' component={HomePage}/>
                <Route path='/info' component={InfoSpace}/>
            </Router>
        )
    }
}

export default MyRouter;