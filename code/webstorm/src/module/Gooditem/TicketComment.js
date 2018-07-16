import React, { Component } from 'react';
import { List, Icon, Rate, Avatar, Button, Collapse, Divider, Row, Col} from 'antd';
import { browserHistory } from 'react-router';

const Panel = Collapse.Panel;
const comments = [];
for (let i = 0; i < 100; i++) {
    comments.push({
        key: i,
        image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",//ticket image
        username: `jpw user ${i}`,//ticket name
        time: "2018/07/02",
        content: 'commentssssssssssssssssssssssssssssssssssssssssss',
        like: false,
        likes: i + 1,
        comments: i,
        grade: i % 5,
    });
}

const reply = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

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
            data: comments,
            reply:reply,
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
                    <div>
                        <List.Item
                            style={{border:'0px'}}
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
                                title={item.username}
                                description={
                                    <div>
                                        <Rate disabled defaultValue={item.grade}/><br/>
                                        {item.content}<br/><br/>
                                        {item.time}
                                    </div>
                                }
                            />
                        </List.Item>
                        <Collapse bordered={false}>
                            <Panel header="查看回复" key="1" onC>
                                <Row>
                                    <Col span={1}/>
                                    <Col span={22}>
                                        <div>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={this.state.reply}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <List.Item.Meta
                                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                            title={<a>{item.title}</a>}
                                                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                                        />
                                                    </List.Item>
                                                )}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
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