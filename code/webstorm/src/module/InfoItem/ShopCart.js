import React, { Component } from 'react';
import {Divider, Modal, Table} from 'antd';
import { browserHistory } from 'react-router'
import axios from 'axios';
const data = [
    // {
    //     key: '1',
    //     showId:0,
    //     img:'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',
    //     detailInfo: {
    //         name:'周杰伦演唱会',
    //         date:'2018/1/2'
    //     },
    //     seat: "s",
    //     intPrice: 123,
    //     price: '￥1200',
    //     amount: 1,
    //     totalPrice:'￥1200'
    // },
];
const confirm = Modal.confirm;

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
                render: (text,record,index) => (
                    <span>
                        <a onClick={()=>this.handleBuy(record)}>购买</a>
                        <Divider type="vertical" />
                        <a onClick={()=>this.handleDelete(record,index)}>删除</a>
                    </span>
                ),
            }];
    }

    componentDidMount(){
        let self = this;
        axios.get("/getCurrentCart")
            .then(function (response) {
                console.log(response);
                /*this.setState({
                    loading: false,
                    data: response.data,
                });*/
                let items=[];
                let tempres=response.data;
                for(var i in tempres){
                    let tempdata=tempres[i];
                    let temp={
                        key: tempdata.key,
                        showId:tempdata.showId,
                        img:'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',
                        detailInfo: {
                            name:tempdata.title,
                            date:tempdata.time
                        },
                        seat: tempdata.seat,
                        intPrice: tempdata.price,
                        price:tempdata.seat+ '￥'+tempdata.price,
                        amount: tempdata.amount,
                        totalPrice:'￥'+(tempdata.price*tempdata.amount),
                    };
                    items.push(temp);
                }
                self.setState({data:items})
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleBuy = (record) =>{
        //  console.log(record)
        browserHistory.push({
            pathname:'/buyStep',
            state:{
                firstStep:0,
                secondStep:0,
                showName:record.detailInfo.name,
                ticketInfo:{"ticketId": record.key, "price": record.intPrice,"time":record.detailInfo.date},
                number:record.amount,
                totalPrice:record.intPrice*record.amount,
                isCart:1,
            }
        })
    };

    handleDelete = (record,index) =>{
        let self = this;
        confirm({
            title: "确认删除?",
            content: `此次删除不能恢复！`,
            okText: '确定',
            cancelText: '取消',
            onOk() {
                axios.get("/deleteCart",{
                    params:{
                        ticketId: record.key
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        let newData = [...self.state.data];
                        newData.splice(index, 1);
                        self.setState({
                            data: newData,
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            onCancel() {

            },
        });
    };

    handleDetail = () =>{
        browserHistory.push('/detail')
    };

    render(){
        let orderTable=
            <div>
                <Table columns={this.columns} dataSource={this.state.data}
                       pagination={{
                           pageSize: 10,
                       }}
                       size="small"
                />
            </div>;
        return(
            orderTable
        )
    }
}

export default ShopCart;