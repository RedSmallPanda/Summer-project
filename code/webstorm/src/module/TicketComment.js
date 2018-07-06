import React, { Component } from 'react';
import { List, Button, Icon, BackTop, Rate, Avatar, Spin } from 'antd';

const comments = [];
for (let i = 0; i < 100; i++) {
    comments.push({
        key: i,
        image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//ticket image
        username: `jpw user ${i}`,//ticket name
        time: "2018/07/02",
        content: 'comment',
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
                                <IconText type={item.like ? "like" : "like-o"} text={item.likes} onClick={this.cancelLike}/>,
                                <IconText type="message" text={item.comments}/>
                            ]}
                        >
                            <List.Item.Meta
                                align='left'
                                avatar={<Avatar size='large' src={item.image}/>}
                                title={
                                    <a>{item.username}</a>
                                }
                                description={
                                    <p>
                                        <Rate disabled defaultValue={item.grade}/><br/>
                                        {item.content}<br/><br/>
                                        {item.time}
                                    </p>
                                }
                            />
                        </List.Item>
                    )}
                />
                <p>footer</p>
                <br/><br/><br/>
            </div>
        );
    }
}

export default TicketComment;