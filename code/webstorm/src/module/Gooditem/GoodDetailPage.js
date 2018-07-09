import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Input, Avatar,Affix,Radio,DatePicker} from 'antd';
import moment from 'moment'
import 'moment/locale/zh-cn';
import Ticknumpick from "./TickNumpick";
import DatePick from './DatePick'
moment.locale('zh-cn');

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class GoodDetailPage extends Component{

    state={
      enableddate:["2018-07-06","2018-07-08"],
        pickeddate:"2018-07-06",
        times:["9:30","10:20"],
        picktime:"9:30",
        priceclass:["40","60","80","100"],
        pickprice:"40",
        pickticknum:1,
        tickmaxnum:100,
        totalprice:40,
    };


    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if(anchorElement) { anchorElement.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            }); }
        }
    }

    onsetpickdate=(value)=>{
        this.setState({pickeddate:value})
    }


    selecttime=(e)=>{
        console.log("pick time :"+e.target.value)           //get <Radiobutton value=xxx>'s  value
        this.setState({picktime:e.target.value})
    }



    selectprice=(e)=>{
        console.log("pick price: "+e.target.value)
        this.setState({pickprice:e.target.value})
    }

    setticknum=(value)=> {
        console.log("tick num: "+value)
        this.setState({pickticknum: value});
    }



    render(){
        var timebutton=[]
        for(let i=0;i<this.state.times.length;i++){
            let temp=this.state.times[i];
            timebutton.push(<div className="radiobuttonblock"><RadioButton className="radiobutton" value={temp}>{temp}</RadioButton></div>)
        }
        var pricebutton=[]
        for(let i=0;i<this.state.priceclass.length;i++){
            let temp=this.state.priceclass[i];
            pricebutton.push(<div className="radiobuttonblock"><RadioButton className="radiobutton" value={temp}>{temp}</RadioButton></div>)
        }
        return(
            <Row>
                <div className="body">
                <Col span={2}></Col>
                <Col span={20}>
                <div className="basicinfo">
                 <Row align="top">
                    <Col span={18} id="post&buy">
                        <div className="postheader">某某某某噢摸摸摸摸摸摸票</div>
                        <Row>
                            <Col span={8} >
                                <div className="postblock">
                                    <img className="post" src="http://pimg.dmcdn.cn/perform/project/1497/149703_n.jpg"/>
                                </div>
                            </Col>
                            <Col span={16}>
                                <Row>
                                    <Col>
                                        <div> 促销信息 </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="datepickblock">
                                            <div className="datepick">
                                                <Row>
                                                    <Col span={3}><div className="datepickletter">选择日期:</div></Col>
                                                    <Col span={1}/>
                                                    <Col><div><DatePick Dates={this.state.enableddate} setdate={this.onsetpickdate}/></div></Col>
                                                </Row>
                                            </div>
                                        </div>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="timepickblock">
                                            <Row>
                                                <Col span={3}><div className="timepickletter">选择时间:</div></Col>
                                                <Col span={1}></Col>
                                                <Col>
                                                       <RadioGroup  onChange={this.selecttime} defaultValue={this.state.picktime}>
                                                        {timebutton}
                                                       </RadioGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                     </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="pricepickblock">
                                            <Row>
                                                <Col span={3}><div className="timepickletter">选择价格:</div></Col>
                                                <Col span={1}></Col>
                                                <Col>
                                                    <RadioGroup onChange={this.selectprice} defaultValue={this.state.pickprice}>
                                                        {pricebutton}
                                                    </RadioGroup>
                                                </Col>
                                            </Row>
                                        </div>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="numpickblock">
                                            <Row>
                                                <Col span={3}><div className="timepickletter">选择数量:</div></Col>
                                                <Col span={1}></Col>
                                                <Col>
                                                    <Ticknumpick setnum={this.setticknum} maxnum={this.state.tickmaxnum}/>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="totalpriceblock">总价
                                            <p >{this.state.totalprice}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6} id="side" className="test">
                        213
                    </Col>
                </Row>
                <Row >
                    <p className="blank" ></p>
                </Row>
                <Row>
                    <Col span={18}>
                        <Affix offsetTop={20}>
                        <Row>
                            <Col span={4}>
                                <a onClick={()=>this.scrollToAnchor("block1")} className="tab">演出详情</a>
                            </Col>
                            <Col span={4}>
                                <a href="#block2" className="tab">评论</a>
                            </Col>
                            <Col span={4}>
                                <a href="#block3" className="tab">温馨提示</a>
                            </Col>
                        </Row>
                        </Affix>
                        <Row>
                            <Col>
                                <div id="block1" style={{height:1000}}> <a ></a>
                                    <div style={{height:80}}></div>
                                    <div>演出详情</div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6} className="test">
                        side bar
                    </Col>
                </Row>
                </div>
                </Col>
                <Col span={2}>
                </Col>
                </div>
            </Row>
        )
    }
}

export default GoodDetailPage;