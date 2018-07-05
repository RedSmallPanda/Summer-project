import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio,Icon,Cascader, Table, Divider } from 'antd';

const FormItem = Form.Item;

const options = [{
        value:'上海',
        label:'上海',
        children:[{
            value:'闵行区',
            label:'闵行区',
        }]
},{
    value: '浙江',
    label: '浙江',
    children: [{
        value: '杭州',
        label: '杭州',
        children: [{
            value: '上城区',
            label: '上城区',
        }],
    }],
}, {
    value: '江苏',
    label: '江苏',
    children: [{
        value: '南京',
        label: '南京',
        children: [{
            value: '鼓楼区',
            label: '鼓楼区',
        }],
    }],
},];

const columns = [{
    title: '收件人姓名',
    dataIndex: 'name',
    key: 'name',
}, {
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
},{
    title:'操作',
    dataIndex:'action',
    key:'action'
}];

const data = [{
    key: '1',
    name: 'John Brown',
    phone: 18800000000,
    city:'上海 闵行',
    detail:'无',
    action:'删除'
}, {
    key: '2',
    name: 'Jim Green',
    phone:18700000000,
    city:'浙江 杭州 上城区',
    detail:'无',
    action:'删除'
}, {
    key: '3',
    name: 'Joe Black',
    phone:13800000000,
    city:'上海 闵行',
    detail:'东川路800号',
    action:'删除'
}];

const AddressForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="新增收货地址"
                    okText="确定"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="收件人姓名">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请正确填写收件人姓名' }],
                            })(
                                <Input type="textarea" placeholder="收件人姓名"/>
                            )}
                        </FormItem>
                        <FormItem label="手机号">
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '请正确填写收件人手机号' }],
                            })(
                                <Input type="textarea" placeholder="收件人手机号" />
                            )}
                        </FormItem>
                        <FormItem label="省市">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请选择地区' }],
                            })(
                                <Cascader options={options}  placeholder="请选择地区" />
                            )}
                        </FormItem>
                        <FormItem label="详细地址">
                            {getFieldDecorator('description',{
                                rules:[{ required:true, message:'请正确填写详细地址'}]
                            })(
                                <Input type="textarea" placeholder="详细住址"/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

class Address extends Component {
    state = {
        visible: false,
        test:'test',
        address:[{
            city:'',
            detail:''
        }],
        data : [{
            name: 'John Brown',
            phone: 18800000000,
            city:'上海 闵行',
            detail:'无',
            action:'删除'
        }, {
            name: 'Jim Green',
            phone:18700000000,
            city:'浙江 杭州 上城区',
            detail:'无',
            action:'删除'
        }, {
            name: 'Joe Black',
            phone:13800000000,
            city:'上海 闵行',
            detail:'东川路800号',
            action:'删除'
        }]
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

            let newCity = null;
            if(values.title.length === 2){
                newCity = values.title[0] +' '+ values.title[1]
            }
            else{
                newCity = values.title[0] + ' '+values.title[1]+' '+values.title[2]
            }

            let newAddr = {
                name:values.name,
                phone:values.phone,
                city:newCity,
                detail:values.description,
                action:'删除'
            };

            this.setState({
                visible:false,
                data:this.state.data.concat([newAddr])
            })

        });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <Table columns ={columns} dataSource={this.state.data}/>
                <Button type="dashed" onClick={this.showModal}><Icon type="plus"/>新增收货地址</Button>
                <AddressForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default Address;