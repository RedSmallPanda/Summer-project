import React, { Component } from 'react';
import { List,  Icon,  Rate, Tabs} from 'antd';
import {browserHistory} from "react-router";
import axios from 'axios'
import Cookies from "js-cookie"

const TabPane = Tabs.TabPane;

const comments = [];
for (let i = 0; i < 10; i++) {
    comments.push({
        key: i,
        href: 'http://ant.design',//detail info
        image: 'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',//ticket image
        title: `jpw ${i}`,//ticket name
        time: "2018/07/02",
        content: 'comment',
        like: false,
        likes: i + 1,
        comments: i,
        rate: i % 5,
    });
}

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
            data: comments,
        };
        this.cancelLike = this.cancelLike.bind(this);
        this.detail = this.detail.bind(this);
    }

    getResult(self) {
        axios.get("/myComments",{
            params:{
                showId:1,
                username:Cookies.get('username')
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

    cancelLike(e) {
        e.preventDefault();
        let title = e.target.parentNode.parentNode.parentNode.parentNode
            .firstChild.firstChild.nextSibling.firstChild.firstChild.innerHTML;
        comments.forEach(function (item) {
            if(item.title===title){
                if (true){//after modify database successfully
                    item.like = !item.like;
                    item.likes += (item.like ? 1 : -1);
                }
            }
        });
        this.setState({
            data: comments,
        });
    }
    detail(e){
        e.preventDefault();
        alert(e.target.innerHTML);
        browserHistory.push("/detail");
    }
    render(){
        return (
            <div>
                <Tabs>
                    <TabPane tab="评论" key="1">
                        <List
                            size="large"
                            itemLayout='horizontal'
                            dataSource={this.state.data}
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
                                                <Rate allowHalf defaultValue={item.rate}/><br/>
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
                    <TabPane tab="回复" key="2"/>
                </Tabs>
            </div>
        );
    }
}

export default Comment;