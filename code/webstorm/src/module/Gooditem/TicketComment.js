import React, { Component } from 'react';
import { List, Icon, Rate, Avatar, Button, Collapse, Row, Col} from 'antd';
import { browserHistory } from 'react-router';

const Panel = Collapse.Panel;

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
//         grade: i % 5,
//         parentId: -1,
//     });
// }

const data = [{
    key:1,
    username:`user1`,
    time: "2018/07/17 9:40",
    content:"This is the 1st comment",
    like:false,
    likes:1,
    grade:5,
    reply:[{
        key: 6,
        username: `user6`,
        time: "2018/07/17 14:42",
        content: "This is the 6th comment",
        like: false,
        likes: 1,
    },{
        key: 8,
        username: `user8`,
        time: "2018/07/17 14:50",
        content: "This is the 8th comment",
        like: false,
        likes: 1,
    }]
},{
    key:2,
    username:`user2`,
    time: "2018/07/17 10:20",
    content:"This is the 2nd comment",
    like:false,
    likes:1,
    grade:5,
    reply:[{
        key:7,
        username:`user7`,
        time: "2018/07/17 11:42",
        content:"This is the 7th comment",
        like:false,
        likes:1,
    }]
},{
    key:3,
    username:`user3`,
    time: "2018/07/17 11:42",
    content:"This is the 3rd comment",
    like:false,
    likes:1,
    grade:5,
    reply:[],
},{
    key:4,
    username:`user4`,
    time: "2018/07/17 14:42",
    content:"This is the 4th comment",
    like:false,
    likes:1,
    grade:5,
    reply:[],
},{
    key:5,
    username:`user5`,
    time: "2018/07/17 18:42",
    content:"This is the 5th comment",
    like:false,
    likes:1,
    grade:5,
    reply:[],
},{
    key:9,
    username:`user7`,
    time: "2018/07/17 20:42",
    content:"This is the 7th comment",
    like:false,
    likes:1,
    grade:5,
    reply:[],
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
            comment: data,
            display:false,
            replyKey:-1,
        };
        this.cancelLike = this.cancelLike.bind(this);
        this.detailComment = this.detailComment.bind(this);
    }

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
    }

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
                            id={item.key}
                            style={{border:'0px'}}
                            key={item.username}
                            actions={[
                                <IconText type={item.like ? "like" : "like-o"} text={item.likes}/>,
                                <IconText type="message" text={item.reply.length}/>
                            ]}
                        >
                            <List.Item.Meta
                                align='left'
                                avatar={<Avatar size='large' icon="user"/>}
                                title={<span>{item.username}</span>}
                                description={
                                    <div>
                                        <Rate disabled defaultValue={item.grade}/><br/>
                                        {item.content}<br/><br/>
                                    </div>
                                }
                            />
                            {item.time}
                        </List.Item>
                        {item.reply.length > 0 ? (
                            <Collapse bordered={false}>
                                <Panel header="查看回复" key="1">
                                    <Row>
                                        <Col span={1}/>
                                        <Col span={22}>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={item.reply}
                                                renderItem={item => (
                                                    <div>
                                                        <List.Item
                                                            id={item.key}
                                                            actions={[
                                                                <Icon type="like-o"/>,
                                                                <Icon type="message"/>
                                                            ]}
                                                        >
                                                            <List.Item.Meta
                                                                avatar={<Avatar icon="user" />}
                                                                title={<span>{item.username}</span>}
                                                                description={item.content}
                                                            />
                                                            {item.time}
                                                        </List.Item>
                                                    </div>

                                                )}
                                            />
                                        </Col>
                                    </Row>
                                </Panel>
                            </Collapse>
                        ):(
                            <div></div>
                        )}

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