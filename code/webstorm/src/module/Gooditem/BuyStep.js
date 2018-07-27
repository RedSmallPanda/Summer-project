import React, { Component } from 'react';
import { Steps, Row, Col, Icon, Table, Button, Radio, Divider, Menu, Dropdown} from 'antd';
import '../../css/BuyStep.css';
import axios from "axios/index";
import { browserHistory} from 'react-router';

const Step=Steps.Step;

const RadioGroup = Radio.Group;

/*const ticketInfo = [{
    ticketId:"1",
    key: '0',
    img:'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',
    detailInfo: {
        name:'周杰伦演唱会',
        date:'2018/1/2'
    },
    price: '1000',
    amount: 3,
    totalPrice:'3000'
}];*/

const dataColumns = [{
    title: '缩略图',
    key: 'img',
    render: (text, record) => (<img style={{width:'60px'}} src={record.img} alt="default"/>)
},/*{
    title: '票品信息',
    dataIndex: 'name',
    render: text => <a href="javascript:;">{text}</a>,
},*/{
    title: '票品信息',
    dataIndex: 'detailInfo',
    render: (text, record) => (<div>
        <p><a>{record.detailInfo.name}</a></p>
        <p>{record.detailInfo.date}</p>
    </div>)
}, {
    title: '单价',
    dataIndex: 'price',
}, {
    title: '数量',
    dataIndex: 'amount',
    //render: (text, record) => (<InputNumber min={1} max={10} defaultValue={record.amount} onChange={amountOnChange} />),
},{
    title: '金额',
    dataIndex: 'totalPrice',
}];

const addressColumns = [{
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
}, {
    title: '地区',
    dataIndex: 'district',
    key: 'district',
}, {
    title: '详细地址',
    dataIndex:'detail',
    key: 'detail',
}];

const address=[{
    key:0,
    name:'小明',
    phone: '18800000000',
    province:'上海',
    city:'上海',
    block:'闵行区',
    detail:'无',
}, {
    key:1,
    name:'小花',
    phone:'18700000000',
    province:'浙江',
    city:'杭州',
    block:'上城区',
    detail:'无',
}, {
    key:2,
    name:'小白',
    phone:'13800000000',
    province:'上海',
    city:'上海',
    block:'闵行',
    detail:'东川路800号',
}];


class BuyStep extends Component {

    constructor(props){
        super(props);
        this.ticketInfo = [{
            ticketId:this.props.location.state.ticketInfo.ticketId,
            key: '0',
            img:'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',
            detailInfo: {
                name:this.props.location.state.showName,
                date:this.props.location.state.ticketInfo.time,
            },
            price: this.props.location.state.ticketInfo.price,
            amount: this.props.location.state.number,
            totalPrice:this.props.location.state.totalPrice,
        }];

        this.state={
            firstStep:this.props.location.state.firstStep,
            secondStep:this.props.location.state.secondStep,
            //orderInfo:this.ticketInfo,
            selectedRow:[0],
            data:this.ticketInfo,
            address:address,
            coupon:[
                /*{key:"0",id:"12331",discount:"30",discCond:'300',number:"2"},
            {key:"1",id:"asda7",discount:"50",discCond:'500',number:"3"},
            {key:"2",id:"dasj86",discount:"10",discCond:'100',number:"1"},*/

            ],
            selectedCoupon:"请选择优惠券",
            selectedCouponId:"",
            originTotalPrice:this.props.location.state.totalPrice,
            totalPrice:this.props.location.state.totalPrice,
            getNoCoupon:0,
            newCoupon:[{discCond:"100000",discount:"30"}],
            orderId:this.props.location.state.orderId,
            isCart:this.props.location.state.isCart,
        };
    }

