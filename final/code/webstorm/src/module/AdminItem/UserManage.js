import React from 'react';
import {Table, Input, InputNumber, Modal, Form, Button, Icon, DatePicker, Cascader, message} from 'antd';

import axios from "axios";
import '../../css/Admin.css';
import moment from "moment";

const confirm = Modal.confirm;
const Search = Input.Search;

let data = [];

const userStateOptions = [{
    value: '0',
    label: '0（正常）',
}, {
    value: '1',
    label: '1（删除）',
}, {
    value: '2',
    label: '2（禁用）',
},
];
const genderOptions = [{
    value: 'male',
    label: 'male（男）',
}, {
    value: 'female',
    label: 'female（女）',
},
];
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props, }) => (
    <EditableContext.Provider value={form}>
        <tr {...props}/>
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
            case '密码':
                return <FormItem style={{margin: 0}}>
                    {getFieldDecorator(dataIndex, {
                        rules: [
                            {required: true, message: '请输入密码'},
                            {
                                validator: (rule, value, callback) => {
                                    if (String(value).length < 6) {
                                        callback("密码长度不足6位");
                                    }
                                    if (String(value).length > 18) {
                                        callback("密码长度超过18位");
                                    }
                                    else {
                                        callback();
                                    }
                                }
                            },],
                        initialValue: record[dataIndex],
                    })(<Input placeholder="密码"/>)}
                </FormItem>;
            case '性别':
                return <FormItem style={{margin: 0}}>
                    {getFieldDecorator(dataIndex, {
                        rules: [{
                            type: 'array',
                            required: false,
                            message: `请输入${title}`,
                        },],
                        initialValue: [record[dataIndex]],
                    })(<Cascader options={genderOptions} placeholder="性别"/>)}
                </FormItem>;
            case '生日':
                return <FormItem style={{margin: 0}}>
                    {getFieldDecorator(dataIndex, {
                        rules: [{
                            type: 'object',
                            required: false,
                            message: `请输入${title}`,
                        },],
                        initialValue: moment(record[dataIndex]),
                    })(<DatePicker allowClear/>)}
                </FormItem>;
            case '手机号':
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
            case '邮箱':
                return <FormItem style={{margin: 0}}>
                    {getFieldDecorator(dataIndex, {
                        rules: [{
                            type: 'email',
                            required: true,
                            message: `邮箱格式错误`,
                        },],
                        initialValue: record[dataIndex],
                    })(<Input placeholder="邮箱"/>)}
                </FormItem>;
            case '状态':
                return <FormItem style={{margin: 0}}>
                    {getFieldDecorator(dataIndex, {
                        rules: [{
                            type: 'array',
                            required: true,
                            message: `请输入${title}`,
                        },],
                        initialValue: [record[dataIndex]],
                    })(<Cascader options={userStateOptions} placeholder="状态"/>)}
                </FormItem>;
            default:
                return <FormItem style={{margin: 0}}>
                    {getFieldDecorator(dataIndex, {
                        rules: [{
                            required: true,
                            message: `请输入${title}`,
                        },],
                        initialValue: record[dataIndex],
                    })(<Input />)}
                </FormItem>;
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
                        <FormItem label="用户名">
                            {getFieldDecorator('username', {
                                rules: [
                                    {required: true, message: '请输入用户名'},
                                    {
                                        validator: (rule, value, callback) => {
                                            if (String(value).length < 5) {
                                                callback("用户名长度不足5位");
                                            }
                                            if (String(value).length > 12) {
                                                callback("用户名长度超过12位");
                                            }
                                            else {
                                                callback();
                                            }
                                        }
                                    }],
                            })(
                                <Input type="textarea" placeholder="用户名"/>
                            )}
                        </FormItem>
                        <FormItem label="密码">
                            {getFieldDecorator('password', {
                                rules: [
                                    {required: true, message: '请输入密码'},
                                    {
                                        validator: (rule, value, callback) => {
                                            if (String(value).length < 6) {
                                                callback("密码长度不足6位");
                                            }
                                            if (String(value).length > 18) {
                                                callback("密码长度超过18位");
                                            }
                                            else {
                                                callback();
                                            }
                                        }
                                    }],
                            })(
                                <Input type="textarea" placeholder="密码"/>
                            )}
                        </FormItem>
                        <FormItem label="性别">
                            {getFieldDecorator('gender', {
                                rules: [{required: false, message: '请输入性别'}],
                            })(
                                <Cascader options={genderOptions} placeholder="性别"/>
                            )}
                        </FormItem>
                        <FormItem label="生日">
                            {getFieldDecorator('birthday', {
                                rules: [{required: false, message: '请输入生日'}],
                            })(
                                <DatePicker allowClear/>
                            )}
                        </FormItem>
                        <FormItem label="昵称">
                            {getFieldDecorator('nickname', {
                                rules: [{required: true, message: '请输入昵称'}],
                            })(
                                <Input type="textarea" placeholder="昵称"/>
                            )}
                        </FormItem>
                        <FormItem label="手机号">
                            {getFieldDecorator('phone', {
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
                                            if (!is_valid && !(String(value) === '') && !(value == null)) {
                                                callback("手机号格式错误");
                                            }
                                            else {
                                                callback()
                                            }
                                        }
                                    }
                                ],
                            })(
                                <Input type="textarea" placeholder="手机号"/>
                            )}
                        </FormItem>
                        <FormItem label="邮箱">
                            {getFieldDecorator('email', {
                                rules: [
                                    {type: 'email', required: true, message: '邮箱格式错误'}
                                ]
                            })(
                                <Input type="textarea" placeholder="邮箱"/>
                            )}
                        </FormItem>
                        <FormItem label="状态(0为正常状态，1删除，2禁用)">
                            {getFieldDecorator('state', {
                                rules: [{required: true, message: '请输入用户状态'}]
                            })(
                                <Cascader options={userStateOptions} placeholder="状态"/>
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
            data: [],
            loading: true,
            editingId: '',
            visible: false,
        };
        this.columns = [{
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
            width: 180,//'9%',
            align: 'center'
        }, {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
            editable: true,
            width: 160,//'8%',
            align: 'center'
        }, {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            editable: true,
            width: 140,//'8%',
            align: 'center'
        }, {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
            editable: true,
            width: 160,//'10%',
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
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            editable: true,
            width: 140,//'4%',
            align: 'center',
            // fixed: 'right',
        }, {
            title: '操作',
            key: 'action',
            width: 70,//'6%',
            align: 'center',
            // fixed: 'right',
            render: (text, record) => {
                if (record.username === "admin") {
                    return <div><Icon type="lock"/></div>;
                }
                const editable = this.isEditing(record);
                return (
                    <div>
                        {editable ? (
                            <span>
                                <EditableContext.Consumer>
                                    {
                                        (form) => (
                                            <span>
                                                <a onClick={() => this.save(form, record)}>
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
        this.getAllUsers();
    }

    getAllUsers() {
        let self = this;
        axios.get("http://localhost:8080/allUsers")
            .then(function (response) {
                console.log(response);
                let newData = response.data;
                data = newData;
                self.setState({
                    loading: false,
                    data: newData,
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
        let self = this;
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
                gender: values.gender === 0 ? null : values.gender[0],// Cascade
                birthday: values.birthday === null ? null : values.birthday,
                nickname: values.nickname,
                phone: values.phone,
                email: values.email,
                state: values.state[0],// Cascade
            };

            let params = new URLSearchParams();
            params.append("newUser", JSON.stringify(newUser));
            axios.post("/addUser", params)
                .then(function (response) {
                    console.log(response);
                    message.info(response.data);
                    self.setState({
                        visible: false,
                    });
                    self.getAllUsers();
                })
                .catch(function (error) {
                    console.log(error);
                });
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

    save(form, record) {
        let self = this;
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            // let newData = [...self.state.data];
            const index = data.findIndex(item => record.userId === item.userId);
            if (index > -1) {
                let params = new URLSearchParams();
                let newItem = row;
                newItem.userId = record.userId;
                newItem.username = record.username;//fill props
                newItem.gender = newItem.gender.length === 0 ? null : newItem.gender[0];//["male"/"female"]
                newItem.state = newItem.state[0];//["0"/"1"/"2"]
                newItem.birthday = newItem.birthday === null ? null : newItem.birthday.format("YYYY-MM-DD");//moment object

                console.log(newItem);

                params.append("updateUser", JSON.stringify(newItem));
                axios.post("/updateUser", params)
                    .then(function (response) {
                        console.log(response);
                        alert(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                data.splice(index, 1, newItem);

                let newData = [...self.state.data];
                const stateIndex = newData.findIndex(item => record.userId === item.userId);
                newData.splice(stateIndex, 1, newItem);
                this.setState({data: newData, editingId: ''});
            } else {
                console.log("修改了不在data里的数据！？");
                this.setState({data: data, editingId: ''});
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

    handleSearch = (value, self) => {
        if (value === "") {
            self.setState({data: data});
        } else {
            let searchedData = [];
            data.map(function (item) {
                if (item.username.indexOf(value) !== -1) {
                    searchedData.push(item);
                }
            });
            self.setState({
                data: searchedData
            });
        }
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
                <Search
                    placeholder="search username"
                    onSearch={value => this.handleSearch(value,this)}
                    style={{ width: 160, marginLeft:10}}
                />
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