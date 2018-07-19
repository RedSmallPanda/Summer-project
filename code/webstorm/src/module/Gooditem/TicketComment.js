import React, {Component} from "react";
import {Avatar, Button, Col, Collapse, Icon, Input, List, Rate, Row, message} from "antd";
import {browserHistory} from "react-router";
import axios from 'axios';

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

const replyBar = <div>
    <Row>
        <Col span={1}/>
        <Col span={22}>
            <TextArea rows={2}/>
        </Col>
    </Row>
</div>;

let data = [{
    commentId:'',
    parentId:'',
    content:'',
    rate:'',
    userId:'',
    ticketId:'',
    time:'',
    replyCount:'',
    reply:[]
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
            comment:[],
        };
        this.cancelLike = this.cancelLike.bind(this);
        this.detailComment = this.detailComment.bind(this);
    }

    getResult(self, prop) {
        axios.get("http://localhost:8080/comments")
            .then(function (response) {
                console.log(response);
                alert(JSON.stringify(response.data));
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

    componentDidMount(){
        this.getResult(this, this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.getResult(this, nextProps);
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

    detailComment(e){
        e.preventDefault();
        browserHistory.push({
            pathname: '/commentPage'
        });
    }
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

    sendComment = (item) =>{
        message.success("发表成功",2);
        this.showReplyBar(item);
    };

    sendSmallComment = (item,thing) =>{
        message.success("发表成功",2);
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
                            key={item.userId}
                            actions={[
                                <IconText type="like-o"/>,
                                <IconText type="message" text={item.replyCount} onClick={() => {this.showReplyBar(item)}}/>
                            ]}
                        >
                            <List.Item.Meta
                                align='left'
                                avatar={<Avatar size='large' icon="user"/>}
                                title={<span>{item.userId}</span>}
                                description={
                                    <div>
                                        <Rate disabled allowHalf defaultValue={item.rate/2}/><br/>
                                        {item.content}<br/><br/>
                                    </div>
                                }
                            />
                            {item.time}
                        </List.Item>
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
                                                                title={<span>{thing.userId}</span>}
                                                                description={thing.content}
                                                            />
                                                            {thing.time}
                                                        </List.Item>
                                                        {thing.showSmallBar ? <div>
                                                            <Row>
                                                                <Col span={1}/>
                                                                <span>回复&nbsp;{thing.userId}:</span>
                                                            </Row>
                                                            {thing.smallBar}
                                                            <Row>
                                                                <br/>
                                                                <Col span={20}/>
                                                                <Col span={2}>
                                                                    <Button type="primary" onClick={() => {this.sendSmallComment(item,thing)}}>发表回复</Button>
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
                        {item.showReplyBar ? <div>
                            <Row>
                                <Col span={1}/>
                                <span>回复&nbsp;{item.userId}:</span>
                            </Row>
                            {item.replyBar}
                            <Row>
                                <br/>
                                <Col span={20}/>
                                <Col span={2}>
                                    <Button type="primary" onClick={() => {this.sendComment(item)}}>发表回复</Button>
                                </Col>
                            </Row>
                        </div> : (<div/>)}
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