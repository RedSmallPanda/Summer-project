import React, { Component } from 'react';
import { Button, Modal, Form, Input, Icon, Table,Tabs, Cascader, DatePicker } from 'antd';
import UploadImage from './UploadImage';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import Image from '../MainPages/Image';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
const Search = Input.Search;

const typeOptions = [{
    value:'concert',
    label:'演唱会',
},{
    value: 'music',
    label: '音乐会',
}, {
    value: 'cnopera',
    label: '曲苑杂坛',
},{
    value: 'opera',
    label: '话剧歌剧',
},{
    value: 'sports',
    label: '体育比赛',
},{
    value: 'dance',
    label: '舞蹈芭蕾',
},{
    value: 'comic',
    label: '动漫游戏',
},];

const cityOptions = [{
    value:'sh',
    label:'上海',
},{
    value:'bj',
    label:'北京',
},{
    value:'hz',
    label:'杭州',
},{
    value:'cd',
    label:'成都',
},{
    value:'sz',
    label:'深圳',
},{
    value:'gz',
    label:'广州',
},];

let show = [{
    image:'',
    showId:'',
    title:'',
    info:'',
    city:'',
    type:'',
    address:'',
    rate:'',
    startDate:'',
    endDate:'',

}];
let showOptions = [];
let startDate = '';
let endDate = '';

function onChange(value) {
    console.log(value[0]);
    for(let i = 0;i < show.length; i++){
        if(show[i].showId === value[0]){
            startDate = show[i].startDate;
            endDate = show[i].endDate;
        }
    }
}

