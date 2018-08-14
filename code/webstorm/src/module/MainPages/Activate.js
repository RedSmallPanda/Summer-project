import React, { Component } from 'react';
import { browserHistory} from 'react-router'
import axios from "axios";



class Activate extends Component {

    state = {
        activateCode: window.location.search.substr(10, window.location.search.length),
        isActivated: false,
        isActivatedText: "账号激活中……"
    };

    componentDidMount() {
        let self = this;
        axios.get("/activate",{
            params:{
                activate: this.state.activateCode
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.data === true) {
                    self.setState({
                        isActivated: true,
                        isActivatedText: "账号激活成功！"
                    });
                } else {
                    self.setState({
                        isActivatedText: "账号激活失败！"
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                self.setState({
                    isActivatedText: "激活异常，请检查网络后重试"
                });
            });
    }

    render() {
        return (
            <div>
                <h1>{this.state.activateCode}</h1>
                <h1>{this.state.isActivatedText}</h1>
            </div>
        );
    }
}
export default Activate;
