import React, { Component } from 'react';
import '../../css/App.css'
import { Divider } from 'antd';
import { browserHistory} from 'react-router'

class Footer extends Component {
    constructor(props) {
        super(props);
        this.minTop = 100;
        this.height = 150;
        this.state = {
            display: false,
            height: 0,
            top: 0,
        };
        this.relocation = this.relocation.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.relocation);
        window.addEventListener('load', this.relocation);
        document.addEventListener('click', this.relocation);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.relocation);
        window.removeEventListener('load', this.relocation);
        document.removeEventListener('click', this.relocation);
        // document.getElementById("router").removeEventListener('hashchange', this.relocation);
    }

    documentHeight() {
        return this.refs.footer.offsetTop + this.height;
    }

    relocation() {
        console.log("triggered");
        if (this.documentHeight() < document.body.clientHeight) {
            this.setState({
                display: true,
                height: this.height,
                top: this.state.top + document.body.clientHeight - this.documentHeight()
            });
        } else if (this.state.top === 0 || this.state.top > this.minTop) {
            let extra = this.documentHeight() - document.body.clientHeight;
            this.setState({
                display: true,
                height: this.height,
                top: (this.state.top - extra) > this.minTop ?
                    this.state.top - extra : this.minTop
            });
        }
    }

    about() {
        browserHistory.push({
            pathname: "/us"
        });
    }

    help() {
        browserHistory.push({
            pathname: "/help"
        });
    }

    render() {
        return this.state.display ?
            (<div id="footer"
                  className="footer"
                  ref="footer"
                  style={{
                      marginTop: this.state.top,
                      height: this.height
                  }}>
                <br/><br/>
                <t style={{fontSize: 30}}>聚票网&nbsp;</t>
                <Divider type="vertical"/>
                <a onClick={this.about} style={{color: "#d8fcff"}}>关于我们</a>
                <Divider type="vertical"/>
                <a onClick={this.help} style={{color: "#d8fcff"}}>帮助</a>
                <Divider type="vertical"/>
                <a onClick={this.relocation} style={{color: "#d8fcff"}}>debug：调整位置</a>
            </div>)
            :
            <div id="footer" ref="footer" style={{height: 0}}/>;
    }
}

export default Footer;