import React, { Component } from 'react';
import { Table } from 'antd';
import { browserHistory } from 'react-router'
import axios from "axios/index";
import Image from '../MainPages/Image';

const action=[
    '已退款','评价','已评价'
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
         },*/{
            title: '票品信息',
            dataIndex: 'detailInfo',
            render: (text, record) => (<div>
                <p><a onClick={this.handleDetail}>{record.detailInfo.showName}</a></p>
                <p>{record.detailInfo.showDate}</p>
            </div>)
        }, {
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
                render: (record) => (
                    <span>
                        <a onClick={()=>this.handleComment(record.showId,record.orderId,record.state)}>{action[parseInt(record.state,10)-4]}</a>
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
        axios.get("/getHistoryOrder",{
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

    handleComment = (showId,orderId,state) =>{
        if(state==='5'){
            browserHistory.push({
                pathname:'/commentPage',
                state:{
                    purpose: "add",
                    showId: showId,
                    orderId:orderId,
                    isFromOrder:1,
                }
            });
        }
    };

    handleDetail = () =>{
        browserHistory.push('/detail')
    };


    render(){
        // const { loading, selectedRowKeys } = this.state;
        // const rowSelection = {
        //     selectedRowKeys,
        //     onChange: this.onSelectChange,
        // };
        // const hasSelected = selectedRowKeys.length > 0;
        let orderTable=
            <div>
                <Table columns={this.columns} dataSource={this.state.data} size="small"/>
            </div>;
        return(
            orderTable
        )
    }
}

export default Order;