import React, { Component } from 'react';
import { Menu, Row, Col, Carousel,Card, Icon,Avatar } from 'antd'
import '../css/App.css'
import { hashHistory} from 'react-router'

const { Meta } = Card;

class HomePage extends Component{

    handleDirectory = (e) =>{
        hashHistory.push({
            pathname:'/dir/'+e.key
        });
    };

    render(){
        const homeBar =
            <div>
                <Menu>
                    <Menu.Item key="concert" onClick={this.handleDirectory}>演唱会</Menu.Item>
                    <Menu.Item key="music" onClick={this.handleDirectory}>音乐会</Menu.Item>
                    <Menu.Item key="cnopera" onClick={this.handleDirectory}>曲苑杂坛</Menu.Item>
                    <Menu.Item key="opera" onClick={this.handleDirectory}>话剧歌剧</Menu.Item>
                    <Menu.Item key="sports" onClick={this.handleDirectory}>体育比赛</Menu.Item>
                    <Menu.Item key="dance" onClick={this.handleDirectory}>舞蹈芭蕾</Menu.Item>
                    <Menu.Item key="comic" onClick={this.handleDirectory}>动漫游戏</Menu.Item>
                </Menu>
            </div>;

        const homeCarousel =
            <div style={{marginTop:20}}>
                <Carousel autoplay effect="fade">
                    <div><img src="https://img.piaoniu.com/banner/5860c8c8158e6eed07d32785a3cf8a0015bdcc84.jpg&quot"/></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
            </div>;

        const homeRecommend =
            <div style={{marginTop:10}}>
                <div>
                    <Row type="flex" justify="space-around">
                        <Col span={4}>
                            <Card
                                style={{ width: 200 }}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                            >
                                <Meta
                                    title="Ticket title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card
                                style={{ width: 200 }}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                            >
                                <Meta
                                    title="Ticket title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card
                                style={{ width: 200 }}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                            >
                                <Meta
                                    title="Ticket title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card
                                style={{ width: 200 }}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                            >
                                <Meta
                                    title="Ticket title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card
                                style={{ width: 200 }}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                            >
                                <Meta
                                    title="Ticket title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>

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
                        <div style={{marginTop:20}}><h3>今日推荐</h3></div><br/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {homeRecommend}
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