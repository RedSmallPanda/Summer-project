import React, { Component } from 'react';
import { Button, Modal, Form, Input, Icon,Cascader, Table, Divider, InputNumber, message } from 'antd';
import axios from 'axios';
import moment from 'moment'
import 'moment/locale/zh-cn';
import Position from './Position';
moment.locale('zh-cn');

const data = [];

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getFormItem = (getFieldDecorator) => {
        const {
            editing,
            dataIndex,
            title,
            record,
            ...restProps
        } = this.props;
        switch (title) {
            case "手机号":
                return <FormItem style={{margin: 0}}>
                    {getFieldDecorator(dataIndex, {
                        rules: [
                            {required: true, message: '请输入手机号'},
                            {
                                validator: (rule, value, callback) => {
                                    let phone_validator = /^([0-9])+/;
                                    let is_valid = phone_validator.test(String(value));
                                    //   const form = this.formRef.props.form;
                                    //value's type need to transform
                                    if (String(value).length !== 11) {
                                        is_valid = false;
                                    }
                                    if (!is_valid && !(String(value) === '') && !(value === null)) {
                                        callback("手机号格式错误");
                                    }
                                    else {
                                        callback();
                                    }
                                }
                            },],
                        initialValue: record[dataIndex],
                    })(<Input placeholder="手机号"/>)}
                </FormItem>;
            case "地区":
                return <FormItem style={{margin: 0}}>{
                    getFieldDecorator(dataIndex, {
                        rules: [{
                            type: 'array',
                            required: true,
                            message: `请输入${title}`,
                        }],
                        initialValue: [record[dataIndex]],
                    })(<Cascader options={Position} placeholder="请选择地区" />)
                }</FormItem>;
            default:
                return <FormItem style={{margin: 0}}>{
                    getFieldDecorator(dataIndex, {
                        rules: [{
                            required: true,
                            message: `请输入${title}`,
                        }],
                        initialValue: record[dataIndex],
                    })(<Input/>)
                }</FormItem>;

        }
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            record,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>{
                            editing ?
                                this.getFormItem(getFieldDecorator)
                                :
                                restProps.children
                        }</td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

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
                    width="400px"
                >
                    <Form layout="vertical">
                        <FormItem label={null}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请填写收件人姓名' }],
                            })(
                                <Input type="textarea" placeholder="收件人姓名"/>
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('phone', {
                                rules: [
                                    { required: true, message: '请输入手机号' },
                                    //                       { max:12,message:'用户名长度不超过12', },
                                    {validator:(rule,value,callback)=>{
                                        var phone_validator=/^([0-9])+/;
                                        var is_valid=phone_validator.test(String(value));
                                        //   const form = this.formRef.props.form;
                                        //value's type need to transform
                                        if(String(value).length !== 11){is_valid=false;}
                                        if(!is_valid &&!(String(value)==='')&&!(value===null)){callback("手机号格式错误");}
                                        else {callback()}
                                    }},
                                ],
                                validateTrigger:'onBlur',
                            })(
                                <Input type="textarea" placeholder="收件人手机号" />
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('district', {
                                rules: [{ required: true, message: '请选择地区' }],
                            })(
                                <Cascader options={Position}  placeholder="请选择地区" />
                            )}
                        </FormItem>
                        <FormItem label={null}>
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
    constructor(props) {
        super(props);
        this.columns = [{
            title: '收件人姓名',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            editable: true,
        }, {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            width: '20%',
            editable: true,
        }, {
            title: '地区',
            dataIndex: 'city',
            key: 'city',
            width: '20%',
            editable: true,
        }, {
            title: '详细地址',
            dataIndex: 'detail',
            key: 'detail',
            editable: true,
            width: '30%',
        }, {
            title: '操作',
            key: 'action',
            align: 'center',
            width: '20%',
            render: (text, record) => {
                const editable = this.isEditing(record);
                return (
                    <div>
                        {editable ? (
                            <span>
                                <EditableContext.Consumer>
                                    {
                                        form => (
                                            <span>
                                            <a onClick={() => this.save(form, record.key)}>
                                                保存
                                            </a>
                                            <Divider type="vertical"/>
                                            <a onClick={this.cancel}>取消</a>
                                            </span>
                                        )
                                    }
                                </EditableContext.Consumer>
                            </span>
                        ) : (
                            <span>
                                <Icon type="edit" style={{cursor: "pointer"}} onClick={() => this.edit(record.key)}/>
                                <Divider type="vertical"/>
                                <Icon type="delete" style={{cursor: "pointer"}}
                                      onClick={() => this.handleDelete(record.key)}/>
                            </span>
                        )}
                    </div>
                )

            }
        }];
    }
    state = {
        visible: false,
        editingKey: '',
        address:[{
            city:'',
            detail:''
        }],
        data : data,
        key:data.length
    };

    getResult(self,props) {
        axios.get("/address",{
            params:{
                userId:1
            }
        })
            .then(function (response) {
                console.log(response.data);
                self.setState({
                    data: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    addAddress = (self,sendAddr) =>{
        let params = new URLSearchParams();
        params.append('userId', 1);
        params.append('key', sendAddr.key);
        params.append('name',sendAddr.name);
        params.append('phone',sendAddr.phone);
        params.append('province',sendAddr.province);
        params.append('city',sendAddr.city);
        params.append('block',sendAddr.block);
        params.append('detail',sendAddr.detail);
        axios.post('/addAddress', params);
    };

    deleteAddress = (self,item) =>{
        let params = new URLSearchParams();
        // params.append('userId',1);
        params.append('key',item.key);
        axios.post('/deleteAddress', params);
    };

    componentDidMount(){
        this.getResult(this, this.props);
    }

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
            if(values.district.length === 2){
                newCity = values.district[0] +' '+ values.district[1]
            }
            else{
                newCity = values.district[0] + ' '+values.district[1]+' '+values.district[2]
            }

            let str = moment().format('x');

            let newAddr = {
                key:str.substr(2,9),
                name:values.name,
                phone:values.phone,
                city:newCity,
                detail:values.description,
            };

            let sendAddr = {
                key:newAddr.key,
                name:values.name,
                phone:values.phone,
                province:values.district[0],
                city:values.district[1],
                block:values.district.length === 2 ? "" : values.district[2],
                detail:values.description,
            };

            this.addAddress(this,sendAddr);
            message.info("地址添加成功！");//todo: message by response

            this.setState({
                visible:false,
                data:this.state.data.concat([newAddr]),
            })

        });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };

    edit(key) {
        this.setState({ editingKey: key });
    }

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                let newAddr = newData[index].city;

                let sendAddr = {
                    key:newData[index].key,
                    name:newData[index].name,
                    phone:newData[index].phone,
                    province: newAddr[0],
                    city:newAddr[1],
                    block:newAddr.length === 2 ? "" : newAddr[2],
                    detail:newData[index].detail,
                };

                this.addAddress(this,sendAddr);
                this.setState({ data: newData, editingKey: '' });
                message.success("修改地址成功");
            } else {
                this.setState({editingKey: '' });
            }
        });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    handleDelete = (key) => {
        let self = this;
        Modal.confirm({
            title: '是否删除?',
            content: '',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                const newData = [...self.state.data];
                const index = newData.findIndex(item => key === item.key);

                self.deleteAddress(self,newData[index]);
                newData.splice(index,1);

                self.setState({
                    data: newData
                });
                message.success("删除地址成功");
            },
            onCancel() {
                //do nothing
            },
        });
    };



    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    //inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    inputType: 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <div>
                <Table
                    components={components}
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    style={{marginTop:16}}
                    locale={{emptyText: '暂未设置地址'}}
                    size="middle"
                />
                <br/>
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