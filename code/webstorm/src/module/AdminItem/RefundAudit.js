import React, { Component } from 'react';
import { Table, Divider } from 'antd';
import axios from "axios/index";

/*const columns = [{
    title:'订单编号',
    dataIndex:'orderId',
    key:'orderId',
},{
    title: '票品名称',
    dataIndex: 'showName',
    key: 'showName',
},{
    title:'下单时间',
    dataIndex:'time',
    key:'time',
}, {
    title:'退款申请提交时间',
    dataIndex:'refundTime',
    key:'refundTime',
}, {
    title:'状态',
    dataIndex:'state',
    key:'state',
}, {
    title:'操作',
    key:'action',
    render: (text,record) => (
        <span>
      <a onClick={handleAction1}>{action1[parseInt(record.state)]}</a>
      <Divider type="vertical" />
      <a onClick={handleAction2}>{action2[parseInt(record.state)]}</a>
    </span>
    ),
}];*/

const data = [];
for(let i = 1; i < 20; i++){
    data.push({
        orderId:`${i}`,
        ticketName:`title${i}`,
        count:`${i}`,
        amount:`${i * i}`,
        time:'2018/07/06 16:37',
        refundTime:'2018/07/07 8:56',
        state:'未处理',
        reason:'太贵了不想去看了'
    })
}

class RefundAudit extends Component{

    columns = [{
        title:'订单编号',
        dataIndex:'orderId',
        key:'orderId',
    },{
        title: '票品名称',
        dataIndex: 'showName',
        key: 'showName',
    },{
        title:'下单时间',
        dataIndex:'time',
        key:'time',
    }, {
        title:'退款申请提交时间',
        dataIndex:'refundTime',
        key:'refundTime',
    }, {
        title:'状态',
        dataIndex:'state',
        key:'state',
    }, {
        title:'操作',
        key:'action',
        render: (text,record) => (
            <span>
      <a onClick={()=>this.handleAction1(record.orderId)}>批准</a>
      <Divider type="vertical" />
      <a onClick={()=>this.handleAction2(record.orderId)}>拒绝</a>
    </span>
        ),
    }];

    state={
        data:[]
    }

    componentDidMount(){
        let self = this;
        axios.get("/getRefundOrder",{
            params:{

            }
        })
            .then(function (response) {
                console.log(response);
                self.setState({
                    loading: false,
                    data: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleAction1 = (orderId) =>{
        axios.get("/approveRefund",{
            params:{
                orderId:orderId,
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        let newData=this.state.data;
        let index = newData.findIndex(item => orderId === item.orderId);
        newData.splice(index, 1);
        this.setState({
            data:newData,
        })
    };

    handleAction2 = (orderId) =>{
        axios.get("/rejectRefund",{
            params:{
                orderId:orderId,
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        let newData=this.state.data;
        let index = newData.findIndex(item => orderId === item.orderId);
        newData.splice(index, 1);
        this.setState({
            data:newData,
        })
    };

    render(){
        return(
            <div>
                <Table columns={this.columns}
                       expandedRowRender={record => <p style={{ margin: 0 }}>
                           {'数量：'+record.number + '   总价：'+record.totalPrice +'   退款理由：'+record.reason}
                           </p>}
                       dataSource={this.state.data}/>
            </div>
        )
    }
}

export default RefundAudit;