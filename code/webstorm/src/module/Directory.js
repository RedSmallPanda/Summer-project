import React, { Component } from 'react';
import { Row, Col, Radio, Menu } from 'antd'
import '../css/App.css'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class Directory extends Component {
    state = {
        city:'',
        type:'',
        time:'',
    };


    render() {
        return (
            <div>
                <Row>
                    <Col span={4}/>
                    <Col span={16}>
                        <div className='selectBar' style={{ marginTop: 16,width:800}}>
                            <RadioGroup defaultValue="a">
                                <span>选择城市：</span>
                                <RadioButton value="a">全部</RadioButton>
                                <RadioButton value="b">杭州</RadioButton>
                                <RadioButton value="c">上海</RadioButton>
                                <RadioButton value="d">北京</RadioButton>
                                <RadioButton value="e">成都</RadioButton>
                            </RadioGroup>
                        </div>
                        <br/>
                        <div className='selectBar' style={{ marginTop: 16,width:800 }}>
                            <RadioGroup defaultValue="a">
                                <span>选择分类：</span>
                                <RadioButton value="a">全部</RadioButton>
                                <RadioButton value="b">演唱会</RadioButton>
                                <RadioButton value="c">音乐会</RadioButton>
                                <RadioButton value="d">曲苑杂坛</RadioButton>
                                <RadioButton value="f">话剧歌剧</RadioButton>
                                <RadioButton value="g">体育比赛</RadioButton>
                                <RadioButton value="h">舞蹈芭蕾</RadioButton>
                                <RadioButton value="i">动漫游戏</RadioButton>
                            </RadioGroup>
                        </div>
                        <br/>
                        <div className='selectBar' style={{ marginTop: 16,width:800 }}>
                            <RadioGroup defaultValue="a">
                                <span>选择时间：</span>
                                <RadioButton value="a">全部</RadioButton>
                                <RadioButton value="b">今天</RadioButton>
                                <RadioButton value="c">明天</RadioButton>
                                <RadioButton value="d">本周</RadioButton>
                                <RadioButton value="e">本月</RadioButton>
                            </RadioGroup>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Directory;