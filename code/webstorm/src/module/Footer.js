import React, { Component } from 'react';
import '../css/App.css'
import { Divider } from 'antd';

class Footer extends Component{
    render(){
        return(
            <div className="footer">
                <br/><br/>
                聚票网
                <Divider type="vertical" />
                <a href="#/us">关于我们</a>
                <Divider type="vertical" />
                <a href="#/help">帮助</a>
            </div>
        )
    }
}

export default Footer;