    confirmS1 = () => {
        console.log('step changed to: 1');
        let self = this;
        axios.get("/createOrder",{
            params:{
                userId: 1,
                totalPrice: this.state.totalPrice,
                ticketId:this.state.data[0].ticketId,
                number:this.state.data[0].amount,
                price:this.state.data[0].price,
                province:this.state.address[this.state.selectedRow[0]].province,
                city:this.state.address[this.state.selectedRow[0]].city,
                block:this.state.address[this.state.selectedRow[0]].block,
                addrDetail:this.state.address[this.state.selectedRow[0]].detail,
                phone:this.state.address[this.state.selectedRow[0]].phone,
                name:this.state.address[this.state.selectedRow[0]].name,
                couponId:this.state.selectedCouponId,
            }

        })
            .then(function (response) {
                console.log(response);
                if(response.data[0]===false){
                    alert("很抱歉，库存不足，请重新选购！");
                    browserHistory.push({
                        pathname:'/detail',
                    })
                }
                else{
                    self.setState({orderId:response.data[1]});
                }

            })
            .catch(function (error) {
                console.log(error);
            });

        if(this.state.isCart===1){
            axios.get("/deleteCart",{
                params:{
                    ticketId:this.state.data[0].ticketId,
                }

            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        this.setState({firstStep:1});
    }

    confirmS2 = () => {
        console.log('step changed to: 2');
        this.setState({secondStep:1});
        let self = this;
        axios.get("/giveMeCoupon",{
            params:{
                userId: 1,
                price: this.state.totalPrice,
                orderId:this.state.orderId,
            }
        })
            .then(function (response) {
                console.log(response);
                if(response.data.length===0){
                    self.setState({getNoCoupon:1});
                }
                else{
                    self.setState({newCoupon:response.data});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRow:selectedRowKeys });
    }

    handleMenuClick = (item) => {
        console.log('click', item.key);
        console.log("selected id",this.state.coupon[item.key].couponId);
        this.setState({selectedCoupon:"满"+this.state.coupon[item.key].discCond+"元减"+this.state.coupon[item.key].discount+"元",selectedCouponId:this.state.coupon[item.key].couponId});
        this.setState({totalPrice:this.state.originTotalPrice-parseInt(this.state.coupon[item.key].discount,10)});
    }

    calculateOriginTotalPrice = () =>{
        let tempData=this.state.data;
        let i=0;
        let totalPrice=0;
        for(i;i<tempData.length;i++){
            //let totPrice=tempData[i].totalPrice.substring(1,totalPrice.length);
            totalPrice=totalPrice + parseInt(tempData[i].totalPrice,10);
        }
        this.setState({totalPrice:"5000"});
        this.setState({originTotalPrice:totalPrice});
    }


    componentDidMount(){
        let self = this;
        axios.get("/getMyCouponByPrice",{
            params:{
                userId: 1,
                price: this.state.totalPrice
            }
        })
            .then(function (response) {
                console.log(response);
                self.setState({
                    coupon: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("/getSplitAddress",{
            params:{
                userId: 1,
            }
        })
            .then(function (response) {
                console.log(response);
                self.setState({address:response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        let j=0;
        let originCouponList=this.state.coupon;
        let allCoupon=[];
        for(j;j<originCouponList.length;j++){
            let num=parseInt(originCouponList[j].number,10);
            let k=0;
            for(k;k<num;k++){
                allCoupon.push(originCouponList[j]);
            }
        }
        console.log(allCoupon);

        let Result = allCoupon.map((val, ind)=>{
            return  <Menu.Item key={val.key}>满{val.discCond}元减{val.discount}元</Menu.Item>
        });

        let selectedRowKeys = this.state.selectedRow;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            onSelection: this.onSelection,
            type:"radio",
        };

        let menu = (
            <Menu onClick={this.handleMenuClick}>
                {Result}
            </Menu>
        );

        let step0Page=<div>
            <Table rowSelection={rowSelection} columns ={addressColumns} dataSource={this.state.address} pagination={{pageSize:5,hideOnSinglePage:true}}/>
            <br/>
            <br/>
            <br/>
            <Table columns ={dataColumns} dataSource={this.ticketInfo} pagination={{pageSize:5,hideOnSinglePage:true}}/>
            <br/>
            <div>
                <Button style={{float:"right",width:"110px"}} type="primary" onClick={this.confirmS1} size="large">确认</Button>
                <Dropdown overlay={menu}>
                    <Button size="large">
                        {this.state.selectedCoupon} <Icon type="down" />
                    </Button>
                </Dropdown>
                <h2 style={{float:"right",fontWeight:"bolder",color:"#1e90ff"}}>总价：￥{this.state.totalPrice}&emsp;</h2>
            </div>
        </div>;

        let step1Page=<div>
            <br/>
            <br/>
            <RadioGroup defaultValue={1}>
                <Radio className="radioStyle" value={1}><Icon type="alipay" />   支付宝</Radio>
                <Divider/>
                <Radio className="radioStyle" value={2}><Icon type="wechat" />   微信支付</Radio>
                <Divider/>
                <Radio className="radioStyle" value={3}><Icon type="credit-card" />   银行卡</Radio>
            </RadioGroup>
            <br/>
            <br/>
            <br/>
            <br/>
            <Button type="primary" onClick={this.confirmS2}>付款完成</Button>
        </div>

        let step2PageV1=<div>
            <br/>
            <div className="recBorder">
                &emsp;<Icon type="check" style={{ fontSize: 50, color: '#4cc232'}}/>&ensp;您已完成付款!
            </div>
            <br/>
            <br/>
            <div className="dashedDiv">
                <br/>
                <br/>
                <h1 style={{textAlign:'center',fontFamily:'Hiragino Sans GB'}}>这次没拿到优惠券，请再接再厉哦！</h1>
            </div>
        </div>

        let step2PageV2=<div>
            <br/>
            <div className="recBorder">
                &emsp;<Icon type="check" style={{ fontSize: 50, color: '#4cc232'}}/>&ensp;您已完成付款!
            </div>
            <br/>
            <br/>
            <div className="dashedDiv">
                <br/>
                <br/>
                <h1 style={{textAlign:'center',fontFamily:'Hiragino Sans GB'}}>恭喜您获得了&ensp;满{this.state.newCoupon[0].discCond}减{this.state.newCoupon[0].discount}元&ensp;优惠券！</h1>
            </div>
        </div>

        let showPage=null;
        if(this.state.firstStep===0&&this.state.secondStep===0){
            showPage=step0Page;
        }
        else if(this.state.firstStep===1&&this.state.secondStep===0){
            showPage=step1Page;
        }
        else if(this.state.firstStep===1&&this.state.secondStep===1&&this.state.getNoCoupon===1){
            showPage=step2PageV1;
        }
        else{
            showPage=step2PageV2;
        }
        return (
            <div>
                <br/>
                <br/>
                <Row>
                    <Col span={4}/>
                    <Col span={16}>
                        <Steps current={this.state.firstStep+this.state.secondStep} align="left">
                            <Step title="确认信息" />
                            <Step title="付款" />
                            <Step title="付款成功" />
                        </Steps>
                        <br/>
                        <br/>
                        {showPage}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BuyStep;