function disabledDate(current) {
    // Can not select days before today and today
    return current < moment(startDate).startOf('day') || current > moment(endDate).endOf('day');
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
                    width="400px"
                >
                    <Form>
                        <FormItem label={null}>
                            {getFieldDecorator('image')(
                                <UploadImage/>
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请填写演出名称' }],
                            })(
                                <Input type="textarea" placeholder="演出名称"/>
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('info', {
                                rules: [{ required: true, message: '请填写简介' }],
                            })(
                                <Input type="textarea" placeholder="简介" />
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('city', {
                                rules: [{ required: true, message: '请选择城市' }],
                            })(
                                <Cascader options={cityOptions} placeholder="城市"/>
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('type',{
                                rules:[{ required:true, message:'请选择类型'}]
                            })(
                                <Cascader options={typeOptions} placeholder="类型"/>
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('address',{
                                rules:[{ required:true, message:'请填写地址'}]
                            })(
                                <Input type="textarea" placeholder="地址"/>
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('startDate',
                                {rules:[{ required:true, message:'请选择日期'}]}
                                )(
                                <RangePicker locale={locale}/>
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
                    width="400px"
                >
                    <Form>
                        <FormItem label={null}>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请选择演出' }],
                            })(
                                <Cascader options={showOptions} onChange={onChange} changeOnSelect placeholder="演出名称"/>
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('price', {
                                rules: [
                                    { required: true, message: '请填写价格' },
                                    {validator:(rule,value,callback)=>{
                                        var price_validator=/^([0-9])+/;
                                        var is_valid=price_validator.test(String(value));
                                        //   const form = this.formRef.props.form;
                                        //value's type need to transform
                                        if(String(value).length>13){is_valid=false;}
                                        if(!is_valid &&!(String(value)==='')&&!(value==null)){callback("价格仅限整数");}
                                        else {callback()}
                                    }},
                                ],
                                validateTrigger:'onBlur',
                            })(
                                <Input type="textarea" placeholder="价格" />
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('time', {
                                rules: [{ required: true, message: '请选择时间' }],
                            })(
                                <DatePicker
                                    format="YYYY-MM-DD HH:mm:ss"
                                    disabledDate={disabledDate}
                                    locale={locale}
                                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                />
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('seat',{
                                rules:[{ required:true, message:'请填写座位信息'}]
                            })(
                                <Input type="textarea" placeholder="座位信息"/>
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('amount',{
                                rules:[
                                    { required:true, message:'请填写座位总数'},
                                    {validator:(rule,value,callback)=>{
                                        var price_validator=/^([0-9])+/;
                                        var is_valid=price_validator.test(String(value));
                                        //   const form = this.formRef.props.form;
                                        //value's type need to transform
                                        if(String(value).length>13){is_valid=false;}
                                        if(!is_valid &&!(String(value)==='')&&!(value==null)){callback("座位数仅限整数");}
                                        else {callback()}
                                    }},
                                ],
                                validateTrigger:'onBlur',
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

const CouponForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="新增优惠券"
                    okText="确定"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                    width="400px"
                >
                    <Form layout="vertical">
                        <FormItem label={null}>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请填写优惠券名称' }],
                            })(
                                <Input type="textarea" placeholder="优惠券名称" />
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('condition', {
                                rules: [
                                    { required: true, message: '请填写满减条件' },
                                    {validator:(rule,value,callback)=>{
                                        var price_validator=/^([0-9])+/;
                                        var is_valid=price_validator.test(String(value));
                                        //   const form = this.formRef.props.form;
                                        //value's type need to transform
                                        if(String(value).length>13){is_valid=false;}
                                        if(!is_valid &&!(String(value)==='')&&!(value==null)){callback("仅限整数");}
                                        else {callback()}
                                    }},
                                ],
                                validateTrigger:'onBlur',
                            })(
                                <Input type="textarea" placeholder="满减条件" />
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('discount', {
                                rules: [
                                    { required: true, message: '请填写优惠额度' },
                                    {validator:(rule,value,callback)=>{
                                        var price_validator=/^([0-9])+/;
                                        var is_valid=price_validator.test(String(value));
                                        //   const form = this.formRef.props.form;
                                        //value's type need to transform
                                        if(String(value).length>13){is_valid=false;}
                                        if(!is_valid &&!(String(value)==='')&&!(value==null)){callback("仅限整数");}
                                        else {callback()}
                                    }},
                                ],
                                validateTrigger:'onBlur',
                            })(
                                <Input type="textarea" placeholder="优惠额度" />
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('date',
                                {rules:[{ required:true, message:'请选择日期'}]}
                            )(
                                <RangePicker locale={locale}/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

class TicketManage extends Component{
    constructor(props) {
        super(props);
        this.columns = [{
            title: '缩略图',
            key: 'image',
            render: (text, record) => (<Image width={60} showId={record.showId}/>)
        },{
            title: '票品名称',
            dataIndex: 'title',
            key: 'title',
        },{
            title: '城市',
            dataIndex: 'city',
            key: 'city',
        },{
            title: '类型',
            dataIndex: 'type',
            key: 'type',
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
            render: (text,record) => (
                <span>
                    <a onClick={()=>this.handleDeleteShow(record.showId)}>下架</a>
                </span>
            ),
        }];

        this.ticketColumns = [{
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
            render: (text,record) => (
                <span>
                    <a onClick={()=>this.handleDeleteTicket(record.ticketId)}>删除</a>
                </span>
            ),
        }];

        this.couponColumns = [{
            title: '优惠券名称',
            dataIndex: 'title',
            key: 'title',
        },{
            title:'满减条件',
            dataIndex:'condition',
            key:'condition',
        },{
            title: '优惠额度',
            dataIndex: 'discount',
            key: 'discount',
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
            render: (text,record) => (
                <span>
                    <a onClick={()=>this.handleDeleteCoupon(record.couponId)}>删除</a>
                </span>
            ),
        }];
    }

    state = {
        visible: false,
        ticketVisible: false,
        couponVisible: false,
        cacheImage:'',
        show: '',
        ticket:'',
        coupon:'',
        searchText:'',
    };

    getShows(self) {
        axios.get("/getShows")
            .then(function (response) {
                console.log(response);
                self.setState({
                    show:response.data
                });
                self.setShowOptions();
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

    getCoupon(self){
        axios.get("/getCoupon")
            .then(function (response) {
                console.log(response);
                self.setState({
                    coupon:response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setShowOptions = () =>{
        showOptions = [];
        let showData = this.state.show;
        for(let j=0;j<showData.length;j++){
            let newOption = {
                value:showData[j].showId,
                label:showData[j].title,
            };
            showOptions.push(newOption);
        }
        show = this.state.show;
    };

    componentDidMount(){
        this.getShows(this);
        this.getTickets(this);
        this.getCoupon(this);
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
                .then(function () {
                    self.getShows(self);
                    self.setState({
                        visible:false,
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
            const formData = form.getFieldsValue();
            const time = formData['time'];
            form.resetFields();

            let params = new URLSearchParams();
            params.append('showId',values.title[0]);
            params.append('price',values.price);
            params.append('time',time.format('YYYY-MM-DD HH:mm:ss'));
            params.append('seat',values.seat);
            params.append('amount',values.amount);
            axios.post('/addTicket', params)
                .then(function () {
                    self.getTickets(self);
                    self.setState({
                        ticketVisible:false,
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

    showCouponModal = () => {
        this.setState({ couponVisible: true });
    };

    handleCouponCancel = () => {
        this.setState({ couponVisible: false });
    };

    handleCouponCreate = () => {
        const form = this.CouponformRef.props.form;
        let self = this;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            const formData = form.getFieldsValue();
            const time = formData['date'];
            form.resetFields();

            let params = new URLSearchParams();
            params.append('title',values.title);
            params.append('condition',values.condition);
            params.append('discount',values.discount);
            params.append('startDate',time[0].format('YYYY-MM-DD'));
            params.append('endDate',time[1].format('YYYY-MM-DD'));
            axios.post('/addCoupon', params)
                .then(function () {
                    self.getCoupon(self);
                    self.setState({
                        couponVisible:false,
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });

        });
    };

    saveCouponFormRef = (formRef) => {
        this.CouponformRef = formRef;
    };

    handleDeleteShow = (showId) => {
        let self = this;
        Modal.confirm({
            title: '是否下架?',
            content: '',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                const newData = [...self.state.show];
                const index = newData.findIndex(item => showId === item.showId);
                self.deleteShow(showId);
                newData.splice(index,1);
                self.setState({
                    show: newData
                })

            },
            onCancel() {
                //do nothing
            },
        });
    };

    deleteShow = (showId) =>{
        let params = new URLSearchParams();
        params.append('showId',showId);
        axios.post('/deleteShow', params);
    };

    handleDeleteTicket = (ticketId) => {
        let self = this;
        Modal.confirm({
            title: '是否删除?',
            content: '',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                const newData = [...self.state.ticket];
                const index = newData.findIndex(item => ticketId === item.ticketId);
                self.deleteTicket(ticketId);
                newData.splice(index,1);
                self.setState({
                    ticket: newData
                })

            },
            onCancel() {
                //do nothing
            },
        });
    };

    deleteTicket = (ticketId) =>{
        let params = new URLSearchParams();
        params.append('ticketId',ticketId);
        axios.post('/deleteTicket', params);
    };

    handleDeleteCoupon = (couponId) => {
        let self = this;
        Modal.confirm({
            title: '是否删除?',
            content: '',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                const newData = [...self.state.coupon];
                const index = newData.findIndex(item => couponId === item.couponId);
                self.deleteCoupon(couponId);
                newData.splice(index,1);
                self.setState({
                    coupon: newData
                })

            },
            onCancel() {
                //do nothing
            },
        });
    };

    deleteCoupon = (couponId) =>{
        let params = new URLSearchParams();
        params.append('couponId',couponId);
        axios.post('/deleteCoupon', params);
    };

    handleSearch = (value,self) =>{
        axios.get("/searchShow",{
            params:{
                search:value
            }
        })
            .then(function (response) {
                console.log(response);
                self.setState({
                    show:response.data
                });
                self.setShowOptions();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render(){
        return(
            <div>
                {/*<Button type="dashed" onClick={this.showModal}><Icon type="plus"/>新增演出</Button>*/}
                <Tabs tabBarExtraContent={
                    <div>
                        <Search
                            placeholder=""
                            onSearch={value => this.handleSearch(value,this)}
                            style={{ width: 160, marginRight:10}}
                        />
                        <Button onClick={this.showModal} style={{marginRight:10}}><Icon type="plus"/>新增演出</Button>
                        <Button onClick={this.showTicketModal} style={{marginRight:10}}><Icon type="plus"/>新增票品</Button>
                        <Button onClick={this.showCouponModal}><Icon type="plus"/>新增优惠券</Button>
                    </div>
                }
                >
                    <TabPane tab="演出" key="1">
                        <Table
                            columns={this.columns}
                            expandedRowRender={record => <span>
                                <p style={{ margin: 0 }}>
                                    {'简介：'+record.info}
                                </p>
                                <p style={{ margin: 0 }}>
                                    {'详细地址：'+record.address}
                                </p>
                            </span>}
                            dataSource={this.state.show}
                            style={{marginTop:16}}
                            size="small"
                        />
                    </TabPane>
                    <TabPane tab="票品" key="2">
                        <Table columns={this.ticketColumns} dataSource={this.state.ticket} style={{marginTop:16}} size="small"/>
                    </TabPane>
                    <TabPane tab="优惠券" key="3">
                        <Table columns={this.couponColumns} dataSource={this.state.coupon} style={{marginTop:16}} size="small"/>
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
                <CouponForm
                    wrappedComponentRef={this.saveCouponFormRef}
                    visible={this.state.couponVisible}
                    onCancel={this.handleCouponCancel}
                    onCreate={this.handleCouponCreate}
                />
            </div>
        )
    }
}

export default TicketManage;