import React, { Component } from 'react';
import { Row, Col, Radio } from 'antd'
import '../../css/App.css'
import ResultList from "./ResultList";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class Directory extends Component {
    state = {
        city:"all",
        type:"all",
        time:"all",
    };

    componentWillMount() {
        this.setState({
            type: this.props.params.type
        })
    };

    handleCity = (e) =>{
        this.setState({
            city:e.target.value
        })
    };

    handleType = (e) =>{
        this.setState({
            type:e.target.value
        })
    };

    handleTime = (e) =>{
        this.setState({
            time:e.target.value
        })
    };


    render() {
        return (
            <div>
                <Row>
                    <Col span={4}/>
                    <Col span={16}>
                        <div align="left">
                        <div className='selectBar' style={{ marginTop: 16}}>
                            <RadioGroup defaultValue={this.state.city} onChange={this.handleCity}>
                                <span>选择城市：</span>
                                <RadioButton value="all">全部</RadioButton>
                                <RadioButton value="hz">杭州</RadioButton>
                                <RadioButton value="sh">上海</RadioButton>
                                <RadioButton value="bj">北京</RadioButton>
                                <RadioButton value="cd">成都</RadioButton>
                            </RadioGroup>
                        </div>
                        <br/>
                        <div className='selectBar' style={{ marginTop: 16}}>
                            <RadioGroup defaultValue={this.state.type} onChange={this.handleType}>
                                <span>选择分类：</span>
                                <RadioButton value="all">全部</RadioButton>
                                <RadioButton value="concert">演唱会</RadioButton>
                                <RadioButton value="music">音乐会</RadioButton>
                                <RadioButton value="cnopera">曲苑杂坛</RadioButton>
                                <RadioButton value="opera">话剧歌剧</RadioButton>
                                <RadioButton value="sports">体育比赛</RadioButton>
                                <RadioButton value="dance">舞蹈芭蕾</RadioButton>
                                <RadioButton value="comic">动漫游戏</RadioButton>
                            </RadioGroup>
                        </div>
                        <br/>
                        <div className='selectBar' style={{ marginTop: 16}}>
                            <RadioGroup defaultValue={this.state.time} onChange={this.handleTime}>
                                <span>选择时间：</span>
                                <RadioButton value="all">全部</RadioButton>
                                <RadioButton value="today">今天</RadioButton>
                                <RadioButton value="tomorrow">明天</RadioButton>
                                <RadioButton value="week">本周</RadioButton>
                                <RadioButton value="month">本月</RadioButton>
                            </RadioGroup>
                        </div>
                        </div>
                        <ResultList filter={this.state}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Directory;