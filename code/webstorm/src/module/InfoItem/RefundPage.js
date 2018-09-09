import React, { Component } from 'react';
import {Row, Col, Form, Rate, Button, Card, Icon, Radio, Modal} from 'antd';
import axios from "axios/index";
import {browserHistory} from "react-router";
import Image from "../MainPages/Image";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class DemoRefundPage extends Component {
    state={
        data:[],
        showId:this.props.showId,
        orderId:this.props.orderId,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.get("/refundOrder",{
                    params:{
                        orderId:this.state.orderId,
                        simpleReason:values.simpleReason,
                        detailReason:values.confirm,
                    }
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                Modal.success({
                    title: '退款申请已提交！',
                    content: '请耐心等待退款结果',
                    onOk(){browserHistory.push({
                        pathname:'/info',
                    });},
                });

            }
        });
    };

    componentWillMount(){
        let self = this;
        axios.get("/getShowByOrderId",{
            params:{
                orderId:this.state.orderId,
            }
        })
            .then(function (response) {
                console.log(response);
                self.setState({
                    data: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 14 },
        };
        const { Meta } = Card;

        return (
            <div>
                <br/>
                <br/>
                <Row>
                    <Col span={4}/>
                    <Col span={12}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="退款理由"
                            >
                                {getFieldDecorator('simpleReason', {
                                    initialValue: '其他',
                                })(
                                    <RadioGroup>
                                        <RadioButton value="误操作">误操作</RadioButton>
                                        <RadioButton value="没钱了">没钱了</RadioButton>
                                        <RadioButton value="其他">其他</RadioButton>
                                    </RadioGroup>
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="详细"
                            >
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true, message: '请输入详细退款理由!',
                                    }],
                                })(
                                    <textarea style={{width:'500px',height:'400px'}} />

                                )}
                            </FormItem>

                            <FormItem
                                wrapperCol={{ span: 4, offset: 2 }}
                            >
                                <Button type="primary" htmlType="submit">提交</Button>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span={4}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<Image width={240} showId={this.state.showId}/>} //这里添加图片
                        >
                            <Meta
                                title={this.state.data.title}
                                description={
                                    <div>
                                        <Icon type="environment" />{" "+this.state.data.address}<br/>
                                        <Icon type="calendar" />{" "+this.state.data.starttime+" 起"}<br/>
                                        <Rate allowHalf disabled value={this.state.data.rate} />
                                    </div>}
                            />
                        </Card>
                    </Col>
                    <Col span={4}/>
                </Row>
            </div>
        );
    }
}

const RealRefundPage = Form.create()(DemoRefundPage);

class RefundPage extends Component {
    render(){
        return (
            <RealRefundPage showId={this.props.location.state.showId} orderId={this.props.location.state.orderId}/>
        );
    }
}


export default RefundPage;