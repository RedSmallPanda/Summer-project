import React, {Component} from "react";
import {Row, Col} from 'antd';
import '../../css/Coupon.css';
import axios from "axios/index";


// const dsctData=[
//     {
//         name:'聚票优惠券',
//         discount:'30',
//         price:'300',
//         beginDate:'2018/6/1',
//         endDate:'2016/7/1'
//     },
//     {
//         name:'聚票优惠券',
//         discount:'50',
//         price:'500',
//         beginDate:'2018/8/1',
//         endDate:'2016/8/28'
//     },
//     {
//         name:'超级优惠券',
//         discount:'300',
//         price:'399',
//         beginDate:'2018/6/1',
//         endDate:'2016/7/1'
//     },
//     {
//         name:'无敌优惠券',
//         discount:'500',
//         price:'300',
//         beginDate:'2018/6/6',
//         endDate:'2016/7/7'
//     },
//     {
//         name:'聚票优惠券',
//         discount:'30',
//         price:'300',
//         beginDate:'2018/6/1',
//         endDate:'2016/7/1'
//     },
//     {
//         name:'聚票优惠券',
//         discount:'30',
//         price:'300',
//         beginDate:'2018/6/1',
//         endDate:'2016/7/1'
//     },
//     {
//         name:'究极优惠券',
//         discount:'3000',
//         price:'300',
//         beginDate:'2018/6/1',
//         endDate:'2016/7/1'
//     },
// ];


class CouponItem extends Component{

    render(){
        return(

                    <div className="couponItem">
                        <div className="addRadius" style={{height:'80px',background:'#1890ff'}}>
                            <Row>
                                <Col span={1}/>
                                <Col span={11}>
                                    <h4 style={{fontFamily:"Hiragino Sans GB", color:'#FFFFFF'}}>{this.props.data.title}</h4>
                                </Col>
                                <Col span={11}>
                                    <h2  style={{fontWeight:'900',float:'right'}}>￥{this.props.data.discount}</h2>
                                </Col>
                                <Col span={1}/>
                            </Row>
                        </div>
                        <div style={{height:'60px'}}/>
                        <div style={{height:'40px',lineHeight:'20px',fontSize:'20px',fontFamily:'Hiragino Sans GB'}}>
                            <h6>&emsp;满{this.props.data.discCond}可用{this.props.data.discount}元优惠券</h6>
                            <h6>&emsp;{this.props.data.begindate}&ensp;~&ensp;{this.props.data.enddate}</h6>
                        </div>
                    </div>

        )
    }
}

class Coupon extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount(){
        let self = this;
        axios.get("/getMyCoupon",{
            params:{
                userId: 1,
            }
        })
            .then(function (response) {
                console.log(response);
                self.setState({
                    data: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render(){
        let arr=[];
        let i=0;
        let j=0;
        let currentData=this.state.data;
        let discountData=[];
        for(j;j<currentData.length;j++){
            let num=parseInt(currentData[j].number,10);
            let k=0;
            for(k;k<num;k++){
                discountData.push(currentData[j]);
            }
        }
        for(i;i<discountData.length-1;i+=2){
            let res=
                <div>
                    <Row>
                        <Col span={1}/>
                        <Col span={10}>
                            <CouponItem data={discountData[i]}/>
                        </Col>
                        <Col span={2}/>
                        <Col span={10}>
                            <CouponItem data={discountData[i+1]}/>
                        </Col>
                        <Col span={1}/>
                    </Row>
                    <br/>
                    <br/>
                </div>;

            arr.push(res);
        }
        if(discountData.length%2!==0){
            let ress=
                <div>
                    <Row>
                        <Col span={1}/>
                        <Col span={10}>
                            <CouponItem data={discountData[discountData.length-1]}/>
                        </Col>
                        <Col span={2}/>
                        <Col span={10}/>
                        <Col span={1}/>
                    </Row>
                    <br/>
                    <br/>
                </div>;
                        arr.push(ress);
        }
        let result = arr.map((val, ind)=>{
            let value = val;    //数组中的每一项的值
            return <div>{value}</div>;    //数组中的每一项return出去为map方法的返回值
        });
        return result;
    }
}
export default Coupon;