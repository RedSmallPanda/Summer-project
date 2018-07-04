import React, { Component } from 'react';
import { Table, Icon, Divider, InputNumber , Button ,Row, Col} from 'antd';


function amountOnChange(value,e) {
    console.log('changed', value);
    for(var i=0;i<data.length;i++){

    }
}

const columns = [{
    title: '缩略图',
    key: 'img',
    render: (text, record) => (<img style={{width:'60px'}} src={record.img}/>)
},{
    title: '票品信息',
    dataIndex: 'name',
    render: text => <a href="javascript:;">{text}</a>,
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
},
    {
        title: '操作',
        key: 'action',
        render: () => (
            <span>
      <a href="javascript:;">评价</a>
      <Divider type="vertical" />
    </span>
        ),
    }];
const data = [{
    key: '1',
    img:'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',
    name: '周杰伦演唱会',
    price: '￥1200',
    amount: 1,
    totalPrice:'￥1200'
}, {
    key: '2',
    img:'https://pimg.dmcdn.cn/perform/project/1523/152368_n.jpg',
    name: '张学友演唱会',
    price: '￥2000',
    amount: 2,
    totalPrice:'￥4000'
}];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

class Order extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        data:data,
    };

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    render(){
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        let orderTable=
            <div>
                <Table columns={columns} dataSource={data} />
            </div>;
        return(
            orderTable
        )
    }
}

export default Order;