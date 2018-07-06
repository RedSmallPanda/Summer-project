import React, { Component } from 'react';
import { Table, Avatar, Divider } from 'antd';

const columns = [{
    title: '票品名称',
    dataIndex: 'ticketName',
    key: 'ticketName',
},{
    title: '数量',
    dataIndex: 'count',
    key: 'count',
},{
    title:'总价',
    dataIndex:'amount',
    key:'amount',
}, {
    title:'下单时间',
    dataIndex:'time',
    key:'time',
}, {
    title:'状态',
    dataIndex:'state',
    key:'state',
}, {
    title:'操作',
    key:'action',
}];

class SalesData extends Component{

    render(){
        return(
            <div>

            </div>
        )
    }
}

export default SalesData;