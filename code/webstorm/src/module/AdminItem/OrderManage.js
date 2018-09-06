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
        let size=0;
        axios.get("/getOriginOrderNumber",{
            params:{
                userId:userId,
                orderId:orderId,
            }
        })
            .then(function (response) {
                console.log(response);
                // alert(JSON.stringify(response.data[0]));

                console.log("dataaaaaa: " + response.data);
                console.log("sizeeeeee: " + self.state.size);
                size = response.data;
                console.log(size);
                let data = [];
                for (let i = 0; i < size; i++) {
                    data.push({title: "xxx"});
                }
                console.log("originnnnnn: " + self.state.data.length);
                console.log(size);
                console.log(data);
                self.setState({
                    data: data,
                    size: response.data,
                    page: page,
                });
            })
            .catch(function (error) {
                console.log(error);
            });

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

    componentDidMount(){
        let self = this;
        let size=0;
        axios.get("/getOriginOrderNumber",{
            params:{
                userId:-1,
                orderId:-1,
            }
        })
            .then(function (response) {
                console.log(response);
                // alert(JSON.stringify(response.data[0]));

                console.log("dataaaaaa: " + response.data);
                console.log("sizeeeeee: " + self.state.size);
                size = response.data;
                console.log(size);
                let data = [];
                for (let i = 0; i < size; i++) {
                    data.push({title: "xxx"});
                }
                console.log("originnnnnn: " + self.state.data.length);
                console.log(size);
                console.log(data);
                self.setState({
                    data: data,
                    size: response.data,
                    page: 1,
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("/getAllOrders",{
            params:{
                userId:-1,
                orderId:-1,
                page:1,
            }
        })
            .then(function (response) {
                console.log(response);
                // alert(JSON.stringify(response.data[0]));
                let listData = response.data;
                let tempData=self.state.data;
                for(let i=0;i<listData.length;i++){
                    tempData.splice(i,1,listData[i]);
                }
                self.setState({
                    data: tempData,
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
            self.getData(usid,odid,1);
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