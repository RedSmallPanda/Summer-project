import React, { Component } from 'react';
import { Row, Col, Affix,Radio,Card, Icon,Rate,Button,message } from 'antd';
import moment from 'moment'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'moment/locale/zh-cn';
import Ticknumpick from "./TickNumpick";
import DatePick from './DatePick'
import CommentEditor from "./CommentEditor";
import TicketComment from "./TicketComment";
import axios from 'axios';
import { browserHistory} from 'react-router';
import Sider from '../MainPages/Sider';
import ShowLocation from "./ShowLocation";
moment.locale('zh-cn');

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {Meta} = Card;

const data={
    name:'森林音乐会--',
    time:'2018/6/8 19:30--',
    location:'梅赛德斯奔驰文化中心--',
    rate:4.5,
    img:'https://pimg.dmcdn.cn/perform/project/1551/155173_n.jpg'
};

class GoodDetailPage extends Component{

    state={
        ticketDetails:{"2018-07-21":{"08:22":[{"ticketId":3,"time":"Jul 20, 2018 8:22:26 AM","price":23,"seat":"sdad","amount":123,"stock":23,"showId":1}],"08:23":[{"ticketId":3,"time":"Jul 20, 2018 8:22:26 AM","price":23,"seat":"sdad","amount":123,"stock":23,"showId":1}]},
            "2018-07-19":{"09:22":[{"ticketId":3,"time":"Jul 20, 2018 8:22:26 AM","price":23,"seat":"sdad","amount":123,"stock":23,"showId":1}],"09:23":[{"ticketId":3,"time":"Jul 20, 2018 8:22:26 AM","price":23,"seat":"sdad","amount":123,"stock":23,"showId":1}]}
        },
        onsaleinfo:["跳楼大甩卖，清仓大处理，全场一折起","只要998，只要998"],
        enableddate:["2018-07-21","2018-07-19"],
        pickeddate:"2018-07-21",
        times:[],
        picktime:"08:22",
   //     priceclass:["40","60","80","100","112","130","140","150"],
        pickprice:{},
        pickpriceIdx:0,
        pickticknum:1,
        tickmaxnum:100,
        totalprice:40,
        data:data,


    };
    getResult(self,props) {
        console.log("get show id"+ self.props.params.showId)
        axios.get("http://localhost:8080/showDetail",{params:{showId: self.props.params.showId}})
            .then(function (response) {
                console.log(response.data);
                console.log(JSON.stringify(response.data))
                let temp=[];
      //          self.setState({ticketDetails:response.data})
                var data=response.data;
                let i;
                for(i in data){
                    temp.push(String(i));
                }
      //          self.setState({enableddate:temp,pickeddate:temp[0]});
                let picktime=[];
                for(i in data[temp[0]]){
                    picktime.push(i);
                }
       //         self.setState({picktime:picktime[0]})
       //          var tempTicket=data[temp[0]][picktime[0]][0];
                // let tempPickPrice={
                //     ticketId: tempTicket.ticketId,
                //     seat: tempTicket.seat,
                //     price:tempTicket.price,
                //     stock: tempTicket.stock,
                // };
                self.setState({ticketDetails:data,pickpriceIdx:0,enableddate:temp,pickeddate:temp[0],picktime:picktime[0]});

               /* console.log("enabletimes: "+temp);
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
                console.log(error);
            });
    };

    /*componentDidMount(){
        console.log("showdetail")
       /!* this.getResult(this,this.props);*!/
    }*/
    componentWillMount(){
        window.scrollTo(0,0);
    //    console.log("willmount")
        this.getResult(this,this.props);
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
        let time=[]
        // let price={}
        for(var i in this.state.ticketDetails[value]){
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
        this.setState({pickeddate:value,picktime:time[0],pickpriceIdx:0})
    };


    selecttime=(e)=>{
        console.log("pick time :"+e.target.value);          //get <Radiobutton value=xxx>'s  value
        this.setState({picktime:e.target.value,pickpriceIdx:0});

    };



    selectprice=(e)=>{
        let tickIdx=e.target.value;
        console.log("pick price: "+this.state.ticketDetails[this.state.pickeddate][this.state.picktime][tickIdx].price);
        this.setState({pickpriceIdx:e.target.value,tickmaxnum:this.state.ticketDetails[this.state.pickeddate][this.state.picktime][tickIdx].stock})
    };

    setticknum=(value)=> {
        console.log("tick num: "+value);
        this.setState({pickticknum: value});
    };


    handleShopCart = () =>{


        axios.get("http://localhost:8080/addCurrentCart",{
            params:{ticketId:this.state.ticketDetails[this.state.pickeddate][this.state.picktime][this.state.pickpriceIdx].ticketId ,
                     num:this.state.pickticknum }
        })
            .then(function (response) {

                message.success("加入购物车成功")
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    rendertTimes () {
        let times=[];
        for(var i in this.state.ticketDetails[this.state.pickeddate]){times.push(i)}
        return times.map((element) =>
        {
           return (<div className="radiobuttonblock"><RadioButton className="radiobutton" value={element}>{element}</RadioButton></div>);
    })
    };


    timepick=()=>{
        let timebutton=[];
        if(this.state.picktime!==""){
            for(var time in this.state.ticketDetails[this.state.pickeddate]){
                console.log("refresh pricebutton")
                // let temp=this.state.times[i];
                timebutton.push(<div className="radiobuttonblock"><RadioButton className="radiobutton" value={time}>{time}</RadioButton></div>)
            }
        }
        return timebutton;
    }

    toBuyStep=()=>{
        console.log("ready to jump");
        browserHistory.push({
            pathname:'/buyStep',
            state:{
                firstStep:0,
                secondStep:0,
                showName:this.state.data.name,
                ticketInfo:this.state.ticketDetails[this.state.pickeddate][this.state.picktime][this.state.pickpriceIdx],
                number:this.state.pickticknum,
                totalPrice:this.state.pickticknum * this.state.ticketDetails[this.state.pickeddate][this.state.picktime][this.state.pickpriceIdx].price,
                isCart:0,
            }
        })
        console.log(window.location.pathname);
    }
    render(){
        console.log(this.state)
        let timebutton=[];
        if(this.state.picktime!==""){
        for(var time in this.state.ticketDetails[this.state.pickeddate]){
            console.log("refresh pricebutton")
           // let temp=this.state.times[i];
            timebutton.push(<div className="radiobuttonblock"><RadioButton className="radiobutton" value={time}>{time}</RadioButton></div>)
         }
        }
        let pricebutton=[];
        if(this.state.picktime!=="") {
            console.log("refresh pricebutton")
            for (var i in this.state.ticketDetails[this.state.pickeddate][this.state.picktime]) {
                let temp = this.state.ticketDetails[this.state.pickeddate][this.state.picktime][i];
                // let price = {
                //     ticketId: temp.ticketId,
                //     seat: temp.seat,
                //     price: temp.price,
                //     stock: temp.stock,
                // };
                pricebutton.push(<div className="radiobuttonblock"><RadioButton className="priceradiobutton"
                                                                                value={parseInt(i,10)}>{temp.seat + '￥' + temp.price}</RadioButton>
                </div>)
            }
        }
        let onsaleinfo=[];
        for(let i=0;i<this.state.onsaleinfo.length;i++){
            console.log("refresh pricebutton")
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
                                                                    <RadioGroup  onChange={this.selecttime} value={this.state.picktime}>
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
                                                                    <div className="priceclassblock">
                                                                    <RadioGroup onChange={this.selectprice} value={this.state.pickpriceIdx}>
                                                                        {pricebutton}
                                                                    </RadioGroup>
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
                                                                        <p className="price">{'￥'+this.state.ticketDetails[this.state.pickeddate][this.state.picktime][this.state.pickpriceIdx].price*this.state.pickticknum}</p>
                                                                    </div>
                                                                </Col>
                                                                <Col span={4}>
                                                                    <Button type="primary" size="large" onClick={this.handleShopCart}>加入购物车</Button>
                                                                </Col>
                                                                <Col span={1}/>
                                                                <Col span={4}>
                                                                    <Button type="primary" size="large" onClick={this.toBuyStep}>立即购买</Button>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={6} id="side" className="test">
                                        <ShowLocation style={{
                                            width: "100%",
                                            height: 250,
                                            marginTop: 30,
                                        }}/>
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