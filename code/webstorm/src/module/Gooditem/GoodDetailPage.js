import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Input, Avatar,Affix,Radio,DatePicker} from 'antd';
import moment from 'moment'
import 'moment/locale/zh-cn';
import Ticknumpick from "./Ticknumpick";
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
        tickmaxnum:20,
    };


    defaultdate=moment(this.state.enableddate[0],"YYYY-MM-DD-dddd")  //set default time picker
    defaulttime=this.state.times[0]
    timepickerformat="YYYY-MM-DD-dddd";

    ontimechange=(value,dateString)=>{
        console.log("you picked : "+dateString);
        this.setState({pickeddate:String(moment(value).format(this.timepickerformat))});
    }
    selecttime=(e)=>{
        console.log("pick time :"+e.target.value)
        this.setState({picktime:e.target.value})
    }



    selectprice=(e)=>{
        console.log("pick price: "+e.target.value)
        this.setState({pickprice:e.target.value})
    }





    disabledDate=(time)=>{
        let enabledate=this.state.enableddate;
        let picked_time=String(moment(time).format("YYYY-MM-DD"));
        for(var j = 0; j < enabledate.length; j++) {

            if(enabledate[j]===picked_time){return false;}
        }
        //    if(picked_time==="2018-07-05"){console.log("ojbk")}
        return (true);                       //return true to disable
    }


    setticknum=(value)=> {
        console.log("tick num: "+value)
        this.setState({pickticknum: value});
    }



    render(){
        var timebutton=[]
        for(let i=0;i<this.state.times.length;i++){
            let temp=this.state.times[i];
            timebutton.push(<RadioButton value={temp}>{temp}</RadioButton>)
        }
        var pricebutton=[]
        for(let i=0;i<this.state.priceclass.length;i++){
            let temp=this.state.priceclass[i];
            pricebutton.push(<RadioButton value={temp}>{temp}</RadioButton>)
        }
        return(
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
                                                <div >选择日期</div>
                                            <DatePicker
                                                allowClear={false}
                                                defaultValue={this.defaultdate}
                                                format={this.timepickerformat}
                                                size="large"
                                                onChange={this.ontimechange}
                                                disabledDate={this.disabledDate}
                                            />
                                            </div>
                                        </div>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div>
                                        <RadioGroup onChange={this.selecttime} defaultValue={this.state.picktime}>
                                            {timebutton}
                                        </RadioGroup>
                                        </div>
                                     </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div id="tickprice">
                                            <RadioGroup onChange={this.selectprice} defaultValue={this.state.pickprice}>
                                                {pricebutton}
                                            </RadioGroup>
                                        </div>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div id="ticknum">
                                            <Ticknumpick setnum={this.setticknum} maxnum={this.state.tickmaxnum}/>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div id="ticknum">
                                            <p>{}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6} id="side">
                        213
                    </Col>
                </Row>
            </div>
        )
    }
}

export default GoodDetailPage;