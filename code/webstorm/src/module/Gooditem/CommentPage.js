import React, { Component } from 'react';
import {Row, Col, Form, Rate, Button, Card, Icon, message} from 'antd';
import { browserHistory } from 'react-router'
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;

const data={
    name:'森林音乐会',
    time:'2018/6/8 19:30',
    location:'梅赛德斯奔驰文化中心',
    rate:4.5,
    img:'https://pimg.dmcdn.cn/perform/project/1551/155173_n.jpg'
};

class DemoCommentPage extends Component {
    state={
        data:data,
        rate:'',
        value:'',
        showId:this.props.showId,
        content:this.props.content,
        purpose:this.props.purpose,
        commentId:this.props.commentId,
        orderId:this.props.orderId,
        isFromOrder:this.props.isFromOrder,
    };

    onClose = () =>{
        browserHistory.goBack();
    };

    handleSuccess = () =>{
        message.success("发表成功",2,this.onClose)
    };

    addComment = (values) =>{
        let params = new URLSearchParams();
        let username = Cookies.get('username');
        let time = moment().format('YYYY-MM-DD hh:mm:ss');

        params.append('purpose',this.state.purpose);
        params.append('commentId',this.state.commentId);
        params.append('showId',this.state.showId);
        params.append('orderId',this.state.orderId);
        params.append('isFromOrder',this.state.isFromOrder);
        params.append('username', username);
        params.append('parentId',-1);
        params.append('target',"null");
        params.append('content',values.confirm);
        params.append('rate',values.rate * 2);
        params.append('time',time);
        console.log("params: "+params);
        axios.post('/addComment', params);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({
                    rate:values.rate,
                    value:values.confirm,
                });
                this.addComment(values)

            }
        });
    };

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
                                label="评分"
                            >
                                {getFieldDecorator('rate', {
                                    initialValue: 5,
                                })(
                                    <Rate allowHalf/>
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="评论"
                            >
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true, message: '请输入评论内容!',
                                    }],
                                })(
                                    <textarea style={{width:'500px',height:'400px'}} defaultValue={this.state.content}/>

                                )}
                            </FormItem>

                            <FormItem
                                wrapperCol={{ span: 4, offset: 2 }}
                            >
                                <Button type="primary" htmlType="submit" onClick={this.handleSuccess}>提交</Button>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span={4}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src={this.state.data.img} />}
                        >
                            <Meta
                                title={this.state.data.name}
                                description={
                                    <div>
                                        <Icon type="environment" />{" "+this.state.data.location}<br/>
                                        <Icon type="calendar" />{" "+this.state.data.time}<br/>
                                        <Rate allowHalf disabled defaultValue={this.state.data.rate} />
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

const RealCommentPage = Form.create()(DemoCommentPage);

class CommentPage extends Component {
    state = {
        showId:'',
        content:'',
        purpose:'',
        commentId:'',
        orderId:'',
        isFromOrder:0,
    };

    componentWillMount(){
        window.scrollTo(0,0);
        this.setState(this.props.location.state);

    }

    render(){
        return (
            <RealCommentPage showId={this.state.showId} content={this.state.content}
            purpose={this.state.purpose} commentId={this.state.commentId} orderId={this.state.orderId} isFromOrder={this.state.isFromOrder}/>
        );
    }
}


export default CommentPage;