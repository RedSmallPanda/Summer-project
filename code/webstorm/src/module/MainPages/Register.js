import React from 'react';
import {Button, Modal, Form, Input,Icon,Row,Col} from 'antd'
import "../../css/App.css"


const FormItem = Form.Item;
const Register = Form.create()(
    class extends React.Component {
        state = {
            confirmDirty: false,
        };

        handleConfirmBlur = (e) => {
            const value = e.target.value;
            this.setState({confirmDirty: this.state.confirmDirty || !!value});
        };

        compareToFirstPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && value !== form.getFieldValue('password')) {
                callback('两次密码不一致');
            } else {
                callback();
            }
        };

        validateToNextPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && this.state.confirmDirty) {
                form.validateFields(['confirm'], {force: true});
            }
            callback();
        };

        render() {//TODO: set nickname when register.
            const {visible, onCancel, form, onLogin} = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title={null}
                    onCancel={onCancel}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose={true}
                    width="400px"
                >
                    <div className="padding">
                        <p className="letters">注册</p>
                        <Form layout="vertical">
                            <FormItem label={null}>
                                {getFieldDecorator('username', {
                                    rules: [
                                        {required: true, message: '请输入用户名'},
                                        {
                                            validator: (rule, value, callback) => {
                                                if (String(value).length < 5) {
                                                    callback("用户名长度不足5位");
                                                } else if (String(value).length > 12) {
                                                    callback("用户名长度超过12位");
                                                } else {
                                                    callback();
                                                }
                                            }
                                        },
                                    ],
                                    // validateTrigger: 'onBlur',
                                })(
                                    <p>
                                        <Input className="input" placeholder="用户名（5-12位）"
                                               prefix={<Icon type="user"/>}/>
                                    </p>
                                )}
                            </FormItem>
                            <FormItem label={null}>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {required: true, message: '请输入密码'},
                                        {validator: this.validateToNextPassword,},
                                        {
                                            validator: (rule, value, callback) => {
                                                if (String(value).length < 6) {
                                                    callback("密码长度不足6位");
                                                } else if (String(value).length > 18) {
                                                    callback("密码长度超过18位");
                                                } else {
                                                    callback();
                                                }
                                            }
                                        }
                                    ]
                                })(
                                    <p>
                                        <Input className="input"
                                               placeholder="密码（6-18位）"
                                               prefix={<Icon type="lock"/>}
                                               type="password"/>
                                    </p>
                                )}
                            </FormItem>
                            <FormItem label={null}>
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true, message: '请确认密码',
                                    }, {
                                        validator: this.compareToFirstPassword,
                                    }],
                                })(
                                    <p>
                                        <Input className="input"
                                               placeholder="再输一次密码"
                                               prefix={<Icon type="lock"/>}
                                               type="password" onBlur={this.handleConfirmBlur}/>
                                    </p>
                                )}
                            </FormItem>
                            <FormItem label={null}>
                                {getFieldDecorator('nickname', {rules: [{required: true, message: "请输入昵称"}]})(
                                    <p>
                                        <Input className="input"
                                               placeholder="昵称"
                                               prefix={<Icon type="idcard"/>}
                                               type="nickname"/>
                                    </p>
                                )}
                            </FormItem>
                            <FormItem label={null}>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {required: true, message: '请输入邮箱'},
                                        {type: 'email', message: '邮箱格式错误'}
                                    ],
                                    // validateTrigger: 'onBlur',
                                })(
                                    <p>
                                        <Input className="input" placeholder="邮箱"
                                               prefix={<Icon type="mail"/>}/>
                                    </p>
                                )}
                            </FormItem>
                            <FormItem label={null}>
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
                                        },
                                    ],
                                    // validateTrigger: 'onBlur',
                                })(
                                    <p>
                                        <Input className="input" placeholder="手机号"
                                               prefix={<Icon type="phone"/>}/>
                                    </p>
                                )}
                            </FormItem>
                            <Row>
                                <Col span={6}>
                                    <Button type="primary" onClick={onLogin} size="large"> 注册 </Button>
                                </Col>
                                <Col span={13}/>
                                <Col span={5}>
                                    <Button type="normal" onClick={this.props.RegisterToLogin}
                                            size="large"> 登录 </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal>
            );
        }
    }
);

export default Register;