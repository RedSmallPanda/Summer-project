import React, { Component } from 'react';
import { Table, Avatar, Divider, Icon, Button } from 'antd';


const columns = [{
    title:'头像',
    dataIndex:'avatar',
    key:'avatar',
},{
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
},{
    title:'密码',
    dataIndex:'password',
    key:'password'
},{
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
},{
    title:'邮箱',
    dataIndex:'email',
    key:'email',
}, {
    title:'操作',
    key:'action',
    render: (text) => (
        <span>
      <a href="javascript:;">编辑</a>
      <Divider type="vertical" />
      <a href="javascript:;">删除</a>
            <Divider type="vertical" />
      <a href="javascript:;">禁用</a>
    </span>
    ),
}];

const data = [];
for(let i = 0; i < 20; i++){
    data.push({
        avatar:<Avatar icon="user" />,
        username:`Jack${i}`,
        password:'123456',
        phone:18812345678,
        email:'123456@qq.com',


    })
}
class UserManage extends Component{

    render(){
        return(
            <div>
                <Button type="dashed" ><Icon type="plus"/>新增用户</Button>
                <Table columns={columns} dataSource={data}style={{marginTop:16}}/>
            </div>
        )
    }
}

export default UserManage;