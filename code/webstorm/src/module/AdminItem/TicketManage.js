import React, { Component } from 'react';
import { Table, Icon, Divider,Button } from 'antd';

const columns = [{
    title: '缩略图',
    key: 'image',
    render: (text, record) => (<img style={{width:'60px'}} src={record.image}/>)
},{
    title: '票品名称',
    dataIndex: 'ticketName',
    key: 'ticketName',
},{
    title:'价格',
    dataIndex:'price',
    key:'price',
},{
    title: '数量',
    dataIndex: 'count',
    key: 'count',
},{
    title: '开始时间',
    dataIndex: 'time',
    key: 'time',
},{
    title: '地点',
    dataIndex: 'address',
    key: 'address',
},{
    title: '详细信息',
    dataIndex: 'detail',
    key: 'detail',
},{
    title:'操作',
    key:'action',
    render: (text) => (
        <span>
      <a href="javascript:;">编辑</a>
      <Divider type="vertical" />
      <a href="javascript:;">下架</a>
    </span>
    ),
}];

const data = [];
for(let i = 1; i < 20; i++){
    data.push({
        image:"https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg",
        ticketName:`title${i}`,
        price:`${i}`,
        count:`${i^2}`,
        address:'菁菁堂',
        time:'2018/07/06',
    })
}

class TicketManage extends Component{

    render(){
        return(
            <div>
                <Button type="dashed" ><Icon type="plus"/>新增票品</Button>
                <Table columns={columns} dataSource={data} style={{marginTop:16}}/>
            </div>
        )
    }
}

export default TicketManage;