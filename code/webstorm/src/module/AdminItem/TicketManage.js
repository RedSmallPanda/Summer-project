import React, { Component } from 'react';
import { Button, Modal, Form, Input, Icon, Table, Divider } from 'antd';
import Avatar from "./Avatar";

const FormItem = Form.Item;

const columns = [{
    title: '缩略图',
    key: 'image',
    render: (text, record) => (<img style={{width:'60px'}} src={record.image} alt="default"/>)
},{
    title: '票品名称',
    dataIndex: 'ticketName',
    key: 'ticketName',
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
        ticketName:`title${i}`,
        price:`${i}`,
        count:`${i^2}`,
        address:'菁菁堂',
        time:'2018/07/06',
    })
}

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
                        <FormItem label="缩略图">
                            {getFieldDecorator('image')(
                                <Avatar/>
                            )}
                        </FormItem>
                        <FormItem label="票品名称">
                            {getFieldDecorator('ticketName', {
                                rules: [{ required: true, message: '请填写票品名称' }],
                            })(
                                <Input type="textarea" placeholder="票品名称"/>
                            )}
                        </FormItem>
                        <FormItem label="价格">
                            {getFieldDecorator('price', {
                                rules: [{ required: true, message: '请填写价格' }],
                            })(
                                <Input type="textarea" placeholder="价格" />
                            )}
                        </FormItem>
                        <FormItem label="库存">
                            {getFieldDecorator('count', {
                                rules: [{ required: true, message: '请填写库存' }],
                            })(
                                <Input type="textarea" placeholder="库存"/>
                            )}
                        </FormItem>
                        <FormItem label="开始时间">
                            {getFieldDecorator('time',{
                                rules:[{ required:true, message:'请选择开始时间'}]
                            })(
                                <Input type="textarea" placeholder="开始时间"/>
                            )}
                        </FormItem>
                        <FormItem label="地址">
                            {getFieldDecorator('address',{
                                rules:[{ required:true, message:'请填写地址'}]
                            })(
                                <Input type="textarea" placeholder="地址"/>
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
        data : data
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();

            let newTicket = {
                image:"",
                ticketName:values.ticketName,
                price:values.price,
                count:values.count,
                address:values.address,
                time:values.time,
            };

            let newData = this.state.data;
            newData.unshift(newTicket);

            this.setState({
                visible:false,
                data:newData
            })

        });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render(){
        return(
            <div>
                <Button type="dashed" onClick={this.showModal}><Icon type="plus"/>新增票品</Button>
                <Table columns={columns} dataSource={this.state.data} style={{marginTop:16}}/>
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