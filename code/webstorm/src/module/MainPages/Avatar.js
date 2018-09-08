import React, { Component } from 'react';
import axios from "axios/index";
import "../../css/BasicInfo.css"
import { Avatar } from 'antd';
class MyAvatar extends Component {
    state = {
        imgUrl:"",
    };

    getAvatar(self) {
        axios.get("/getAvatar",{
            params: {
                username: self.props.username,
            }
        })
            .then(function (response) {
                self.setState({
                    imgUrl:response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    componentWillMount(){
        this.getAvatar(this);
    }

    render() {
        let self=this;
        return (
            self.state.imgUrl ? <Avatar size="large" src={self.state.imgUrl}/> : <Avatar size="large" icon="user"/>
        );
    }
}
export default MyAvatar;