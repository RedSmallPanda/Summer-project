import React, { Component } from 'react';
import axios from "axios/index";
import {browserHistory} from "react-router";
class Image extends Component {
    state = {
        imgUrl:"",
    };

    getImage(self) {
        axios.get("/getImage",{
            params: {
                showId: self.props.showId,
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

    detail(showId){
        browserHistory.push({
            pathname: "/detail/" + showId,
        });
    }

    componentWillMount(){
        this.getImage(this);
    }

    render() {
        let self=this;
        return (
            <div>
                <img width={120} alt="logo" src={self.state.imgUrl}
                     onClick={() => this.detail(self.props.showId)}/>
            </div>
        );
    }
}
export default Image;