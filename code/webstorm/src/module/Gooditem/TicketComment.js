import React, {Component} from "react";
import {Avatar, Button, Col, Collapse, Icon, Input, List, Rate, Row, message, Divider} from "antd";
import {browserHistory} from "react-router";
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const Panel = Collapse.Panel;
const { TextArea } = Input;

// for (let i = 0; i < 100; i++) {
//     comments.push({
//         key: i,
//         image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//ticket image
//         username: `jpw user ${i}`,//ticket name
//         time: "2018/07/02",
//         content: 'commentssssssssssssssssssssssssssssssssssssssssss',
//         like: false,
//         likes: i + 1,
//         comments: i,
//         rate: i % 5,
//         parentId: -1,
//     });
// }

const replyBar = <TextArea rows={2}/>;

let data = [{
    commentId:1,
    parentId:-1,
    content:"test",
    rate:10,
    username:"user1",
    showId:1,
    time:'Jul 18, 2018 5:50:10 AM',
    replyCount:0,
    reply:[],
    replyBar:<TextArea rows={2}/>,
}];

let IconText = ({ type, text, onClick }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} onClick={onClick}/>
        {text}
  </span>
);

class TicketComment extends Component {
    constructor(props){
        super(props);
        if (true);//POST to get data
        this.state = {
            comment:data,
            value:""
        };
        this.cancelLike = this.cancelLike.bind(this);
        this.detailComment = this.detailComment.bind(this);
    }

