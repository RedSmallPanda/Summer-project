import React, { Component } from 'react';
import { Card, Icon, Rate, } from 'antd';

const data={
    name:'森林音乐会',
    time:'2018/6/8 19:30',
    location:'梅赛德斯奔驰文化中心',
    rate:4.5,
    img:'https://pimg.dmcdn.cn/perform/project/1551/155173_n.jpg'
};

class Sider extends Component{

    state={
        data:data
    };

    render(){
        const { Meta } = Card;

        return(
            <div>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={this.state.data.img} />}
                >
                    <Meta
                        title={this.state.data.name}
                        description={
                            <div>
                                <Icon type="environment" />{" "+this.state.data.location}<br/>
                                <Icon type="calendar" />{" "+this.state.data.time}<br/>
                                <Rate allowHalf disabled defaultValue={this.state.data.rate} />
                            </div>}
                    />
                </Card>
            </div>
        )
    }
}

export default Sider;