import React, { Component } from 'react';
import { Button, Modal, Form, Input, Icon, Table, Divider,Tabs } from 'antd';
import UploadImage from './UploadImage';
import axios from 'axios';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const columns = [{
    title: '缩略图',
    key: 'image',
    render: (text, record) => (<img style={{width:'60px'}} src={record.image} alt="default"/>)
},{
    title: '票品名称',
    dataIndex: 'title',
    key: 'title',
},{
    title:'简介',
    dataIndex:'info',
    key:'info',
},{
    title: '城市',
    dataIndex: 'city',
    key: 'city',
},{
    title: '类型',
    dataIndex: 'type',
    key: 'type',
},{
    title: '地址',
    dataIndex: 'address',
    key: 'address',
},{
    title: '评分',
    dataIndex: 'rate',
    key: 'rate',
},{
    title: '开始日期',
    dataIndex: 'startDate',
    key: 'startDate',
},{
    title: '结束日期',
    dataIndex: 'endDate',
    key: 'endDate',
},{
    title:'操作',
    key:'action',
    render: (text) => (
        <span>
      <a>编辑</a>
      <Divider type="vertical" />
      <a>下架</a>
    </span>
    ),
}];

const showColumns = [{
    title: '缩略图',
    key: 'image',
    render: (text, record) => (<img style={{width:'60px'}} src={record.image} alt="default"/>)
},{
    title: '票品名称',
    dataIndex: 'title',
    key: 'title',
},{
    title:'价格',
    dataIndex:'price',
    key:'price',
},{
    title: '库存',
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
    title:'操作',
    key:'action',
    render: (text) => (
        <span>
      <a>编辑</a>
      <Divider type="vertical" />
      <a>下架</a>
    </span>
    ),
}];

const data = [];
for(let i = 1; i < 20; i++){
    data.push({
        image:"https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg",
        title:`title${i}`,
        info:"show01",
        city:"上海",
        type:"演唱会",
        address:'菁菁堂',
        rate:"9",
        startDate:"2018/07/03",
        endDate:'2018/07/06',
    })
}

const TicketForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            const self= this;
            return (
                <Modal
                    visible={visible}
                    title="新增票品"
                    okText="确定"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="缩略图">
                            {getFieldDecorator('image')(
                                <UploadImage/>
                            )}
                        </FormItem>
                        <FormItem label="演出名称">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请填写演出名称' }],
                            })(
                                <Input type="textarea" placeholder="演出名称"/>
                            )}
                        </FormItem>
                        <FormItem label="简介">
                            {getFieldDecorator('info', {
                                rules: [{ required: true, message: '请填写简介' }],
                            })(
                                <Input type="textarea" placeholder="简介" />
                            )}
                        </FormItem>
                        <FormItem label="城市">
                            {getFieldDecorator('city', {
                                rules: [{ required: true, message: '请选择城市' }],
                            })(
                                <Input type="textarea" placeholder="城市"/>
                            )}
                        </FormItem>
                        <FormItem label="类型">
                            {getFieldDecorator('type',{
                                rules:[{ required:true, message:'请选择类型'}]
                            })(
                                <Input type="textarea" placeholder="类型"/>
                            )}
                        </FormItem>
                        <FormItem label="地址">
                            {getFieldDecorator('address',{
                                rules:[{ required:true, message:'请填写地址'}]
                            })(
                                <Input type="textarea" placeholder="地址"/>
                            )}
                        </FormItem>
                        <FormItem label="开始日期">
                            {getFieldDecorator('startDate',{
                                rules:[{ required:true, message:'请选择开始日期'}]
                            })(
                                <Input type="textarea" placeholder="开始日期"/>
                            )}
                        </FormItem>
                        <FormItem label="结束日期">
                            {getFieldDecorator('endDate',{
                                rules:[{ required:true, message:'请选择结束日期'}]
                            })(
                                <Input type="textarea" placeholder="结束日期"/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

class TicketManage extends Component{

    state = {
        visible: false,
        address:[{
            city:'',
            detail:''
        }],
        data : data,
        cacheImage:'',
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    sendData = (params) =>{
        axios.post('/addShow', params)
            .then(function (response) {
                console.log(response.data);
                alert("1"+response.data);
                this.setState({
                    cacheImage:response.data
                });
                alert("2"+this.state.cacheImage);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        let self = this;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();

            let params = new URLSearchParams();
            params.append('title',values.title);
            params.append('info',values.info);
            params.append('city',values.city);
            params.append('type',values.type);
            params.append('address',values.address);
            params.append('startDate',values.startDate);
            params.append('endDate',values.endDate);
            this.sendData(params);
            alert("3"+this.state.cacheImage);
            let newTicket = {
                image:this.state.cacheImage,
                title:values.title,
                info:values.info,
                city:values.city,
                type:values.type,
                address:values.address,
                rate:0,
                startDate:values.startDate,
                endDate:values.endDate,
            };

            let newData = this.state.data;
            newData.unshift(newTicket);

            this.setState({
                visible:false,
                data:newData
            })

        });
    };

    handleImage = () =>{

    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render(){
        return(
            <div>
                {/*<Button type="dashed" onClick={this.showModal}><Icon type="plus"/>新增演出</Button>*/}
                <Tabs tabBarExtraContent={
                    <div>
                        <Button onClick={this.showModal} style={{marginRight:10}}><Icon type="plus"/>新增演出</Button>
                        <Button onClick={this.showModal}><Icon type="plus"/>新增票品</Button>
                    </div>
                    }
                >
                    <TabPane tab="演出" key="1">
                        <Table columns={columns} dataSource={this.state.data} style={{marginTop:16}}/>
                    </TabPane>
                    <TabPane tab="票品" key="2">
                        <Table columns={columns} dataSource={this.state.data} style={{marginTop:16}}/>
                    </TabPane>
                </Tabs>
                <TicketForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }
}

export default TicketManage;