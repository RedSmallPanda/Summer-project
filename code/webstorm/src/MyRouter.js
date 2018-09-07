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
import Error from "./module/MainPages/Error";
import Activate from "./module/MainPages/Activate";
import ResetPassword from "./module/InfoItem/ResetPassword";

class MyRouter extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin: this.props.isLogin,
            isAdmin: this.props.isAdmin,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    renderRouter = () =>{
        const adminRouter =
            <Router history={browserHistory}>
                <Route path='/' component={HomePage}/>
                <Route path='/home' component={HomePage}/>
                <Route path='/info' component={InfoSpace}/>
                <Route path='/dir(/:type)' component={Directory}/>
                <Route path="/commentPage" component={CommentPage}/>
                <Route path="/detail(/:showId)" component={GoodDetailPage}/>
                <Route path="/admin" component={AdminSpace}/>
                <Route path="/buyStep" component={BuyStep}/>
                <Route path="/us" component={Us}/>
                <Route path="/help" component={Help}/>
                <Route path="/refundPage" component={RefundPage}/>
                <Route path="/activate" component={Activate}/>
                <Route path="/resetPassword" component={ResetPassword}/>
                <Route path="/error" component={Error}/>
            </Router>;

        const loginRouter =
            <Router history={browserHistory}>
                <Route path='/' component={HomePage}/>
                <Route path='/home' component={HomePage}/>
                <Route path='/info' component={InfoSpace}/>
                <Route path='/dir(/:type)' component={Directory}/>
                <Route path="/commentPage" component={CommentPage}/>
                <Route path="/detail(/:showId)" component={GoodDetailPage}/>
                {/*<Route path="/admin" component={AdminSpace}/>*/}
                <Route path="/buyStep" component={BuyStep}/>
                <Route path="/us" component={Us}/>
                <Route path="/help" component={Help}/>
                <Route path="/refundPage" component={RefundPage}/>
                <Route path="/activate" component={Activate}/>
                <Route path="/resetPassword" component={ResetPassword}/>
                <Route path="/error" component={Error}/>
            </Router>;

        const unLoginRouter =
            <Router history={browserHistory}>
                <Route path='/' component={HomePage}/>
                <Route path='/home' component={HomePage}/>
                <Route path='/info' component={Error}/>
                <Route path='/dir(/:type)' component={Directory}/>
                <Route path="/commentPage" component={Error}/>
                <Route path="/detail(/:showId)" component={GoodDetailPage}/>
                {/*<Route path="/admin" component={Error}/>*/}
                <Route path="/buyStep" component={Error}/>
                <Route path="/us" component={Us}/>
                <Route path="/help" component={Help}/>
                <Route path="/refundPage" component={Error}/>
                <Route path="/activate" component={Activate}/>
                <Route path="/resetPassword" component={ResetPassword}/>
                <Route path="/error" component={Error}/>
            </Router>;

        if (this.state.isAdmin) {
            return adminRouter;
        }
        else if (this.state.isLogin) {
            return loginRouter;
        }
        else {
            return unLoginRouter;
        }
    };

    render(){
        return(
            this.renderRouter()
        )
    }
}

export default MyRouter;