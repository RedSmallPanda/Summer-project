import React, { Component } from 'react';
import { Card, Icon, Rate } from 'antd';
import Image from "./Image";

// const data={
//     name:'森林音乐会',
//     time:'2018/6/8 19:30',
//     location:'梅赛德斯奔驰文化中心',
//     rate:4.5,
//     img:'https://pimg.dmcdn.cn/perform/project/1551/155173_n.jpg'
// };

class Sider extends Component{

    state={
        data: [],
        showId: null
    };

    componentWillMount() {
        this.setState({
            data: this.props.data,
            showId: this.props.showId
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
                    cover={<Image width={240} showId={this.props.showId}/>}
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