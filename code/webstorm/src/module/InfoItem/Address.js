import React, { Component } from 'react';
import { Button, Modal, Form, Input, Icon,Cascader, Table, Divider, InputNumber } from 'antd';

const data = [{
    key:'1',
    name: 'John Brown',
    phone: 18800000000,
    city:'上海 闵行',
    detail:'无',
}, {
    key:'2',
    name: 'Jim Green',
    phone:18700000000,
    city:'浙江 杭州 上城区',
    detail:'无',
}, {
    key:'3',
    name: 'Joe Black',
    phone:13800000000,
    city:'上海 闵行',
    detail:'东川路800号',
}];

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `请输入${title}`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

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
                            {getFieldDecorator('district', {
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
    constructor(props) {
        super(props);
        this.columns = [{
            title: '收件人姓名',
            dataIndex: 'name',
            key: 'name',
            width:'15%',
            editable:true,
        }, {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            width:'20%',
            editable:true,
        }, {
            title: '地区',
            dataIndex: 'city',
            key: 'city',
            width:'20%',

        }, {
            title: '详细地址',
            dataIndex:'detail',
            key: 'detail',
            editable:true,
            width:'30%',
        },{
            title:'操作',
            key:'action',
            align:'center',
            width:'20%',
            render: (text, record) => {
                const editable = this.isEditing(record);
                return(
                    <div>
                        {editable ? (
                            <span>
                                <EditableContext.Consumer>
                                    {
                                        form =>(
                                            <span>
                                            <a onClick={()=>this.save(form,record.key)}>
                                                保存
                                            </a>
                                            <Divider type="vertical" />
                                            <a onClick={this.cancel}>取消</a>
                                            </span>
                                        )
                                    }
                                </EditableContext.Consumer>
                            </span>
                        ) : (
                            <span>
                                <a onClick={()=>this.edit(record.key)}>编辑</a>
                                <Divider type="vertical" />
                                <a onClick={()=>this.handleDelete(record.key)}>删除</a>
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

            let newAddr = {
                key:(this.state.key + 1).toString(),
                name:values.name,
                phone:values.phone,
                city:newCity,
                detail:values.description,
            };

            this.setState({
                visible:false,
                data:this.state.data.concat([newAddr]),
                key:this.state.key + 1
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
                this.setState({ data: newData, editingKey: '' });
            } else {
                this.setState({editingKey: '' });
            }
        });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    handleDelete = (key) =>{
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.key);
        newData.splice(index,1);
        this.setState({
            data:newData
        })
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
                />
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