import React, { Component } from 'react';
import {Row, Col, Radio, DatePicker} from 'antd';
import '../../css/App.css'
import '../../css/Directory.css'
import ResultList from "./ResultList";
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {RangePicker} = DatePicker;
const dateFormat = "YYYY-MM-DD";

class Directory extends Component {
    constructor(props){
        super(props);
        this.state = {
            city:"all",
            type:"all",
            time:"all",
            starttime: null,
            endtime: null,
            search: '',
        };
        this.selectDate = this.selectDate.bind(this);
    }

    componentWillMount() {
        this.setState(this.props.location.state);
    };

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.location.state);
    }

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
        let start = moment().format(dateFormat);
        let end = moment().format(dateFormat);
        switch (e.target.value) {
            case "today":
                start = moment().format(dateFormat);
                end = moment().format(dateFormat);
                break;
            case "tomorrow":
                start = moment().add(1,"days").format(dateFormat);
                end = moment().add(1,"days").format(dateFormat);
                break;
            case "week":
                let weekOfDay = moment().format('E');//计算今天是这周第几天
                start = moment().subtract(weekOfDay - 1, 'days').format(dateFormat);//周一日期
                end = moment().add(7 - weekOfDay, 'days').format(dateFormat);//周日日期
                break;
            case "month":
                start = moment().format("YYYY-MM") + '-01';
                end = moment(start).add(1, 'month').subtract(1, 'days').format(dateFormat);
                break;
            case "all":
            case "other":
                start = null;
                end = null;
                break;
            default:
                console.log("error in time filter switch.");
        }
        this.setState({
            time: e.target.value,
            starttime: start !== null ? moment(start, dateFormat) : null,
            endtime: end !== null ? moment(end, dateFormat) : null,
        });
    };

    selectDate = (value) => {
        this.setState({
            time: value.length ? "other" : "all",
            starttime: value.length ? moment(value[0], dateFormat) : null,
            endtime: value.length ? moment(value[1], dateFormat) : null,
        });
    };

    render() {
        return (
            <div>
                <Row>
                    <Col span={4}/>
                    <Col span={16}>
                        <div className="selectArea">
                            <div className='selectBar' style={{marginTop: 16}}>
                                <RadioGroup value={this.state.city} onChange={this.handleCity}>
                                    <span>选择城市：</span>
                                    <RadioButton className='radio-button' value="all">全部</RadioButton>
                                    <RadioButton className='radio-button' value="hz">杭州</RadioButton>
                                    <RadioButton className='radio-button' value="sh">上海</RadioButton>
                                    <RadioButton className='radio-button' value="bj">北京</RadioButton>
                                    <RadioButton className='radio-button' value="gz">广州</RadioButton>
                                    <RadioButton className='radio-button' value="sz">深圳</RadioButton>
                                    <RadioButton className='radio-button' value="bj">重庆</RadioButton>
                                    <RadioButton className='radio-button' value="tj">天津</RadioButton>
                                    <RadioButton className='radio-button' value="km">昆明</RadioButton>
                                    <RadioButton className='radio-button' value="nj">南京</RadioButton>
                                    <RadioButton className='radio-button' value="wh">武汉</RadioButton>
                                    <RadioButton className='radio-button' value="xa">西安</RadioButton>
                                    <RadioButton className='radio-button' value="cs">长沙</RadioButton>
                                    <RadioButton className='radio-button' value="cd">成都</RadioButton>
                                </RadioGroup>
                            </div>
                            <br/>
                            <div className='selectBar' style={{marginTop: 16}}>
                                <RadioGroup value={this.state.type} onChange={this.handleType}>
                                    <span>选择分类：</span>
                                    <RadioButton value="all">全部</RadioButton>
                                    <RadioButton value="concerts">演唱会</RadioButton>
                                    <RadioButton value="musicale">音乐会</RadioButton>
                                    <RadioButton value="shows">曲苑杂坛</RadioButton>
                                    <RadioButton value="dramas">话剧歌剧</RadioButton>
                                    <RadioButton value="sports">体育比赛</RadioButton>
                                    <RadioButton value="dance">舞蹈芭蕾</RadioButton>
                                    <RadioButton value="exhibits">休闲展览</RadioButton>
                                    <RadioButton value="family">儿童亲子</RadioButton>
                                </RadioGroup>
                            </div>
                            <br/>
                            <div className='selectBar' style={{marginTop: 16}}>
                                <div>
                                    <RadioGroup value={this.state.time} onChange={this.handleTime}>
                                        <span>选择时间：</span>
                                        <RadioButton value="all">全部</RadioButton>
                                        <RadioButton value="today">今天</RadioButton>
                                        <RadioButton value="tomorrow">明天</RadioButton>
                                        <RadioButton value="week">本周</RadioButton>
                                        <RadioButton value="month">本月</RadioButton>
                                        <RadioButton value="other" disabled>其他</RadioButton>
                                    </RadioGroup>
                                </div>
                                <br/>
                                <div style={{marginLeft: 70}}>
                                    <RangePicker
                                        value={[this.state.starttime, this.state.endtime]}
                                        format={dateFormat}
                                        onChange={this.selectDate}
                                        locale={locale}
                                    />
                                </div>
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
