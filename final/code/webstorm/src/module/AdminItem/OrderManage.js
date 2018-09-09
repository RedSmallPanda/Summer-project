import React, { Component } from 'react';
import { Table, Divider ,Input, Button, Col} from 'antd';
import axios from "axios/index";


const InputGroup = Input.Group;

class OrderManage extends Component{

    columns = [{
        title:'订单编号',
        dataIndex:'orderId',
        key:'orderId',
    },{
        title:'用户ID',
        dataIndex:'userId',
        key:'userId',
    },{
        title: '票品ID',
        dataIndex: 'ticketId',
        key: 'ticketId',
    },{
        title:'下单时间',
        dataIndex:'time',
        key:'time',
    }, {
        title:'数量',
        dataIndex:'number',
        key:'number',
    }, {
        title:'订单金额',
        dataIndex:'totalPrice',
        key:'totalPrice',
    }, {
        title:'订单状态',
        dataIndex:'state',
        key:'state',
    }];

    state={
        data:[],
        orderId:'',
        userId:'',
    };

    getData(userId,orderId,page) {
        let self = this;


        axios.get("/getAllOrders",{
            params:{
                userId:userId,
                orderId:orderId,
                page:page,
            }
        })
            .then(function (response) {
                console.log(response);

                let size=response.data[response.data.length-1].number;
                console.log("sizeeeeee:",size);
                let data = [];
                for (let i = 0; i < size; i++) {
                    data.push({title: "xxx"});
                }

                let listData = response.data;
                //let tempData = self.state.data;
                let tempData=data;
                for (let i = 0; i < listData.length-1; i++) {
                    tempData.splice((page-1)*10+i,1,listData[i]);
                }
                console.log(tempData);

                self.setState({
                    data: tempData,
                    page:page,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount(){
        let self = this;

        axios.get("/getAllOrdersAndNumber",{
            params:{
                userId:-1,
                orderId:-1,
                page:1,
            }
        })
            .then(function (response) {
                let size=0;
                if(response.data.length>0) {
                    size = response.data[response.data.length - 1].number;
                    console.log("sizeeeeee:", size);
                }
                let data = [];
                for (let i = 0; i < size; i++) {
                    data.push({title: "xxx"});
                }

                let listData = response.data;
                //let tempData = self.state.data;
                let tempData=data;
                for (let i = 0; i < listData.length-1; i++) {
                    tempData.splice(i, 1, listData[i]);
                }
                console.log(tempData);

                self.setState({
                    data: tempData,
                    page:1,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onSearch(self){
        let odid=self.state.orderId;
        let usid=self.state.userId;
        if(isNaN(odid)===true || isNaN(usid)===true || odid.indexOf(' ')!==-1 || usid.indexOf(' ')!==-1){
            alert("订单号 和 用户ID 必须为数字");
        }
        else{
            axios.get("/getAllOrdersAndNumber",{
                params:{
                    userId:usid,
                    orderId:odid,
                    page:1,
                }
            })
                .then(function (response) {

                    let size=0;
                    if(response.data.length>0) {
                        size = response.data[response.data.length - 1].number;
                        console.log("sizeeeeee:", size);
                    }
                    let data = [];
                    for (let i = 0; i < size; i++) {
                        data.push({title: "xxx"});
                    }

                    let listData = response.data;
                    //let tempData = self.state.data;
                    let tempData=data;
                    for (let i = 0; i < listData.length-1; i++) {
                        tempData.splice(i, 1, listData[i]);
                    }
                    console.log(tempData);

                    self.setState({
                        data: tempData,
                        page:1,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    getPageData(userId,orderId,page){
        let self=this;
        axios.get("/getAllOrders",{
            params:{
                userId:userId,
                orderId:orderId,
                page:page,
            }
        })
            .then(function (response) {
                console.log(response);
                // alert(JSON.stringify(response.data[0]));
                let listData = response.data;
                let tempData=self.state.data;
                for(let i=0;i<listData.length;i++){
                    tempData.splice((page-1)*10+i,1,listData[i]);
                }
                self.setState({
                    loading: false,
                    data: tempData,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    orderIdOnChange = (e) =>{
        console.log(e.target.value);
        let self=this;
        self.setState({
            orderId:e.target.value,
        })
    }

    userIdOnChange = (e) =>{
        console.log(e.target.value);
        let self=this;
        self.setState({
            userId:e.target.value,
        })
    }

    render(){
        return(
            <div>
                <InputGroup size="small">
                    <Col span={8}>
                        <Input id="orderIdInput" value={this.state.orderId} placeholder="请输入订单号" onChange={this.orderIdOnChange}/>
                    </Col>
                    <Col span={8}>
                        <Input id="userIdInput" value={this.state.userId} placeholder="请输入用户ID" onChange={this.userIdOnChange}/>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" shape="circle" icon="search" onClick={() => this.onSearch(this)}/>
                    </Col>
                </InputGroup>
                <br/>
                <Table columns={this.columns}
                       dataSource={this.state.data}
                       pagination={{
                           onChange: (page) => {
                               console.log(page);
                               this.getPageData(this.state.userId,this.state.orderId,page);
                               this.setState({
                                   page:page,
                               });
                           },
                           pageSize: 10,
                           current: this.state.page,
                       }}/>
            </div>
        )
    }
}

export default OrderManage;