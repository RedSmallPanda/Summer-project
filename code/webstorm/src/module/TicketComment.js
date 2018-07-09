import React, { Component } from 'react';
import { List, Icon, Rate, Avatar, Button} from 'antd';
import { hashHistory } from 'react-router';

const comments = [];
for (let i = 0; i < 100; i++) {
    comments.push({
        key: i,
        image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//ticket image
        username: `jpw user ${i}`,//ticket name
        time: "2018/07/02",
        content: 'commentssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss' +
        'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
        like: false,
        likes: i + 1,
        comments: i,
        grade: i % 5,
    });
}

let IconText = ({ type, text, onClick}) => (
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
            data: comments,
        };
        this.cancelLike = this.cancelLike.bind(this);
        this.detailComment = this.detailComment.bind(this);
    }
    detailComment(e){
        e.preventDefault();
        hashHistory.push({pathname: '/commentPage'});
    }
    cancelLike(e) {
        e.preventDefault();
        let username = e.target.parentNode.parentNode.parentNode.parentNode
            .firstChild.firstChild.nextSibling.firstChild.firstChild.innerHTML;
        comments.forEach(function (item) {
            if(item.username===username){
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

    render(){
        return (
            <div>
                <br/>
                <List
                    itemLayout='horizontal'
                    dataSource={this.state.data}
                    loading={false}
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 4,
                    }}

                    renderItem={item => (
                        <List.Item
                            key={item.username}
                            actions={[
                                <IconText type={item.like ? "like" : "like-o"} text={item.likes}
                                          onClick={this.cancelLike}/>,
                                <IconText type="message" text={item.comments}/>
                            ]}
                        >
                            <List.Item.Meta
                                align='left'
                                avatar={<Avatar size='large' src={item.image}/>}
                                title={
                                    <a onClick={this.detailComment}>{item.username}</a>
                                }
                                description={
                                    <div>
                                        <Rate disabled defaultValue={item.grade}/><br/>
                                        {item.content}<br/><br/>
                                        {item.time}
                                    </div>
                                }
                            />
                            {"content"}
                        </List.Item>
                    )}
                />
                <Button onClick={this.detailComment}>发表我的评论</Button>
                <br/><br/><br/>
            </div>
        );
    }
}

export default TicketComment;