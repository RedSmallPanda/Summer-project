import React, { Component } from 'react';
import '../../css/App.css'
import { Divider } from 'antd';
import { browserHistory} from 'react-router'

class Footer extends Component{
    about(){
        browserHistory.push({
            pathname: "/us"
        });
    }
    help(){
        browserHistory.push({
            pathname: "/help"
        });
    }
    render(){
        return(
            <div className="footer">
                <br/><br/>
                <t style={{fontSize:30}}>聚票网 </t>
                <Divider type="vertical" />
                <a onClick={this.about} style={{color:"#d8fcff"}}>关于我们</a>
                <Divider type="vertical" />
                <a onClick={this.help} style={{color:"#d8fcff"}}>帮助</a>
            </div>
        )
    }
}

export default Footer;