import React, { Component } from 'react';
import { Table } from 'antd';
import { browserHistory } from 'react-router'
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from '../MainPages/Image'

// const data = [{
//     key: '1',
//     img:'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',
//     detailInfo: {
//         showName:'周杰伦演唱会',
//         showDate:'2018/1/2'
//     },
//     price: '1200',
//     number: 1,
//     totalPrice:'1200',
//     state:'0'
// }, {
//     key: '2',
//     img:'https://pimg.dmcdn.cn/perform/project/1523/152368_n.jpg',
//     detailInfo: {
//         showName:'张学友演唱会',
//         showDate:'2017/2/14'
//     },
//     price: '2000',
//     number: 2,
//     totalPrice:'4000',
//     state:'0'
// }, {
//     key: '3',
//     img:'https://img1.tking.cn/assets/img/YnPS4jNY6p.jpg',
//     detailInfo: {
//         showName:'CCG门票',
//         showDate:'2018/4/8'
//     },
//     price: '300',
//     number: 1,
//     totalPrice:'300',
//     state:'1'
// }, {
//     key: '4',
//     img:'https://pimg.dmcdn.cn/perform/project/1521/152193_n.jpg',
//     detailInfo: {
//         showName:'迪士尼门票',
//         showDate:'2018/7/6'
//     },
//     price: '688',
//     number: 1,
//     totalPrice:'688',
//     state:'2'
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

const action=[
    '去付款',
    '申请退款',
    '取消退款',
    '退款失败'
];

class Order extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            data:[]
        };
        this.columns = [{
            title: '缩略图',
            key: 'img',
            render: (text, record) => (<Image width={60} showId={record.showId}/>)
        },/*{
         title: '票品信息',
         dataIndex: 'name',
         render: text => <a href="javascript:;">{text}</a>,
         },*/
            {
                title: '票品信息',
                dataIndex: 'detailInfo',
                render: (text, record) => (<div>
                    <p><a onClick={()=>this.handleDetail(record.showId)}>{record.detailInfo.showName}</a></p>
                    <p>{record.detailInfo.showDate}</p>
                </div>)
            },{
                title: '单价',
                dataIndex: 'price',
                render: (text, record) => (<span>{'￥ ' + text}</span>)
            }, {
                title: '数量',
                dataIndex: 'number',
                //render: (text, record) => (<InputNumber min={1} max={10} defaultValue={record.amount} onChange={amountOnChange} />),
            },{
                title: '金额',
                dataIndex: 'totalPrice',
                render: (text, record) => (<span>{'￥ ' + text}</span>)
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a onClick={()=>this.handleAction(record.showId,record.state,record.orderId,record.totalPrice)}>{action[parseInt(record.state,10)]}</a>
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
        axios.get("/getCurrentOrder")
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

    handleAction = (showId,state,orderId,totalPrice) =>{
        let id=orderId;
        if(state==='0'){
            browserHistory.push({
                pathname:'/buyStep',
                state:{
                    showId:showId,
                    orderId:id,
                    firstStep:1,
                    secondStep:0,
                    totalPrice:totalPrice,
                    ticketInfo:[],
                    isCart:0,
                }
            });
            Cookies.set('orderId',id);
            Cookies.set('firstStep',1);
            Cookies.set('secondStep',0);
            Cookies.set('totalPrice',totalPrice);
            Cookies.set('ticketInfo',[]);
            Cookies.set('isCart',0);
            Cookies.set('getNoCoupon',0);
            Cookies.set('newCoupon',{discCond:"100000",discount:"30"});
        }
        else if(state==='1'){
            browserHistory.push({
                pathname:'/refundPage',
                state:{
                    showId:showId,
                    orderId:id,
                }
            })
        }
        else if(state==='2'){
            axios.get("/dontWantToRefund",{
                params:{
                    showId:showId,
                    orderId:orderId,
                }
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            window.location.reload();
        }
    };

    handleDetail = (showId) =>{
        browserHistory.push('/detail/'+showId)
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
                       }} size="small"/>
            </div>;
        return(
            orderTable
        )
    }
}

export default Order;