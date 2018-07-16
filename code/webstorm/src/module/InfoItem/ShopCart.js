import React, { Component } from 'react';
import { Table } from 'antd';
import { browserHistory } from 'react-router'

const data = [{
    key: '1',
    img:'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',
    detailInfo: {
        name:'周杰伦演唱会',
        date:'2018/1/2'
    },
    price: '￥1200',
    amount: 1,
    totalPrice:'￥1200'
}, ];

class ShopCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
            data:data,
        };
        this.columns = [{
            title: '缩略图',
            key: 'img',
            render: (text, record) => (<img style={{width:'60px'}} src={record.img} alt="default"/>)
        }, {
                title: '票品信息',
                dataIndex: 'detailInfo',
                render: (text, record) => (<div>
                    <p><a onClick={this.handleDetail}>{record.detailInfo.name}</a></p>
                    <p>{record.detailInfo.date}</p>
                </div>)
            },{
                title: '单价',
                dataIndex: 'price',
            }, {
                title: '数量',
                dataIndex: 'amount',
            },{
                title: '金额',
                dataIndex: 'totalPrice',
            },
            {
                title: '操作',
                key: 'action',
                render: () => (
                    <span>
      <a onClick={this.handleBuy}>购买</a>
    </span>
                ),
            }];
    }

    handleBuy = () =>{
        browserHistory.push('/buyStep')
    };

    handleDetail = () =>{
        browserHistory.push('/detail')
    };

    render(){
        let orderTable=
            <div>
                <Table columns={this.columns} dataSource={data}
                       pagination={{
                           pageSize: 10,
                       }}/>
            </div>;
        return(
            orderTable
        )
    }
}

export default ShopCart;