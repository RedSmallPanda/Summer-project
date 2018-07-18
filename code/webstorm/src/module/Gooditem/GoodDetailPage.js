import React, { Component } from 'react';
import { Row, Col, Affix,Radio,Card, Icon,Rate,Button } from 'antd';
import moment from 'moment'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'moment/locale/zh-cn';
import Ticknumpick from "./TickNumpick";
import DatePick from './DatePick'
import CommentEditor from "./CommentEditor";
import TicketComment from "./TicketComment";
import Sider from '../MainPages/Sider';
moment.locale('zh-cn');

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {Meta} = Card;

const data={
    name:'森林音乐会',
    time:'2018/6/8 19:30',
    location:'梅赛德斯奔驰文化中心',
    rate:4.5,
    img:'https://pimg.dmcdn.cn/perform/project/1551/155173_n.jpg'
};

class GoodDetailPage extends Component{

    state={
        onsaleinfo:["跳楼大甩卖，清仓大处理，全场一折起","只要998，只要998"],
        enableddate:["2018-07-06","2018-07-08"],
        pickeddate:"2018-07-06",
        times:["9:30","10:20","14:00","16:00","18:00","20:00","21:00"],
        picktime:"9:30",
        priceclass:["40","60","80","100","112","130","140","150"],
        pickprice:"40",
        pickticknum:1,
        tickmaxnum:100,
        totalprice:40,
        data:data,
    };

    componentWillMount(){
        window.scrollTo(0,0);
    }

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
    };
    onsetpickdate=(value)=>{
        this.setState({pickeddate:value})
    };


    selecttime=(e)=>{
        console.log("pick time :"+e.target.value);          //get <Radiobutton value=xxx>'s  value
        this.setState({picktime:e.target.value})
    };



    selectprice=(e)=>{
        console.log("pick price: "+e.target.value);
        this.setState({pickprice:e.target.value})
    };

    setticknum=(value)=> {
        console.log("tick num: "+value);
        this.setState({pickticknum: value});
    };

    handleShopCart = () =>{

    };

    render(){
        let timebutton=[];
        for(let i=0;i<this.state.times.length;i++){
            let temp=this.state.times[i];
            timebutton.push(<div className="radiobuttonblock"><RadioButton className="radiobutton" value={temp}>{temp}</RadioButton></div>)
        }
        let pricebutton=[];
        for(let i=0;i<this.state.priceclass.length;i++){
            let temp=this.state.priceclass[i];
            pricebutton.push(<div className="radiobuttonblock"><RadioButton className="radiobutton" value={temp}>{temp}</RadioButton></div>)
        }
        let onsaleinfo=[];
        for(let i=0;i<this.state.onsaleinfo.length;i++){
            let temp=this.state.onsaleinfo[i];
            onsaleinfo.push(<p className="onsale">{temp}</p>)
        }

        return(
            <Row>
                <div className="body">
                    <Col span={2}/>
                    <Col span={20}>
                        <div className="basicinfo">
                            <div className="box3">
                                <Row align="top" >
                                    <Col span={1}/>
                                    <Col span={17} id="post&buy">
                                        <div className="postheader"/>
                                        <Row>
                                            <Col span={8} >
                                                <div className="postblock">
                                                    <Card
                                                        hoverable
                                                        style={{ width: 240 }}
                                                        cover={<img alt="example" src={this.state.data.img} />}
                                                    >
                                                        <Meta
                                                            title={this.state.data.name}
                                                            description={
                                                                <div>
                                                                    <Icon type="environment"/>
                                                                    <a href={"https://baike.baidu.com/item/"+this.state.data.location} style={{color:"#777777"}} target="_blank">
                                                                        {" "+this.state.data.location}
                                                                    </a>
                                                                    <Rate allowHalf disabled defaultValue={this.state.data.rate} />
                                                                </div>}
                                                        />
                                                    </Card>
                                                </div>
                                            </Col>
                                            <Col span={16}>
                                                <Row>
                                                    <Col>
                                                        <div className="onsaleinfoblock">
                                                            <Row align="top">
                                                                <Col span={3}><div className="infoletter"> 促销信息 </div></Col>
                                                                <Col span={1}/>
                                                                <Col span={20}>{onsaleinfo}</Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <div className="datepickblock">
                                                            <div className="datepick">
                                                                <Row>
                                                                    <Col span={3}>
                                                                        <div className="datepickletter">选择日期:</div>
                                                                    </Col>
                                                                    <Col span={1}/>
                                                                    <Col>
                                                                        <div>
                                                                            <DatePick Dates={this.state.enableddate} setdate={this.onsetpickdate}/>
                                                                        </div>
                                                                    </Col>
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
                                                                <Col span={1}/>
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
                                                                <Col span={1}/>
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
                                                                <Col span={1}/>
                                                                <Col>
                                                                    <Ticknumpick setnum={this.setticknum} maxnum={this.state.tickmaxnum}/>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <div className="totalpriceblock">
                                                            <Row>
                                                                <Col span={3}><div className="timepickletter">总价格:</div></Col>
                                                                <Col span={1}/>
                                                                <Col span={8}>
                                                                    <div>
                                                                        <p className="price">{'￥'+parseInt(this.state.pickprice,10)*this.state.pickticknum}</p>
                                                                    </div>
                                                                </Col>
                                                                <Col span={4}>
                                                                    <Button type="primary" size="large">加入购物车</Button>
                                                                </Col>
                                                                <Col span={1}/>
                                                                <Col span={4}>
                                                                    <Button type="primary" size="large">立即购买</Button>
                                                                </Col>
                                                            </Row>
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
                            </div>
                            <Row >
                                <p className="blank" />
                            </Row>
                            <Row>
                                <Col span={18}>
                                    <Affix offsetTop={0}>
                                        <div className="affixbar">
                                            <Row>
                                                <Col span={4}>
                                                    <a onClick={()=>this.scrollToAnchor("block1")} className="tab">演出详情</a>
                                                </Col>
                                                <Col span={4}>
                                                    <a onClick={()=>this.scrollToAnchor("block2")} className="tab">评论</a>
                                                </Col>
                                                <Col span={4}>
                                                    <a href="" className="tab">温馨提示</a>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Affix>
                                    <Row>
                                        <Col>
                                            <div id="block1" style={{height:1000}}>
                                                <div style={{height:80}}/>
                                                <div>演出详情</div>
                                                <div className="editor"><CommentEditor/></div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div id="block2" style={{ }}>
                                                <div style={{height: 80}}/>
                                                <div><TicketComment/></div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={2}/>
                                <Col span={4} className="test">
                                    <Sider/>
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