import React, {Component} from 'react';
import {DatePicker, Select, Button, Modal} from 'antd';

import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

import axios from "axios/index";
import {message} from "antd/lib/index";
import {browserHistory} from "react-router";

const {MonthPicker, WeekPicker} = DatePicker;

const Option = Select.Option;

// const data = [
//     { year: '1月', sales: 38 },
//     { year: '2月', sales: 52 },
//     { year: '3月', sales: 61 },
//     { year: '4月', sales: 145 },
//     { year: '5月', sales: 48 },
//     { year: '6月', sales: 38 },
//     { year: '7月', sales: 38 },
//     { year: '8月', sales: 38 },
//     { year: '9月', sales: 38 },
//     { year: '10月', sales: 52 },
//     { year: '11月', sales: 61 },
//     { year: '12月', sales: 145 },
// ];
// const cols = {
//     'number': {tickInterval: 50},
// };
// const columns = [{
//     title: '票品名称',
//     dataIndex: 'ticketName',
//     key: 'ticketName',
// },{
//     title: '数量',
//     dataIndex: 'count',
//     key: 'count',
// },{
//     title:'总价',
//     dataIndex:'amount',
//     key:'amount',
// }, {
//     title:'下单时间',
//     dataIndex:'time',
//     key:'time',
// }, {
//     title:'状态',
//     dataIndex:'state',
//     key:'state',
// }, {
//     title:'操作',
//     key:'action',
// }];

class SalesData extends Component {
    state = {
        choice: "year",
        time:"",
        data:[],
        kind:"all",
        onShow:0,
        interval:50,
        cols:{
            'number': {tickInterval: 50},
        }
    };
    //
    // cols = {
    //     'number': {tickInterval: this.state.interval},
    // };

    choiceHandleChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({choice: value});
        this.setState({time:""});
        this.setState({onShow:0});
    };

    kindHandleChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({kind:value});
        this.setState({onShow:0});
    };

    handleChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({time:value});
        this.setState({onShow:0});
    };

    onChange = (date, dateString) => {
        console.log(date, dateString);
        this.setState({time:dateString});
        this.setState({onShow:0});
    };

    buttonOnClick = () => {
        let self = this;
        if (this.state.time === "") {
            message.error("请选择时间范围", 1);
        }
        else {
            console.log(this.state);
            axios.get("/drawChart", {
                params: {
                    choice: this.state.choice,
                    timeString: this.state.time,
                    kind: this.state.kind,
                }
            })
                .then(function (response) {
                    console.log(response);
                    self.setState({data: response.data});
                    let sum = 0;
                    for (let i = 0; i < response.data.length; i++) {
                        sum = sum + response.data[i].number;
                    }
                    console.log("sum: " + sum);
                    if (sum > 0) {
                        let avg = sum / (response.data.length);
                        console.log("avg: " + avg);
                        if (avg <= 50) {
                            self.setState({
                                cols: {
                                    'number': {tickInterval: 20},
                                }
                            });
                        }
                        else if (avg <= 100) {
                            self.setState({
                                cols: {
                                    'number': {tickInterval: 50},
                                }
                            });
                        }
                        else if (avg <= 200) {
                            self.setState({
                                cols: {
                                    'number': {tickInterval: 100},
                                }
                            });
                        }
                        else if (avg <= 500) {
                            self.setState({
                                cols: {
                                    'number': {tickInterval: 200},
                                }
                            });
                        }
                        else if (avg <= 1000) {
                            self.setState({
                                cols: {
                                    'number': {tickInterval: 500},
                                }
                            });
                        }
                        else if (avg <= 2000) {
                            self.setState({
                                cols: {
                                    'number': {tickInterval: 1000},
                                }
                            });
                        }
                        else if (avg <= 10000) {
                            self.setState({
                                cols: {
                                    'number': {tickInterval: 5000},
                                }
                            });
                        }
                        else if (avg <= 20000) {
                            self.setState({
                                cols: {
                                    'number': {tickInterval: 10000},
                                }
                            });
                        }
                        else if (avg <= 100000) {
                            self.setState({
                                cols: {
                                    'number': {tickInterval: 50000},
                                }
                            });
                        }
                        else {
                            self.setState({
                                cols: {
                                    'number': {tickInterval: 100000},
                                }
                            });
                        }
                        self.setState({onShow: 1});
                    }
                    else {
                        Modal.error({
                            title: '所选时间段无销售数据！',
                            content: '请重新选择筛选条件',
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };


    render() {
        let date=new Date;
        let year=date.getFullYear();

        let choice1 = <div>
            <Select defaultValue="" style={{ width: 180 }} onChange={this.handleChange}>
                <Option value="">请选择年份</Option>
                <Option value={year}>{year}</Option>
                <Option value={year-1}>{year-1}</Option>
                <Option value={year-2}>{year-2}</Option>
                <Option value={year-3}>{year-3}</Option>
                <Option value={year-4}>{year-4}</Option>
                <Option value={year-5}>{year-5}</Option>
                <Option value={year-6}>{year-6}</Option>
                <Option value={year-7}>{year-7}</Option>
                <Option value={year-8}>{year-8}</Option>
                <Option value={year-9}>{year-9}</Option>
            </Select>
        </div>;

        let choice2 = <div>
            <MonthPicker onChange={this.onChange} placeholder="请选择月份"/>
        </div>;

        let choice3 = <div>
            <WeekPicker onChange={this.onChange} placeholder="请选择周数"/>
        </div>;

        let choice4 = <div>
            <DatePicker onChange={this.onChange} placeholder="请选择日期"/>
        </div>;

        let choice = null;
        if (this.state.choice==="year"){
            choice=choice1;
        }
        else if(this.state.choice==="month"){
            choice=choice2;
        }
        else if(this.state.choice==="week"){
            choice=choice3;
        }
        else if(this.state.choice==="day"){
            choice=choice4;
        }

        let chart=null;
        if(this.state.kind==='all'&&this.state.onShow===1){
            chart=<div>
                <Chart height={400} data={this.state.data} scale={this.state.cols} forceFit>
                    <Axis name="type" />
                    <Axis name="number" />
                    <Tooltip crosshairs={{type : "y"}}/>
                    <Geom type="interval" position="type*number" color="type"/>
                </Chart>
            </div>;
        }

        else if(this.state.kind!=='all'&&this.state.onShow===1){
            chart=<div>
                <Chart height={400} data={this.state.data} scale={this.state.cols} forceFit>
                    <Axis name="time" />
                    <Axis name="number" />
                    <Tooltip crosshairs={{type : "y"}}/>
                    <Geom type="interval" position="time*number" />
                </Chart>
            </div>;
        }
        else{
            chart=null;
        }

        return (
            <div>
                <br/>
                <Select defaultValue="year" style={{width: 180}} onChange={this.choiceHandleChange}>
                    <Option value="year">按年统计</Option>
                    <Option value="month">按月统计</Option>
                    <Option value="week">按周统计</Option>
                    <Option value="day">按日统计</Option>
                </Select>
                <br/>
                <br/>
                {choice}
                <br/>
                <Select defaultValue="all" style={{width: 180}} onChange={this.kindHandleChange}>
                    <Option value="all">全部分类</Option>
                    <Option value="concerts">演唱会</Option>
                    <Option value="musicale">音乐会</Option>
                    <Option value="shows">曲苑杂坛</Option>
                    <Option value="dramas">话剧歌剧</Option>
                    <Option value="sports">体育比赛</Option>
                    <Option value="dance">舞蹈芭蕾</Option>
                    <Option value="exhibits">休闲展览</Option>
                    <Option value="family">儿童亲子</Option>
                </Select>
                <br/>
                <br/>
                <Button type="primary" onClick={this.buttonOnClick}>生成图表</Button>
                <br/>
                <br/>
                {chart}
            </div>
        )
    }
}

export default SalesData;