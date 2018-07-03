import React, { Component } from 'react';
import { Menu, Row, Col, Carousel } from 'antd'
import '../css/App.css'

const SubMenu = Menu.SubMenu;

class HomePage extends Component{

    render(){
        const homeBar =
            <div>
                <Menu>
                    <Menu.Item key="1">演唱会</Menu.Item>
                    <Menu.Item key="2">音乐会</Menu.Item>
                    <Menu.Item key="3">曲苑杂坛</Menu.Item>
                    <Menu.Item key="4">话剧歌剧</Menu.Item>
                    <Menu.Item key="5">体育比赛</Menu.Item>
                    <Menu.Item key="6">舞蹈芭蕾</Menu.Item>
                    <Menu.Item key="7">动漫游戏</Menu.Item>
                </Menu>
            </div>;

        const homeCarousel =
            <div style={{marginTop:20}}>
                <Carousel autoplay effect="fade">
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
            </div>;

        const homeRecommend =
            <div style={{marginTop:20}}>
                <div><h3>今日推荐</h3></div>
            </div>;

        const homeContainer =
            <div>
                <Row>
                    <Col span={4}>
                        {homeBar}
                    </Col>
                    <Col span={1}/>
                    <Col span={18}>
                        {homeCarousel}
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        {homeRecommend}
                    </Col>
                </Row>
            </div>;

        return(
            homeContainer
        )
    }
}

export default HomePage;