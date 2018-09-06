import React, { Component } from 'react';
import { Card, Icon, Rate } from 'antd';

const data={
    name:'森林音乐会',
    time:'2018/6/8 19:30',
    location:'梅赛德斯奔驰文化中心',
    rate:4.5,
    img:'https://pimg.dmcdn.cn/perform/project/1551/155173_n.jpg'
};

class Sider extends Component{

    state={
        data: [],
        imgUrl: null
    };

    componentWillMount() {
        this.setState({
            data: this.props.data,
            imgUrl: this.props.imgUrl
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render(){
        const { Meta } = Card;

        return (
            <div>
                <Card
                    hoverable
                    style={{width: 240}}
                    cover={<img alt="example" src={this.state.imgUrl}/>}
                >
                    <Meta
                        title={this.state.data.title}
                        description={
                            <div>
                                <Icon type="environment"/>{" " + this.state.data.address}<br/>
                                <Icon type="calendar"/>
                                {" " + this.state.data.starttime + " - " + this.state.data.endtime}
                                <br/>
                                <Rate allowHalf disabled value={this.state.data.rate / 2}/>
                            </div>}
                    />
                </Card>
            </div>
        );
    }
}

export default Sider;