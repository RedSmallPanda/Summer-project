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
            self.state.imgUrl ? <img className="infoAvatar" style={{width:100,height:100}} src={self.state.imgUrl}/> :
                <img className="infoAvatar" style={{width:100,height:100}}
                     src="http://bpic.588ku.com/element_origin_min_pic/01/31/87/96573b585a7c9c4.jpg"/>
        );
    }
}
export default MyAvatar;