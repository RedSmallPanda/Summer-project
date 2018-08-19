import React, { Component } from 'react';
import { Steps, Row, Col, Icon, Table, Button, Radio, Divider, Menu, Dropdown} from 'antd';
import '../../css/BuyStep.css';
import axios from "axios/index";
import { browserHistory} from 'react-router';

const Step=Steps.Step;

class ResetPassword extends Component {

    constructor(props){
        super(props);
        this.state={
            firstStep:0,
            secondStep:0,
        };
    }

    confirmS1 = () => {
        console.log('step changed to: 1');
        let self = this;
        axios.get("/createOrder", {
            params: {}
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        if (this.state.isCart === 1) {
            axios.get("/deleteCart", {
                params: {}
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        this.setState({firstStep: 1});
    };

    confirmS2 = () => {
        console.log('step changed to: 2');
        this.setState({secondStep: 1});
        let self = this;
        axios.get("/giveMeCoupon", {
            params: {}
        })
            .then(function (response) {
                console.log(response);
                if (response.data.length === 0) {
                    self.setState({getNoCoupon: 1});
                }
                else {
                    self.setState({newCoupon: response.data});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    componentDidMount() {
        let self = this;
        axios.get("/getMyCouponByPrice", {
            params: {

            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let step0Page=
            <div>
                输入账号<br/>
                输入注册邮箱<br/>
                输入验证码<br/>
                <Button style={{float:"right",width:"110px"}} type="primary" onClick={this.confirmS1} size="large">确认</Button>
            </div>;

        let step1Page =
            <div>
                输入新密码<br/>
                确认密码<br/>
                <Button type="primary" onClick={this.confirmS2}>付款完成</Button>
            </div>;

        let step2Page =
            <div>
                <br/>
                <div className="recBorder">
                    &emsp;<Icon type="check" style={{fontSize: 50, color: '#4cc232'}}/>&ensp;您已完成付款!
                </div>
                <br/>
                <br/>
                <div className="dashedDiv">
                    <br/>
                    <br/>
                    <h1 style={{textAlign: 'center', fontFamily: 'Hiragino Sans GB'}}>这次没拿到优惠券，请再接再厉哦！</h1>
                </div>
            </div>;


        let resetPage=null;
        if(this.state.firstStep===0&&this.state.secondStep===0){
            resetPage=step0Page;
        }
        else if(this.state.firstStep===1&&this.state.secondStep===0){
            resetPage=step1Page;
        }
        else if(this.state.firstStep===1&&this.state.secondStep===1&&this.state.getNoCoupon===1){
            resetPage=step2Page;
        }
        else{
            console.log("reset password step error");
        }
        return (
            <div>
                <br/>
                <br/>
                <Row>
                    <Col span={4}/>
                    <Col span={16}>
                        <Steps current={this.state.firstStep+this.state.secondStep} align="left">
                            <Step title="验证账号" />
                            <Step title="重置密码" />
                            <Step title="修改成功" />
                        </Steps>
                        <br/>
                        <br/>
                        {resetPage}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ResetPassword;