import React, { Component } from 'react';
import { Table } from 'antd';
import { browserHistory } from 'react-router'
import axios from 'axios';

// const data = [{
//     key: '1',
//     img:'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',
//     detailInfo: {
//         name:'周杰伦演唱会',
//         date:'2018/1/2'
//     },
//     price: '￥1200',
//     amount: 1,
//     totalPrice:'￥1200'
// }, {
//     key: '2',
//     img:'https://pimg.dmcdn.cn/perform/project/1523/152368_n.jpg',
//     detailInfo: {
//         name:'张学友演唱会',
//         date:'2017/2/14'
//     },
//     price: '￥2000',
//     amount: 2,
//     totalPrice:'￥4000'
// }, {
//     key: '3',
//     img:'https://img1.tking.cn/assets/img/YnPS4jNY6p.jpg',
//     detailInfo: {
//         name:'CCG门票',
//         date:'2018/4/8'
//     },
//     price: '￥300',
//     amount: 1,
//     totalPrice:'￥300'
// }, {
//     key: '4',
//     img:'https://pimg.dmcdn.cn/perform/project/1521/152193_n.jpg',
//     detailInfo: {
//         name:'迪士尼门票',
//         date:'2018/7/6'
//     },
//     price: '￥688',
//     amount: 1,
//     totalPrice:'￥688'
// }];

/*const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};*/

class Order extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            data:[],
        };
        this.columns = [{
            title: '缩略图',
            key: 'img',
            render: (text, record) => (<img style={{width:'60px'}} src={record.img} alt="default"/>)
        },/*{
         title: '票品信息',
         dataIndex: 'name',
         render: text => <a href="javascript:;">{text}</a>,
         },*/
            {
                title: '票品信息',
                dataIndex: 'detailInfo',
                render: (text, record) => (<div>
                    <p><a onClick={this.handleDetail}>{record.detailInfo.showName}</a></p>
                    <p>{record.detailInfo.showDate}</p>
                </div>)
            },{
                title: '单价',
                dataIndex: 'price',
            }, {
                title: '数量',
                dataIndex: 'number',
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
      <a onClick={this.handleRefund}>退款</a>
    </span>
                ),
            }];
    }

    // start = () => {
    //     this.setState({ loading: true });
    //     // ajax request after empty completing
    //     setTimeout(() => {
    //         this.setState({
    //             selectedRowKeys: [],
    //             loading: false,
    //         });
    //     }, 1000);
    // }

    // onSelectChange = (selectedRowKeys) => {
    //     console.log('selectedRowKeys changed: ', selectedRowKeys);
    //     this.setState({ selectedRowKeys });
    // }

    componentDidMount(){
        let self = this;
        axios.get("/getCurrentOrder",{
            params:{
                userId: 1,
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

    handleRefund = () =>{
        browserHistory.push('/refundPage')
    };

    handleDetail = () =>{
        browserHistory.push('/detail')
    };

    render(){
        // const { selectedRowKeys } = this.state;
        // const rowSelection = {
        //     selectedRowKeys,
        //     onChange: this.onSelectChange,
        // };
        // const hasSelected = selectedRowKeys.length > 0;
        let orderTable=
            <div>
                <Table columns={this.columns} dataSource={this.state.data}
                       pagination={{
                           pageSize: 10,
                       }}/>
            </div>;
        return(
            orderTable
        )
    }
}

export default Order;