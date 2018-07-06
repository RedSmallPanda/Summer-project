import React, { Component } from 'react';
import { Table, Avatar, Divider } from 'antd';

const columns = [{
    title:'订单编号',
    dataIndex:'orderId',
    key:'orderId',
},{
    title: '票品名称',
    dataIndex: 'ticketName',
    key: 'ticketName',
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
    render: (text) => (
        <span>
      <a href="javascript:;">批准</a>
      <Divider type="vertical" />
      <a href="javascript:;">拒绝</a>
    </span>
    ),
}];

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
    render(){
        return(
            <div>
                <Table columns={columns}
                       expandedRowRender={record => <p style={{ margin: 0 }}>
                           {'数量：'+record.count + '   总价：'+record.amount +'   退款理由：'+record.reason}
                           </p>}
                       dataSource={data}/>
            </div>
        )
    }
}

export default RefundAudit;