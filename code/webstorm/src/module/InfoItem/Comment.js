import React, { Component } from 'react';
import { List,  Icon,  Rate, Tabs, Modal} from 'antd';
import {browserHistory} from "react-router";
import axios from 'axios'
import Cookies from "js-cookie"

const TabPane = Tabs.TabPane;

let data = [];
let reply = [];
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

let IconText = ({ type, text, onClick}) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} onClick={onClick}/>
        {text}
  </span>
);

class Comment extends Component {
    constructor(props){
        super(props);
        if (true);//POST to get data
        this.state = {
            comment: data,
        };
        this.cancelLike = this.cancelLike.bind(this);
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

    componentDidMount(){
        this.getResult(this);
    }

    handleData = (commentData) =>{
        // for(let i = 0; i < commentData.length; i++){
        //     if(commentData[i].replyCount > 0){
        //         let reply = commentData[i].reply;
        //         for(let j = 0; j < reply.length; j++){
        //             commentData[i].reply[j].smallBar = replyBar;
        //             commentData[i].reply[j].showSmallBar = false;
        //         }
        //     }
        //     commentData[i].replyBar = replyBar;
        //     commentData[i].showReplyBar = false;
        // }
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

        console.log("reply: " + this.state.reply);
        console.log("comment: " + this.state.comment);
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
                console.log("length: "+newData.length);
                self.setState({
                    comment: newData
                })
            },
            onCancel() {
                //do nothing
            },
        });
    };

    cancelLike(e) {
        e.preventDefault();
        let title = e.target.parentNode.parentNode.parentNode.parentNode
            .firstChild.firstChild.nextSibling.firstChild.firstChild.innerHTML;
        data.forEach(function (item) {
            if(item.title===title){
                if (true){//after modify database successfully
                    item.like = !item.like;
                    item.likes += (item.like ? 1 : -1);
                }
            }
        });
        this.setState({
            comment: data,
        });
    }
    detail = (e) =>{
        e.preventDefault();
        alert(e.target.innerHTML);
        browserHistory.push("/detail");
    };

    render(){
        return (
            <div>
                <Tabs>
                    <TabPane tab="评论" key="1">
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
                                    key={item.title}
                                    actions={[
                                        <Icon type="edit" onClick={()=>this.handleEdit(item)}/>,
                                        <Icon type="delete" onClick={()=>this.handleDelete(item)}/>,
                                        <IconText type={item.like ? "like" : "like-o"} text={item.likes} onClick={this.cancelLike}/>,
                                        <IconText type="message" text={item.comments}/>,
                                    ]}

                                >
                                    <List.Item.Meta
                                        align='left'
                                        avatar={<img width={80} alt="logo" src={item.image}/>}
                                        title={<a onClick={this.detail}>{item.title}</a>}
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
                    <TabPane tab="回复" key="2">
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
                                    key={item.title}
                                    actions={[
                                        <Icon type="edit" />,
                                        <Icon type="delete" />,
                                        <IconText type={item.like ? "like" : "like-o"} text={item.likes} onClick={this.cancelLike}/>,
                                        <IconText type="message" text={item.comments}/>,
                                    ]}

                                >
                                    <List.Item.Meta
                                        align='left'
                                        avatar={<img width={80} alt="logo" src={item.image}/>}
                                        title={<a onClick={this.detail}>{item.title}</a>}
                                        description={
                                            <p>
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
                </Tabs>
            </div>
        );
    }
}

export default Comment;