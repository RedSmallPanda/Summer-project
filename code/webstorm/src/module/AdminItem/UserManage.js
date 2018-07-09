import React, {Component} from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Avatar, Divider, Button, Icon } from 'antd';

const data = [];
for(let i = 0; i < 20; i++){
    data.push({
        avatar:<Avatar icon="user" />,
        username:`Jack${i}`,
        password:'123456',
        phone:18812345678,
        email:'123456@qq.com',
        key:i.toString(),
    })
}
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

class UserManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data, editingKey: '' };
        this.columns = [{
            title:'头像',
            dataIndex:'avatar',
            width:'2%',
            key:'avatar',
        },{
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            editable:true,
            width:'8%',
            align:'center'
        },{
            title:'密码',
            dataIndex:'password',
            key:'password',
            editable:true,
            width:'8%',
            align:'center'
        },{
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            editable:true,
            width:'10%',
            align:'center'
        },{
            title:'邮箱',
            dataIndex:'email',
            key:'email',
            editable:true,
            width:'10%',
            align:'center'
        }, {
            title:'操作',
            key:'action',
            width:'10%',
            align:'center',
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
                                            <a href="javascript:;"
                                               onClick={()=>this.save(form,record.key)}>
                                                保存
                                            </a>
                                            <Divider type="vertical" />
                                            <a href="javascript:;"
                                                onClick={this.cancel}>取消</a>
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
                                <Divider type="vertical" />
                                <a href="javascript:;" onClick={this.cancel}>禁用</a>
                            </span>
                        )}
                    </div>
                )

            }
        }];
    }

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
                newData.push(data);
                this.setState({ data: newData, editingKey: '' });
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
                <Button type="dashed" onClick={this.showModal}><Icon type="plus"/>新增票品</Button>
                <Table
                    components={components}
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    style={{marginTop:16}}
                />
            </div>
        );
    }
}

export default UserManage;