    getResult(self) {
        axios.get("/comments",{
            params:{
                showId:1
            }
        })
            .then(function (response) {
                console.log(response);
                self.handleData(response.data);
                self.setState({
                    loading: false,
                    comment: data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };



    handleValue = (e) =>{
        this.setState({
            value:String(e.target.parentNode.parentNode.firstChild.nextSibling.firstChild.value)
        });
        console.log(String(e.target.parentNode.parentNode.firstChild.nextSibling.firstChild.value))
    };

    addComment = (item) =>{
        let params = new URLSearchParams();
        let username = Cookies.get('username');
        let time = moment().format('YYYY-MM-DD hh:mm:ss');
        let content = this.state.value;

        params.append('purpose',"add");
        params.append('showId',item.showId);
        params.append('username', username);
        params.append('parentId',item.commentId);
        params.append('content',content);
        params.append('rate',-1);
        params.append('time',time);
        axios.post('/addComment', params);
        this.sendComment(item);
    };

    addReply = (item, thing) =>{
        let params = new URLSearchParams();
        let username = Cookies.get('username');
        let time = moment().format('YYYY-MM-DD hh:mm:ss');
        let content = "@" + thing.username+": " + this.state.value;

        params.append('purpose',"add");
        params.append('showId',item.showId);
        params.append('username', username);
        params.append('parentId',item.commentId);
        params.append('content',content);
        params.append('rate',-1);
        params.append('time',time);
        axios.post('/addComment', params);
        this.sendSmallComment(item,thing);
    };

    componentDidMount(){
        this.getResult(this);
    }

    handleData = (commentData) =>{
        for(let i = 0; i < commentData.length; i++){
           if(commentData[i].replyCount > 0){
               let reply = commentData[i].reply;
               for(let j = 0; j < reply.length; j++){
                   commentData[i].reply[j].smallBar = replyBar;
                   commentData[i].reply[j].showSmallBar = false;
               }
           }
            commentData[i].replyBar = replyBar;
            commentData[i].showReplyBar = false;
        }
        data = commentData;
    };

    detailComment =(e) =>{
        e.preventDefault();
        browserHistory.push({
            pathname: '/commentPage',
            state:{
                purpose: "add",
                showId:1
            }
        });
    };

    cancelLike(e) {
        e.preventDefault();
        let username = e.target.parentNode.parentNode.parentNode.parentNode
            .firstChild.firstChild.nextSibling.firstChild.firstChild.innerHTML;
        data.forEach(function (item) {
            if(item.username===username){
                if (true){//after modify database successfully
                    item.like = !item.like;
                    item.likes += (item.like ? 1 : -1);
                }
            }
        });
        this.setState({
            comment: data,
        });
    };

    showReplyBar = (item) =>{
        for(let i = 0; i < data.length; i++){
            if(data[i].commentId === item.commentId){
                data[i].showReplyBar = !item.showReplyBar;
            }
            else {
                data[i].showReplyBar = false;
            }
            for(let j = 0; j < data[i].replyCount; j++){
                data[i].reply[j].showSmallBar = false;
            }
        }
        this.setState({
            comment:data
        })
    };

    showSmallBar = (item,thing) =>{
        for(let i = 0; i < data.length; i++){
            if(data[i].commentId === item.commentId){
                let thisReply = data[i].reply;
                for(let j = 0; j < data[i].replyCount; j++){
                    if(thisReply[j].commentId === thing.commentId){
                        data[i].reply[j].showSmallBar = !thing.showSmallBar;
                    }
                    else
                        data[i].reply[j].showSmallBar = false;
                }
                data[i].showReplyBar = false;
            }
            else
                data[i].showReplyBar = false;
        }
        this.setState({
            comment:data
        })
    };

    refresh = () =>{
        window.location.reload()
    };

    sendComment = (item) =>{
        message.success("发表成功",1,this.refresh);
        this.showReplyBar(item);
    };

    sendSmallComment = (item,thing) =>{
        message.success("发表成功",1,this.refresh);
        this.showSmallBar(item,thing);
    };

    render(){
        return (
            <div>
                <br/>
                <List

                    itemLayout='horizontal'
                    dataSource={this.state.comment}
                    loading={false}
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 4,
                    }}
                    locale="暂无评论"
                    renderItem={item => (
                    <div>
                        <List.Item
                            style={{border:'0px'}}
                            key={item.username}
                            actions={[
                                <IconText type="like-o"/>,
                                <IconText type="message" text={item.replyCount} onClick={() => {this.showReplyBar(item)}}/>
                            ]}
                        >
                            <List.Item.Meta
                                align='left'
                                avatar={<Avatar size='large' icon="user"/>}
                                title={<span>{item.username}</span>}
                                description={
                                    <div>
                                        <Rate disabled allowHalf defaultValue={item.rate/2}/><br/>
                                        {item.content}<br/><br/>
                                    </div>
                                }
                            />
                            {item.time}
                        </List.Item>
                        {item.showReplyBar ? <div>
                            <Row>
                                <Col span={1}/>
                                <span>回复&nbsp;{item.username}:</span>
                            </Row>
                            <Row>
                                <Col span={1}/>
                                <Col span={19}>
                                    {item.replyBar}
                                </Col>
                                <Col span={1}/>
                                <Col span={2}>
                                    <Row style={{height:'18px'}}/>
                                    <Button type="primary" onMouseUp={() =>{this.addComment(item)}} onMouseDown={this.handleValue}>发表回复</Button>
                                </Col>
                            </Row>
                        </div> : (<div/>)}
                        {item.replyCount > 0 ? (
                            <Collapse bordered={false}>
                                <Panel header="查看回复" key="1" style={{border:'0px'}}>
                                    <Row>
                                        <Col span={1}/>
                                        <Col span={22}>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={item.reply}
                                                renderItem={thing => (
                                                    <div>
                                                        <List.Item
                                                            style={{border:'0px'}}
                                                            actions={[
                                                                <Icon type="like-o"/>,
                                                                <Icon type="message" onClick={() => {this.showSmallBar(item,thing)}}/>
                                                            ]}
                                                        >
                                                            <List.Item.Meta
                                                                avatar={<Avatar icon="user" />}
                                                                title={<span>{thing.username}</span>}
                                                                description={thing.content}
                                                            />
                                                            {thing.time}
                                                        </List.Item>
                                                        {thing.showSmallBar ? <div>
                                                            <Row>
                                                                <Col span={1}/>
                                                                <span>回复&nbsp;{thing.username}:</span>
                                                            </Row>
                                                            <Row>
                                                                <Col span={1}/>
                                                                <Col span={19}>
                                                                    {thing.smallBar}
                                                                </Col>
                                                                <Col span={1}/>
                                                                <Col span={2}>
                                                                    <Row style={{height:'18px'}}/>
                                                                    <Button type="primary" onMouseUp={() =>{this.addReply(item,thing)}} onMouseDown={this.handleValue}>发表回复</Button>
                                                                </Col>
                                                            </Row>
                                                        </div> : (<div/>)}
                                                    </div>
                                                )}
                                            />
                                        </Col>
                                    </Row>
                                </Panel>
                            </Collapse>
                        ):(
                            <div/>
                        )}
                        <Divider/>
                    </div>
                    )}
                />
                <Button onClick={this.detailComment}>发表我的评论</Button>
                <br/><br/><br/>
            </div>
        );
    }
}

export default TicketComment;