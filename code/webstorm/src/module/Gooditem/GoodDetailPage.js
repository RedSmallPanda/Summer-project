import React, { Component } from 'react';
import { Row, Col, Affix,Radio,Card, Icon,Rate,Button,message } from 'antd';
import moment from 'moment'
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'moment/locale/zh-cn';
import TickNumPick from "./TickNumPick";
import DatePick from './DatePick';
import TicketComment from "./TicketComment";
import axios from 'axios';
import { browserHistory} from 'react-router';
import Sider from '../MainPages/Sider';
import Cookies from 'js-cookie';
import ShowLocation from "./ShowLocation";
import Image from '../MainPages/Image';
moment.locale('zh-cn');

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {Meta} = Card;

class GoodDetailPage extends Component{

    state={
        ticketDetails: {
            "2018-07-19": {
                "09:22": [{
                    "ticketId": 3,
                    "time": "Jul 20, 2018 8:22:26 AM",
                    "price": 23,
                    "seat": "seat",
                    "amount": 123,
                    "stock": 23,
                    "showId": 1
                }]
            }},
        onSaleInfo:["onSale"],
        enabledDate:["2018-07-19"],
        pickedDate:"2018-07-19",
        times:["09:22"],
        pickTime:"09:22",
        pickPrice:{},
        pickPriceIdx:0,
        pickTickNum:1,
        tickMaxNum:100,
        totalPrice:40,
        data:[],
    };

