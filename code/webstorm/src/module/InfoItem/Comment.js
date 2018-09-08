import React, { Component } from 'react';
import { List,  Icon,  Rate, Tabs, Modal, message} from 'antd';
import {browserHistory} from "react-router";
import axios from 'axios'
import Cookies from "js-cookie"
import Image from "../MainPages/Image"

const TabPane = Tabs.TabPane;

let data = [];
// let reply = [];
// for (let i = 0; i < 10; i++) {
//     data.push({
//         key: i,
//         href: 'http://ant.design',//detail info
//         image: 'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',//ticket image
//         title: `jpw ${i}`,//ticket name
//         time: "2018/07/02",
//         content: 'comment',
//         like: false,
//         likes: i + 1,
//         comments: i,
//         rate: i % 5,
//     });
// }

class Comment extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: data,
        };
        this.detail = this.detail.bind(this);
    }

    getResult(self) {
        axios.get("/myComments",{
            params:{
                username:Cookies.get('username')
            }
        })
            .then(function (response) {
                console.log(response);
                self.handleData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    getReply(self) {
        axios.get("/myReply",{
            params:{
                username:Cookies.get('username')
            }
        })
            .then(function (response) {
                console.log(response);
                self.handleReply(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    componentDidMount(){
        this.getResult(this);
        this.getReply(this);
    }

    handleData = (commentData) =>{
        let tempReply = [];
        let tempComment = [];
        for(let i = 0; i < commentData.length; i++){
            if(commentData[i].rate === -1){
                tempReply.push(commentData[i]);
            }
            else{
                tempComment.push(commentData[i]);
            }
        }
        this.setState({
            loading: false,
            comment: tempComment,
            reply: tempReply,
        });
    };

    handleReply = (replyData) =>{
        this.setState({
            replyToMe: replyData
        })
    };

    handleEdit = (item) =>{
        browserHistory.push({
            pathname:'/commentPage',
            state:{
                purpose: "edit",
                commentId: item.key,
                showId: item.showId,
                content: item.content,
            }
        });
    };

    deleteComment = (item) =>{
        let params = new URLSearchParams();
        params.append('commentId',item.key);
        axios.post('/deleteComment', params);
    };

    handleDelete = (thing) => {
        let self = this;
        Modal.confirm({
            title: '是否删除?',
            content: '',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                const newData = [...self.state.comment];
                const index = newData.findIndex(item => thing.key === item.key);

                self.deleteComment(thing);
                newData.splice(index,1);
                self.setState({
                    comment: newData
                });
                message.success("删除评论成功");
            },
            onCancel() {
                //do nothing
            },
        });
    };

    handleDeleteReply = (thing) => {
        let self = this;
        Modal.confirm({
            title: '是否删除?',
            content: '',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                const newData = [...self.state.reply];
                const index = newData.findIndex(item => thing.key === item.key);

                const newReplyToMe = [...self.state.replyToMe];
                const index2 = newReplyToMe.findIndex(item => thing.key === item.key);

                self.deleteComment(thing);
                newData.splice(index,1);
                newReplyToMe.splice(index2,1);
                self.setState({
                    reply: newData,
                    replyTome: newReplyToMe
                });
                message.success("删除回复成功");
            },
            onCancel() {
                //do nothing
            },
        });
    };

    handleDeleteReplyToMe = (thing) => {
        let self = this;
        Modal.confirm({
            title: '是否删除?',
            content: '',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                const newData = [...self.state.replyToMe];
                const index = newData.findIndex(item => thing.key === item.key);

                const newReply = [...self.state.reply];
                const index2 = newReply.findIndex(item => thing.key === item.key);

                self.deleteComment(thing);
                newData.splice(index,1);
                newReply.splice(index2,1);
                self.setState({
                    replyToMe: newData,
                    reply: newReply,
                });
                message.success("删除回复成功");
            },
            onCancel() {
                //do nothing
            },
        });
    };

    detail = (showId) =>{
        browserHistory.push("/detail/"+showId);
    };

    render(){
        return (
            <div>
                <Tabs>
                    <TabPane tab="我的评论" key="1">
                        <List
                            size="large"
                            itemLayout='horizontal'
                            dataSource={this.state.comment}
                            footer={<a href="/"><b>find</b> more</a>}
                            loading={false}
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 4,
                            }}

                            renderItem={item => (
                                <List.Item
                                    key={item.key}
                                    actions={[
                                        <Icon type="edit" onClick={()=>this.handleEdit(item)}/>,
                                        <Icon type="delete" onClick={()=>this.handleDelete(item)}/>,
                                    ]}

                                >
                                    <List.Item.Meta
                                        align='left'
                                        avatar={<Image width={80} showId={item.showId}/>}
                                        title={<a onClick={()=>this.detail(item.showId)}>{item.title}</a>}
                                        description={
                                            <p>
                                                <Rate allowHalf disabled defaultValue={item.rate / 2} /><br/>
                                                {item.content}<br/><br/>
                                                {item.time}
                                            </p>
                                        }
                                    />
                                    {}
                                </List.Item>
                            )}
                        />
                    </TabPane>
                    <TabPane tab="我的回复" key="2">
                        <List
                            size="large"
                            itemLayout='horizontal'
                            dataSource={this.state.reply}
                            footer={<a href="/"><b>find</b> more</a>}
                            loading={false}
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 4,
                            }}

                            renderItem={item => (
                                <List.Item
                                    key={item.key}
                                    actions={[
                                        <Icon type="delete" onClick={()=>this.handleDeleteReply(item)}/>,
                                    ]}

                                >
                                    <List.Item.Meta
                                        align='left'
                                        avatar={<Image width={80} showId={item.showId}/>}
                                        title={<span>回复:&nbsp;{item.target}</span>}
                                        description={
                                            <p>
                                                {item.content}<br/><br/>
                                                <a style={{color:"#777777"}} onClick={()=>this.detail(item.showId)}>{item.title}</a><br/>
                                                {item.time}
                                            </p>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                    <TabPane tab="我收到的回复" key="3">
                        <List
                            size="large"
                            itemLayout='horizontal'
                            dataSource={this.state.replyToMe}
                            footer={<a href="/"><b>find</b> more</a>}
                            loading={false}
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 4,
                            }}

                            renderItem={item => (
                                <List.Item
                                    key={item.key}
                                    actions={[
                                        <Icon type="delete" onClick={()=>this.handleDeleteReplyToMe(item)}/>,
                                    ]}

                                >
                                    <List.Item.Meta
                                        align='left'
                                        avatar={<Image width={80} showId={item.showId}/>}
                                        title={<span>用户:&nbsp;{item.username}</span>}
                                        description={
                                            <p>
                                                {item.content}<br/><br/>
                                                <a style={{color:"#777777"}} onClick={()=>this.detail(item.showId)}>{item.title}</a><br/>
                                                {item.time}
                                            </p>
                                        }
                                    />
                                    {}
                                </List.Item>
                            )}
                        />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Comment;