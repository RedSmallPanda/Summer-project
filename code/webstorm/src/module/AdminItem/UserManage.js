import React from 'react';
import { Table, Input, InputNumber, Modal, Form, Button, Icon } from 'antd';
import axios from "axios";
import '../../css/Admin.css';

const confirm = Modal.confirm;

const data = [];
for(let i = 0; i < 20; i++){
    data.push({
        // avatar: <Avatar icon="user"/>,
        userId: i*999,
        username: `Jack ${i}`,
        password: '123456',
        gender: 'male',
        birthday: '2000-01-30',
        nickname: 'nick',
        phone: 18812345678,
        email: '123456@qq.com',
        state: '0'
    });
}
const FormItem = Form.Item;
const EditableContext = React.createContext();


const EditableRow = ({ form, index, ...props, }) => (
    <EditableContext.Provider value={form}>
        <tr {...props}/>
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
            record,
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

const UserForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="新增用户"
                    okText="确定"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        {/*<FormItem label="用户id">*/}
                            {/*{getFieldDecorator('userId', {*/}
                                {/*rules: [{ required: true, message: '请输入id' }],*/}
                            {/*})(*/}
                                {/*<Input type="textarea" placeholder="用户id"/>*/}
                            {/*)}*/}
                        {/*</FormItem>*/}
                        <FormItem label="用户名">
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名' }],
                            })(
                                <Input type="textarea" placeholder="用户名"/>
                            )}
                        </FormItem>
                        <FormItem label="密码">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }],
                            })(
                                <Input type="textarea" placeholder="密码"/>
                            )}
                        </FormItem>
                        <FormItem label="性别">
                            {getFieldDecorator('gender', {
                                rules: [{ required: false, message: '请输入性别' }],
                            })(
                                <Input type="textarea" placeholder="性别"/>
                            )}
                        </FormItem>
                        <FormItem label="生日">
                            {getFieldDecorator('birthday', {
                                rules: [{ required: false, message: '请输入生日' }],
                            })(
                                <Input type="textarea" placeholder="生日"/>
                            )}
                        </FormItem>
                        <FormItem label="昵称">
                            {getFieldDecorator('nickname', {
                                rules: [{ required: false, message: '请输入昵称' }],
                            })(
                                <Input type="textarea" placeholder="昵称"/>
                            )}
                        </FormItem>
                        <FormItem label="手机号">
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '请输入手机号' }],
                            })(
                                <Input type="textarea" placeholder="手机号" />
                            )}
                        </FormItem>
                        <FormItem label="邮箱">
                            {getFieldDecorator('email',{
                                rules:[{ required:true, message:'请输入邮箱'}]
                            })(
                                <Input type="textarea" placeholder="邮箱"/>
                            )}
                        </FormItem>
                        <FormItem label="状态(0为正常状态，1删除，2禁用)">
                            {getFieldDecorator('state',{
                                rules:[{ required:true, message:'请输入用户状态'}]
                            })(
                                <Input type="textarea" initialValue="0"/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

class UserManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data,
            loading: true,
            editingId: '',
            visible: false,
        };
        this.columns = [{
            title: '头像',
            dataIndex: 'avatar',
            width: 65,//'2%',
            key: 'avatar',
            fixed: 'left',
        }, {
            title: 'id',
            dataIndex: 'userId',
            key: 'userId',
            editable: false,
            width: 60,//'7%',
            align: 'center',
            fixed: 'left',
        }, {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            editable: false,
            width: 100,//'9%',
            align: 'center',
            fixed: 'left',
        }, {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
            editable: true,
            width: 160,//'9%',
            align: 'center'
        }, {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
            editable: true,
            width: 120,//'8%',
            align: 'center'
        }, {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            editable: true,
            width: 100,//'8%',
            align: 'center'
        }, {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
            editable: true,
            width: 140,//'10%',
            align: 'center'
        }, {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            editable: true,
            width: 150,//'10%',
            align: 'center'
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            editable: true,
            width: 200,//'10%',
            align: 'center'
        }, {
            title: 's',
            dataIndex: 'state',
            key: 'state',
            editable: true,
            width: 70,//'4%',
            align: 'center',
            // fixed: 'right',
        }, {
            title: '操作',
            key: 'action',
            width: 70,//'6%',
            align: 'center',
            // fixed: 'right',
            render: (text, record) => {
                if(record.username==="admin")return <div><Icon type="lock"/></div>;
                const editable = this.isEditing(record);
                return (
                    <div>
                        {editable ? (
                            <span>
                                <EditableContext.Consumer>
                                    {
                                        (form) => (
                                            <span>
                                                <a onClick={() => this.save(form, record.userId)}>
                                                    保存
                                                </a>
                                                {/*<Divider type="vertical"/>*/}
                                                <a onClick={this.cancel}>取消</a>
                                            </span>
                                        )
                                    }
                                </EditableContext.Consumer>
                            </span>
                        ) : (
                            <span>
                                <a onClick={() => this.edit(record.userId)}>编辑</a>
                                {/*<Divider type="horizontal"/>*/}<br/>
                                <a onClick={() => this.handleDelete(record)}>{record.state === '1' ? "恢复" : "删除"}</a>
                                {/*<Divider type="horizontal"/>*/}<br/>
                                <a onClick={() => this.handleBan(record)}>{record.state === '2' ? "解禁" : "禁用"}</a>
                            </span>
                        )}
                    </div>
                );

            }
        }];
    }

    componentDidMount(){
        let self = this;
        axios.get("http://localhost:8080/allUsers")
            .then(function (response) {
                console.log(response);
                let preData=response.data;
                self.setState({
                    loading: false,
                    data: preData,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
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

            let newUser = {
                // avatar: <Avatar icon="user"/>,
                // userId: values.userId,
                username: values.username,
                password: values.password,
                gender: values.gender,
                birthday: values.birthday,
                nickname: values.nickname,
                phone: values.phone,
                email: values.email,
                state: values.state,
            };

            let params = new URLSearchParams();
            params.append("newUser", JSON.stringify(newUser));
            axios.post("/addUser", params)
                .then(function (response) {
                    console.log(response);
                    alert(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

            let newData = this.state.data;
            newData.unshift(newUser);

            this.setState({
                visible:false,
                data:newData,
            })
        });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    isEditing = (record) => {
        return record.userId === this.state.editingId;
    };

    edit(userId) {
        this.setState({ editingId: userId });
    }

    save(form, userId) {
        console.log(form);
        form.validateFields((error, row) => {
            console.log(row);
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => userId === item.userId);
            if (index > -1) {
                let params = new URLSearchParams();
                params.append("updateUser", JSON.stringify(row));
                axios.post("/updateUser", params)
                    .then(function (response) {
                        console.log(response);
                        alert(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingId: '' });
            } else {
                newData.push(...data);
                this.setState({ data: newData, editingId: '' });
            }
        });
    }

    cancel = () => {
        this.setState({ editingId: '' });
    };

    handleBan = (record) => {
        let self = this;
        confirm({
            title: `确认${(record.state === '2') ? `解禁` : `禁用`}?`,
            content: (record.state === '2') ? `你居然想解禁！` : `你竟然想禁用这个用户！`,
            okText: '确定',
            cancelText: '取消',
            onOk() {
                const newData = [...self.state.data];
                const index = newData.findIndex(item => record.userId === item.userId);
                if (index > -1) {
                    record.state = (record.state === '2') ? '0' : '2';
                    let params = new URLSearchParams();
                    params.append("updateUser", JSON.stringify(record));
                    axios.post("/updateUser", params)
                        .then(function (response) {
                            console.log(response);
                            alert(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    const item = newData[index];
                    newData.splice(index, 1, {
                        ...item,
                        ...record,
                    });
                    self.setState({
                        data: newData,
                    })
                }
            },
            onCancel() {

            },
        });
    };

    handleDelete = (record) => {
        let self = this;
        confirm({
            title: `确认${(record.state === '1') ? `恢复` : `删除`}?`,
            content: (record.state === '1') ? `你居然想恢复那次删除！` : `此次删除居然可以恢复！`,
            okText: '确定',
            cancelText: '取消',
            onOk() {
                const newData = [...self.state.data];
                const index = newData.findIndex(item => record.userId === item.userId);
                if (index > -1) {
                    record.state = (record.state === '1') ? '0' : '1';
                    let params = new URLSearchParams();
                    params.append("updateUser", JSON.stringify(record));
                    axios.post("/updateUser", params)
                        .then(function (response) {
                            console.log(response);
                            alert(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    const item = newData[index];
                    newData.splice(index, 1, {
                        ...item,
                        ...record,
                    });
                    self.setState({
                        data: newData,
                    })
                }
            },
            onCancel() {

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
                <Button type="dashed" onClick={this.showModal}><Icon type="plus"/>新增用户</Button>
                <Table
                    components={components}
                    dataSource={this.state.data}
                    columns={columns}
                    // rowClassName="editable-row"
                    rowClassName={
                        function(record){
                            return "editable-row-" + record.state;
                        }
                    }
                    style={{marginTop: 16}}
                    scroll={{x: 1000}}
                    // bordered={true}
                />
                <UserForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default UserManage;