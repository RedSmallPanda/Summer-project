import React, { Component } from 'react';
import { Menu, Dropdown, List, Button, Icon, Rate } from 'antd';
import { browserHistory } from 'react-router'
import axios from 'axios';
const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://wiki.open.qq.com/wiki/website/API列表">
                <Icon type="qq" /> QQ
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                <Icon type="wechat" /> WeChat
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                <Icon type="weibo" /> weibo
            </a>
        </Menu.Item>
    </Menu>
);
const listData = [];
for (let i = 0; i < 10; i++) {
    listData.push({
        key: i,
        image: 'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',//image
        title: `jpw ${i}`,//name
        start: "2018/07/02",
        end: `2018/07/${(7 + i) < 10 ? `0${7 + i}` : 7 + i}`,
        address: "SE 3-101",
        grade: 4.5,
        description: 'description',
        stock: 0,
        heart: true,
        comments: i,
        price: 99.99,
        city: "sh",
    });
}

let IconText = ({ type, text, onClick}) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} onClick={onClick}/>
        {text}
  </span>
);
class ResultList extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            data: []
        };

        this.cancelHeart = this.cancelHeart.bind(this);
        this.judgeDate = this.judgeDate.bind(this);
        this.detail = this.detail.bind(this);
        this.getResult = this.getResult.bind(this);
    }

    // POST to get data and filter
    getResult(self, prop) {
        axios.get("http://localhost:8080/shows", {
            params: {
                city: prop.filter.city,
                type: prop.filter.type,
                time: prop.filter.time,
                search: prop.filter.search,
            }
        })
            .then(function (response) {
                console.log(response);
                alert(JSON.stringify(response.data[0]));
                self.setState({
                    loading: false,
                    data: listData,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidMount(){
        this.getResult(this, this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.getResult(this, nextProps);
    }

    //todo: do cancel in database
    cancelHeart(e) {
        e.preventDefault();
        let title = e.target.parentNode.parentNode.parentNode.parentNode
            .firstChild.firstChild.nextSibling.firstChild.firstChild.innerHTML;
        listData.forEach(function (item) {
            if(item.title===title){
                item.heart = !item.heart;
            }
        });
        this.setState({
            data: listData,
        });
    }

    //judge out-of-date
    //todo: judge by exact time
    judgeDate(end){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let currentDate = year + "/" + (month < 10 ? "0" : "") + month + "/" + (day < 10 ? "0" : "") + day;
        return currentDate < end;
    }

    detail(e){
        e.preventDefault();
        // alert(e.target.parentNode.parentNode.parentNode.parentNode
        //     .firstChild.firstChild.nextSibling.firstChild.firstChild.innerHTML);
        browserHistory.push({
            pathname:"/detail",
        });
    }
    comment(e){
        e.preventDefault();
        // alert(e.target.parentNode.parentNode.parentNode.parentNode
        //     .firstChild.firstChild.nextSibling.firstChild.firstChild.innerHTML);
        browserHistory.push({
            pathname:"/detail",
        });
    }

    render(){
        // alert("ResultList: "+this.props.filter.search);
        return (
            <div>
                <List
                    size="large"
                    itemLayout='horizontal'
                    dataSource={this.state.data}
                    footer={<a href="/"><b>find</b> more</a>}
                    loading={this.state.loading}
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}

                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText type={item.heart ? "heart" : "heart-o"} onClick={this.cancelHeart}/>,
                                <IconText type="message" text={item.comments} onClick={this.comment}/>,
                                <Dropdown overlay={menu} placement="bottomRight">
                                    <Icon type="share-alt" />
                                </Dropdown>,
                            ]}
                        >
                            <List.Item.Meta
                                align='left'
                                avatar={<img width={120} alt="logo" src={item.image} onClick={this.detail}/>}
                                title={<a onClick={this.detail}>{item.title}</a>}
                                description={
                                    <p>
                                        {item.description}<br/><br/>
                                        <Icon type="calendar"/>{" " + item.start + "-" + item.end}<br/>
                                        <Icon type="environment"/>{" " + item.address}<br/>
                                        <Rate disabled allowHalf defaultValue={item.grade} /><br/>
                                    </p>
                                }
                            />
                            {
                                <div>
                                    <h3><b>{"￥" + item.price}</b>{" 起"}</h3>
                                    <Button type={this.judgeDate(item.end) && item.stock ? "primary" : "dashed"}
                                            size="large"
                                            onClick={this.detail}
                                    >{
                                        this.judgeDate(item.end) ? (item.stock ? "购买" : "售罄") : "过期"
                                    }</Button>
                                </div>
                            }
                        </List.Item>
                    )}
                />
                <br/><br/><br/>
            </div>
        );
    }
}

ResultList.defaultProps = {
    filter: {
        city: "all",
        type: "all",
        time: "all",
        search: "",
    },
    type: "default",
};
export default ResultList;
