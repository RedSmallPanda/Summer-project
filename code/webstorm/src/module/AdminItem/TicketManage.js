import React, { Component } from 'react';
import { Button, Modal, Form, Input, Icon, Table, Divider,Tabs, Cascader, DatePicker } from 'antd';
import UploadImage from './UploadImage';
import axios from 'axios';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

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

const ticketColumns = [{
    title: '票品名称',
    dataIndex: 'title',
    key: 'title',
},{
    title:'价格',
    dataIndex:'price',
    key:'price',
},{
    title: '时间',
    dataIndex: 'time',
    key: 'time',
},{
    title: '座位信息',
    dataIndex: 'seat',
    key: 'seat',
},{
    title: '座位总数',
    dataIndex: 'amount',
    key: 'amount',
},{
    title: '库存',
    dataIndex: 'stock',
    key: 'stock',
},{
    title:'操作',
    key:'action',
    render: (text) => (
        <span>
      <a>删除</a>
    </span>
    ),
}];

const typeOptions = [{
    value:'演唱会',
    label:'音乐会',
},{
    value: '音乐会',
    label: '音乐会',
}, {
    value: '曲苑杂坛',
    label: '曲苑杂坛',
},{
    value: '话剧歌剧',
    label: '话剧歌剧',
},{
    value: '体育比赛',
    label: '体育比赛',
},{
    value: '舞蹈芭蕾',
    label: '舞蹈芭蕾',
},{
    value: '动漫游戏',
    label: '动漫游戏',
},];

const cityOptions = [{
    value:'上海',
    label:'上海',
},{
    value:'北京',
    label:'北京',
},{
    value:'杭州',
    label:'杭州',
},{
    value:'成都',
    label:'成都',
},{
    value:'深圳',
    label:'深圳',
},{
    value:'广州',
    label:'广州',
},];

function onChange(date, dateString) {
    console.log(date, dateString);
}

const ShowForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="新增演出"
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
                                <Cascader options={cityOptions} placeholder="城市"/>
                            )}
                        </FormItem>
                        <FormItem label="类型">
                            {getFieldDecorator('type',{
                                rules:[{ required:true, message:'请选择类型'}]
                            })(
                                <Cascader options={typeOptions} placeholder="类型"/>
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
                                <RangePicker placeholder="开始日期"/>
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

const TicketForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
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
                        <FormItem label="演出名称">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请选择演出' }],
                            })(
                                <Input type="textarea" placeholder="演出名称"/>
                            )}
                        </FormItem>
                        <FormItem label="价格">
                            {getFieldDecorator('price', {
                                rules: [{ required: true, message: '请填写价格' }],
                            })(
                                <Input type="textarea" placeholder="价格" />
                            )}
                        </FormItem>
                        <FormItem label="时间">
                            {getFieldDecorator('time', {
                                rules: [{ required: true, message: '请选择时间' }],
                            })(
                                <Input type="textarea" placeholder="时间"/>
                            )}
                        </FormItem>
                        <FormItem label="座位信息">
                            {getFieldDecorator('seat',{
                                rules:[{ required:true, message:'请填写座位信息'}]
                            })(
                                <Input type="textarea" placeholder="座位信息"/>
                            )}
                        </FormItem>
                        <FormItem label="座位总数">
                            {getFieldDecorator('amount',{
                                rules:[{ required:true, message:'请填写座位总数'}]
                            })(
                                <Input type="textarea" placeholder="座位总数"/>
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
        ticketVisible: false,
        cacheImage:'',
        show: '',
        ticket:'',
    };

    getShows(self) {
        axios.get("/getShows")
            .then(function (response) {
                console.log(response);
                self.setState({
                    show:response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    getTickets(self){
        axios.get("/getTickets")
            .then(function (response) {
                console.log(response);
                self.setState({
                    ticket:response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount(){
        this.getShows(this);
        this.getTickets(this);
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        let self = this;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            const formData = form.getFieldsValue();

            const timeRange = formData['startDate'];
            console.log(timeRange[0].format('YYYY-MM-DD'));
            console.log(timeRange[1].format('YYYY-MM-DD'));

            form.resetFields();

            let params = new URLSearchParams();
            params.append('title',values.title);
            params.append('info',values.info);
            params.append('city',values.city);
            params.append('type',values.type);
            params.append('address',values.address);
            params.append('startDate',timeRange[0].format('YYYY-MM-DD'));
            params.append('endDate',timeRange[1].format('YYYY-MM-DD'));
            axios.post('/addShow', params)
                .then(function (response) {
                    let newShow = {
                        image:response.data,
                        title:values.title,
                        info:values.info,
                        city:values.city,
                        type:values.type,
                        address:values.address,
                        rate:0,
                        startDate:timeRange[0].format('YYYY-MM-DD'),
                        endDate:timeRange[1].format('YYYY-MM-DD'),
                    };

                    let newData = self.state.show;
                    newData.unshift(newShow);

                    self.setState({
                        visible:false,
                        show:newData
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });

        });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    showTicketModal = () => {
        this.setState({ ticketVisible: true });
    };

    handleTicketCancel = () => {
        this.setState({ ticketVisible: false });
    };

    handleTicketCreate = () => {
        const form = this.TicketformRef.props.form;
        let self = this;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();

            let params = new URLSearchParams();
            params.append('title',values.title);
            params.append('price',values.price);
            params.append('time',values.time);
            params.append('seat',values.seat);
            params.append('amount',values.amount);
            axios.post('/addTicket', params)
                .then(function (response) {
                    console.log(response.data);
                    let newTicket = {
                        title:values.title,
                        price:values.price,
                        time:values.time,
                        seat:values.seat,
                        amount:values.amount,
                        stock:values.amount,
                    };

                    let newData = self.state.ticket;
                    newData.unshift(newTicket);

                    self.setState({
                        ticketVisible:false,
                        ticket:newData
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });

        });
    };

    saveTicketFormRef = (formRef) => {
        this.TicketformRef = formRef;
    };

    render(){
        return(
            <div>
                {/*<Button type="dashed" onClick={this.showModal}><Icon type="plus"/>新增演出</Button>*/}
                <Tabs tabBarExtraContent={
                    <div>
                        <Button onClick={this.showModal} style={{marginRight:10}}><Icon type="plus"/>新增演出</Button>
                        <Button onClick={this.showTicketModal}><Icon type="plus"/>新增票品</Button>
                    </div>
                    }
                >
                    <TabPane tab="演出" key="1">
                        <Table columns={columns} dataSource={this.state.show} style={{marginTop:16}}/>
                    </TabPane>
                    <TabPane tab="票品" key="2">
                        <Table columns={ticketColumns} dataSource={this.state.ticket} style={{marginTop:16}}/>
                    </TabPane>
                </Tabs>
                <ShowForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <TicketForm
                    wrappedComponentRef={this.saveTicketFormRef}
                    visible={this.state.ticketVisible}
                    onCancel={this.handleTicketCancel}
                    onCreate={this.handleTicketCreate}
                />
            </div>
        )
    }
}

export default TicketManage;