    getResult(self) {
        // console.log("Detail: getResult");
        axios.get("/showDetail",{
            params: {
                showId: self.props.params.showId,
            }
        })
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                let temp=[];
                // self.setState({ticketDetails:response.data})
                let data=response.data;
                if(data==null){ self.setState({
                    ticketDetails: null,

                });   return;}
                let i;
                for(i in data){
                    temp.push(String(i));
                }
                // self.setState({enabledDate:temp,pickedDate:temp[0]});
                let pickTime=[];
                for(i in data[temp[0]]){
                    pickTime.push(i);
                }
                // self.setState({pickTime:pickTime[0]})
                // let tempTicket=data[temp[0]][pickTime[0]][0];
                // let tempPickPrice={
                //     ticketId: tempTicket.ticketId,
                //     seat: tempTicket.seat,
                //     price:tempTicket.price,
                //     stock: tempTicket.stock,
                // };
                self.setState({
                    ticketDetails: data,
                    pickPriceIdx: 0,
                    enabledDate: temp,
                    pickedDate: temp[0],
                    pickTime: pickTime[0],
                    tickMaxNum: data[temp[0]][pickTime[0]][0].stock
                });

                console.log("Result got.");
                console.log(self.state);
               /* console.log("enableTimes: "+temp);
                for(var i in data[temp[1]]){
                    console.log("time: "+String(i))
                    console.log(data[temp[1]][i]);
                    for(var j in data[temp[1]][i]){
                        console.log(data[temp[1]][i][j].showId)
                    }
                }*/

                /*self.handleData(response.data);
                self.setState({
                    loading: false,
                    comment: data,
                });*/
            })
            .catch(function (error) {
                self.setState({
                    ticketDetails: null,
                });
                console.log(error);
            });
    };

    // getImage(self) {
    //     axios.get("/getImage",{
    //         params: {
    //             showId: self.props.params.showId,
    //         }
    //     })
    //         .then(function (response) {
    //             self.setState({
    //                 imgUrl:response.data
    //             })
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };

    componentWillMount(){
        // console.log("Detail: willMount");
        window.scrollTo(0,0);
        let self=this;
        axios.get("/getShowById",{
            params:{
                showId:self.props.params.showId,
            }
        })
            .then(function (response) {
                self.setState({
                    data: response.data,
                });
                console.log("Show got.");
                console.log(self.state);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.getResult(this);
        // this.getImage(this);
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

    onSetPickDate=(value)=>{
        let time = [];
        // let price={}
        for(let i in this.state.ticketDetails[value]){
            time.push(i);
            // let temp = this.state.ticketDetails[value][i][0];
            //  price = {
            //     ticketId: temp.ticketId,
            //     seat: temp.seat,
            //     price: temp.price,
            //     stock: temp.stock,
            // };
            break;
        }
        this.setState({
            pickedDate: value,
            pickTime: time[0],
            pickPriceIdx: 0,
            tickMaxNum: this.state.ticketDetails[this.state.pickedDate][this.state.pickTime][0].stock
        });
    };

    selectTime = (e) => {
        console.log("pick time :" + e.target.value);//get <Radiobutton value=xxx>'s  value
        this.setState({
            pickTime: e.target.value,
            pickPriceIdx: 0,
            tickMaxNum: this.state.ticketDetails[this.state.pickedDate][this.state.pickTime][0].stock
        });

    };

    selectPrice=(e)=>{
        let tickIdx=e.target.value;
        // console.log("pick price: " + this.state.ticketDetails[this.state.pickeddate][this.state.picktime][tickIdx].price);
        this.setState({
            pickPriceIdx: e.target.value,
            tickMaxNum: this.state.ticketDetails[this.state.pickedDate][this.state.pickTime][tickIdx].stock
        });
    };

    setTickNum = (value) => {
        // console.log("tick num: "+value);
        this.setState({
            pickTickNum: value,
        });
    };

    handleShopCart = () =>{
        if (typeof(Cookies.get("username")) === "undefined" || Cookies.get("username") === null || Cookies.get("username") === '') {
            message.info("登录后才能使用购物车");
            return;
        }
        axios.get("/addCurrentCart",{
            params:{
                ticketId: this.state.ticketDetails[this.state.pickedDate][this.state.pickTime][this.state.pickPriceIdx].ticketId,
                num: this.state.pickTickNum,
            }
        })
            .then(function (response) {
                message.success("加入购物车成功")
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    toBuyStep = () => {
        // console.log("ready to jump");
        if (typeof(Cookies.get("username")) === "undefined" || Cookies.get("username") === null || Cookies.get("username") === '' || Cookies.get("username") === "admin") {
            message.info("登陆后才能购买")
        }
        else {
            browserHistory.push({
                pathname: '/buyStep',
                state: {
                    firstStep: 0,
                    secondStep: 0,
                    showName: this.state.data.title,
                    ticketInfo: this.state.ticketDetails[this.state.pickedDate][this.state.pickTime][this.state.pickPriceIdx],
                    number: this.state.pickTickNum,
                    totalPrice: this.state.pickTickNum * this.state.ticketDetails[this.state.pickedDate][this.state.pickTime][this.state.pickPriceIdx].price,
                    isCart: 0,
                }
            });
            Cookies.set('firstStep', 0);
            Cookies.set('secondStep', 0);
            Cookies.set('showName', this.state.data.title);
            Cookies.set('ticketInfo', this.state.ticketDetails[this.state.pickedDate][this.state.pickTime][this.state.pickPriceIdx]);
            Cookies.set('number', this.state.pickTickNum);
            Cookies.set('totalPrice', this.state.pickTickNum * this.state.ticketDetails[this.state.pickedDate][this.state.pickTime][this.state.pickPriceIdx].price);
            Cookies.set('isCart', 0);
            Cookies.set('getNoCoupon', 0);
            Cookies.set('newCoupon', {discCond: "100000", discount: "30"});
            Cookies.set('tempShowId', this.props.params.showId);

            // console.log(window.location.pathname);
        }
    };

    render(){
        // console.log("Detail: render");
        // console.log(this.state);

        let timeButton=[];
        if(this.state.pickTime!==""&&this.state.ticketDetails!==null) {
            for (let time in this.state.ticketDetails[this.state.pickedDate]) {
                // console.log("refresh priceButton");
                // let temp=this.state.times[i];
                timeButton.push(
                    <div className="radiobuttonblock">
                        <RadioButton className="radiobutton" value={time}>{time}</RadioButton>
                    </div>
                );
            }
        }
        let priceButton=[];
        if(this.state.pickTime!==""&&this.state.ticketDetails!==null) {
            // console.log("refresh priceButton");
            for (let i in this.state.ticketDetails[this.state.pickedDate][this.state.pickTime]) {
                let temp = this.state.ticketDetails[this.state.pickedDate][this.state.pickTime][i];
                // let price = {
                //     ticketId: temp.ticketId,
                //     seat: temp.seat,
                //     price: temp.price,
                //     stock: temp.stock,
                // };
                priceButton.push(
                    <div className="radiobuttonblock">
                        <RadioButton className="priceradiobutton" value={parseInt(i, 10)}>
                            {temp.seat + '￥' + temp.price}
                        </RadioButton>
                    </div>
                );
            }
        }
        let onSaleInfo=[];
        let i;
        for (i = 0; i < this.state.onSaleInfo.length; i++) {
            // console.log("refresh priceButton");
            let temp = this.state.onSaleInfo[i];
            onSaleInfo.push(<p className="onsale">{temp}</p>);
        }

        return (
            <Row>
                <div className="body">
                    <Col span={2}/>
                    <Col span={20}>
                        <div className="basicinfo">
                            <div className="box3">
                                <Row align="top">
                                    <Col span={1}/>
                                    <Col span={17} id="post&buy">
                                        <div className="postheader"/>
                                        <Row>
                                            <Col span={8}>
                                                <div className="postblock">
                                                    <Card
                                                        hoverable
                                                        style={{width: 240}}
                                                        cover={<Image width={240}
                                                                      showId={this.props.params.showId}/>} //这里添加图片
                                                    >
                                                        <Meta
                                                            title={this.state.data.title}
                                                            description={
                                                                <div>
                                                                    <Icon type="environment"/>
                                                                    <a href={"https://baike.baidu.com/item/" + this.state.data.address}
                                                                       style={{color: "#777777"}} target="_blank">
                                                                        {" " + this.state.data.address}
                                                                    </a><br/>
                                                                    <Rate allowHalf disabled
                                                                          value={this.state.data.rate / 2}/>
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
                                                                <Col span={3}>
                                                                    <div className="infoletter"> 促销信息</div>
                                                                </Col>
                                                                <Col span={1}/>
                                                                <Col span={20}>{onSaleInfo}</Col>
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
                                                                            {this.state.ticketDetails?<DatePick Dates={this.state.enabledDate}
                                                                                      setdate={this.onSetPickDate}/>:null}
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
                                                                <Col span={3}>
                                                                    <div className="timepickletter">选择时间:</div>
                                                                </Col>
                                                                <Col span={1}/>
                                                                <Col>{
                                                                    this.state.ticketDetails?
                                                                    <RadioGroup onChange={this.selectTime}
                                                                                value={this.state.pickTime}>
                                                                        {timeButton}
                                                                    </RadioGroup>:null
                                                                }
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <div className="pricepickblock">
                                                            <Row>
                                                                <Col span={3}>
                                                                    <div className="timepickletter">选择价格:</div>
                                                                </Col>
                                                                <Col span={1}/>
                                                                <Col>
                                                                    <div className="priceclassblock">
                                                                        {
                                                                            this.state.ticketDetails?
                                                                            <RadioGroup onChange={this.selectPrice}
                                                                                        value={this.state.pickPriceIdx}>
                                                                                {priceButton}
                                                                            </RadioGroup>
                                                                                :null
                                                                        }
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>

                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <div className="numpickblock">
                                                            <Row>
                                                                <Col span={3}>
                                                                    <div className="timepickletter">选择数量:</div>
                                                                </Col>
                                                                <Col span={1}/>
                                                                <Col>
                                                                    {
                                                                        this.state.ticketDetails?
                                                                        <TickNumPick setnum={this.setTickNum}
                                                                                     maxnum={this.state.tickMaxNum}/>
                                                                            :null
                                                                    }
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <div className="totalpriceblock">
                                                            <Row>
                                                                <Col span={3}>
                                                                    <div className="timepickletter">总价格:</div>
                                                                </Col>
                                                                <Col span={1}/>
                                                                <Col span={8}>
                                                                    {this.state.ticketDetails?
                                                                        <div>
                                                                            <p className="price">{'￥' + this.state.ticketDetails[this.state.pickedDate][this.state.pickTime][this.state.pickPriceIdx].price * this.state.pickTickNum}</p>
                                                                        </div>
                                                                        :null
                                                                    }
                                                                </Col>
                                                                <Col span={4}>
                                                                    {
                                                                        this.state.ticketDetails?
                                                                        <Button type="primary" size="large"
                                                                                onClick={this.handleShopCart}>加入购物车</Button>
                                                                            :null
                                                                    }
                                                                </Col>
                                                                <Col span={1}/>
                                                                <Col span={4}>
                                                                    {this.state.ticketDetails?
                                                                        <Button type="primary" size="large"
                                                                                onClick={this.toBuyStep}>立即购买</Button>
                                                                        :null
                                                                    }
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={6} id="side" className="test">
                                        <ShowLocation
                                            city={this.state.data.city}
                                            location={this.state.data.address}
                                            style={{
                                                width: "100%",
                                                height: 250,
                                                marginTop: 30,
                                            }}/>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <p className="blank"/>
                            </Row>
                            <Row>
                                <Col span={18}>
                                    <Affix offsetTop={0}>
                                        <div className="affixbar">
                                            <Row>
                                                <Col span={4}>
                                                    <a onClick={() => this.scrollToAnchor("block1")}
                                                       className="tab">演出详情</a>
                                                </Col>
                                                <Col span={4}>
                                                    <a onClick={() => this.scrollToAnchor("block2")}
                                                       className="tab">评论</a>
                                                </Col>
                                                <Col span={4}>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Affix>
                                    <Row>
                                        <Col>
                                            <div id="block1" style={{height: 1000}}>
                                                <div style={{height: 80}}/>
                                                <div>演出详情</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div id="block2" style={{}}>
                                                <div style={{height: 80}}/>
                                                <div><TicketComment showId={this.props.params.showId}/></div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={2}/>
                                <Col span={4} className="test">
                                    <Affix offsetTop={50}>
                                        <Sider data={this.state.data} showId={this.props.params.showId}/>
                                    </Affix>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={2}>
                    </Col>
                </div>
            </Row>
        );
    }
}

export default GoodDetailPage;