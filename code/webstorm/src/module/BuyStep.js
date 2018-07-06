import React, { Component } from 'react';
import { Steps, Row, Col, Icon, Table, Button} from 'antd';

const Step=Steps.Step;

const ticketInfo = [{
    key: '1',
    img:'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',
    detailInfo: {
        name:'周杰伦演唱会',
        date:'2018/1/2'
    },
    price: '￥1200',
    amount: 1,
    totalPrice:'￥1200'
}, {
    key: '2',
    img:'https://pimg.dmcdn.cn/perform/project/1523/152368_n.jpg',
    detailInfo: {
        name:'张学友演唱会',
        date:'2017/2/14'
    },
    price: '￥2000',
    amount: 2,
    totalPrice:'￥4000'
}];

const dataColumns = [{
    title: '缩略图',
    key: 'img',
    render: (text, record) => (<img style={{width:'60px'}} src={record.img}/>)
},/*{
    title: '票品信息',
    dataIndex: 'name',
    render: text => <a href="javascript:;">{text}</a>,
},*/{
    title: '票品信息',
    dataIndex: 'detailInfo',
    render: (text, record) => (<div>
        <p><a href="javascript:;">{record.detailInfo.name}</a></p>
        <p>{record.detailInfo.date}</p>
    </div>)
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
}];

const addressColumns = [{
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
}, {
    title: '地区',
    dataIndex: 'city',
    key: 'city',
}, {
    title: '详细地址',
    dataIndex:'detail',
    key: 'detail',
}];

const address=[{
    phone: 18800000000,
    city:'上海 闵行',
    detail:'无',
}, {
    phone:18700000000,
    city:'浙江 杭州 上城区',
    detail:'无',
}, {
    phone:13800000000,
    city:'上海 闵行',
    detail:'东川路800号',
}];


class BuyStep extends Component {
    state={
        firstStep:0,
        secondStep:0,
        orderInfo:ticketInfo,
    }

    confirmS1 = () => {
        console.log('step changed to: 1');
        this.setState({firstStep:1});
    }

    confirmS2 = () => {
        console.log('step changed to: 2');
        this.setState({secondStep:1});
    }

    render() {
        let step0Page=<div>
            <Table columns ={addressColumns} dataSource={address}/>
            <br/>
            <br/>
            <Table columns ={dataColumns} dataSource={ticketInfo}/>
            <br/>
            <br/>
            <Button type="primary" onClick={this.confirmS1}>确认</Button>
        </div>;

        let step1Page=<div>
            <br/>
            <br/>
            <br/>
            <Button type="primary" onClick={this.confirmS2}>付款完成</Button>
        </div>

        let step2Page=<div>
            <br/>
            <br/>
            <br/>
            <p>您已完成付款</p>
        </div>

        let showPage=null;
        if(this.state.firstStep===0&&this.state.secondStep===0){
            showPage=step0Page;
        }
        else if(this.state.firstStep===1&&this.state.secondStep===0){
            showPage=step1Page;
        }
        else{
            showPage=step2Page;
        }
        return (
            <div>
                <br/>
                <br/>
                <Row>
                    <Col span={4}/>
                    <Col span={16}>
                        <Steps current={this.state.firstStep+this.state.secondStep} align="left">
                            <Step title="Finished" description="This is a description." />
                            <Step title="In Progress" description="This is a description." />
                            <Step title="Waiting" description="This is a description." />
                        </Steps>
                        <br/>
                        <br/>
                        {showPage}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BuyStep;