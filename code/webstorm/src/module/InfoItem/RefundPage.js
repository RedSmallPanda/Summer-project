import React, { Component } from 'react';
import {Row, Col, Form, Rate, Button, Card, Icon, Radio} from 'antd';
import axios from "axios/index";
import {browserHistory} from "react-router";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const data={
    name:'森林音乐会',
    time:'2018/6/8 19:30',
    location:'梅赛德斯奔驰文化中心',
    rate:4.5,
    img:'https://pimg.dmcdn.cn/perform/project/1551/155173_n.jpg'
};

class DemoRefundPage extends Component {
    state={
        data:[],
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
                browserHistory.push({
                    pathname:'/info',
                })
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
                                        required: true, message: '请输入评论内容!',
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
                            cover={<img alt="example" src={this.state.data.img} />} //这里添加图片
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
            <RealRefundPage orderId={this.props.location.state.orderId}/>
        );
    }
}


export default RefundPage;