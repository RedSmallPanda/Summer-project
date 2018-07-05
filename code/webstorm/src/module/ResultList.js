import React, { Component } from 'react';
import { List, Button, Icon, BackTop, Rate } from 'antd';
const listData = [];
for (let i = 0; i < 10; i++) {
    listData.push({
        href: 'http://ant.design',//detail info
        image: 'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',//image
        title: `jpw ${i}`,//name
        start: "2018/07/02",
        end: "2018/07/27",
        address: "SE 3-101",
        grade: 4.5,
        description: 'description',
        stock: i,
        heart: true,
        comments: i,
        price: 99.99
    });
}

let IconText = ({ type, text, onClick}) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} onClick={onClick}/>
        {text}
  </span>
);
class ResultList extends Component {
    constructor(){
        super();
        this.state = {
            data: listData,
        };
        this.cancelHeart = this.cancelHeart.bind(this);
        this.judgeDate = this.judgeDate.bind(this);
    }
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
    judgeDate(end){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let currentDate = year + "/" + (month < 10 ? "0" : "") + month + "/" + (day < 10 ? "0" : "") + day;
        return currentDate < end;
    }

    render(){
        return (
            <div>
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
                        pageSize: 8,
                    }}

                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText type={item.heart ? "heart" : "heart-o"} onClick={this.cancelHeart}/>,
                                <IconText type="message" text={item.comments}/>
                            ]}
                        >
                            <List.Item.Meta
                                align='left'
                                avatar={<img width={120} alt="logo" src={item.image}/>}
                                title={<a href={item.href}>{item.title}</a>}
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
                                            size="large">{
                                        this.judgeDate(item.end) ? (item.stock ? "购买" : "售罄") : "过期"
                                    }</Button>
                                </div>
                            }
                        </List.Item>
                    )}
                />
                <BackTop/>
            </div>
        );
    }
}

export default ResultList;
