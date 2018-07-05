import React, { Component } from 'react';
import { Router, Route, Link, hashHistory} from 'react-router'
import HomePage from './module/HomePage'
import InfoSpace from './module/InfoSpace'
import Directory from './module/Directory'
import TicketItem from './module/TicketItem'

class MyRouter extends Component{
    render(){
        return(
            <Router history={hashHistory}>
                <Route path='/' component={HomePage}/>
                <Route path='/home' component={HomePage}/>
                <Route path='/info/:keyId' component={InfoSpace}/>
                <Route path='/dir/:type' component={Directory}/>
                <Route path="/item" component={TicketItem}/>
            </Router>
        )
    }
}

export default MyRouter;