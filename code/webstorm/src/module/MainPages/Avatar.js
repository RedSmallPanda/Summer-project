import React, { Component } from 'react';
import axios from "axios/index";
import "../../css/BasicInfo.css"
class Avatar extends Component {
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
            <div className="infoAvatar">
                <img width={60} height={60} alt="logo" src={self.state.imgUrl}/>
            </div>
        );
    }
}
export default Avatar;