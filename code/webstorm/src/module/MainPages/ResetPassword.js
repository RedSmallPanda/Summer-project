import React, { Component } from 'react';
import {
    Form, Input, Steps, Row, Col, Icon, Button
} from 'antd';
import axios from "axios";

const Step=Steps.Step;
const FormItem = Form.Item;
const Search = Input.Search;

class ResetStep0Form extends Component {
    sendAuth = () => {
        this.props.form.validateFields(
            ['username','email'],
            (err, values) => {
                if(err) return;
                axios.get("/createResetAuth", {
                    params: {
                        username: values.username,
                        email: values.email,
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        if (response.data === true) {
                            console.log('To reset password: ', values);
                            alert(values.username +
                                "\n验证码已经发出，请前往查看\n"
                                + values.email);
                        } else if (response.data === false) {
                            alert("邮箱输入有误");
                        } else {
                            alert(response.data);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("unexpected error(including 404)");
                    });
            });
    };
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="输入账号"
                >
                    {getFieldDecorator('username', {
                        rules: [{
                            required: true, message: 'Please input your username!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="输入注册邮箱"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your email!',
                        }],
                    })(
                        <Search enterButton="Send"
                                onSearch={this.sendAuth}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="输入验证码"
                >
                    {getFieldDecorator('auth', {
                        rules: [{
                            required: true, message: 'Please input your 验证码!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
            </Form>
        );
    }
}
const Step0Form = Form.create()(ResetStep0Form);

class ResetStep1Form extends Component {
    state = {
        confirmDirty: false,
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    };
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
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

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
        };
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="输入新密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
            </Form>
        );
    }
}
const Step1Form = Form.create()(ResetStep1Form);

class ResetPassword extends Component {
    state = {
        firstStep: 0,
        secondStep: 0,
    };

    confirmS1 = () => {
        let self = this;
        this.accountFormRef.props.form.validateFields((err, values) => {
            if (err) return;
            axios.get("/resetAuth", {
                params: {
                    username: values.username,
                    email: values.email,
                    auth: values.auth
                }
            })
                .then(function (response) {
                    console.log(response);
                    if (response.data === true) {
                        console.log('Reset password with auth: ', values);
                        self.setState({firstStep: 1});
                    } else if (response.data === false) {
                        alert("请检查填写信息和验证码是否有误");
                    } else {
                        alert(response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    };

    confirmS2 = () => {
        let self = this;
        this.passwordFormRef.props.form.validateFields((err, values) => {
            if (err) return;
            axios.get("/reset", {
                params: {
                    password: values.password
                }
            })
                .then(function (response) {
                    console.log(response);
                    if (response.data === true) {
                        self.setState({secondStep: 1});
                    }else if (response.data === false) {
                        alert("修改失败");
                    } else {
                        alert(response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    };

    saveAccountFormRef = (formRef) => {
        this.accountFormRef = formRef;
    };

    savePasswordFormRef = (formRef) => {
        this.passwordFormRef = formRef;
    };


    render() {
        let step0Page = <div>
            <Step0Form wrappedComponentRef={this.saveAccountFormRef}/>
            <Button style={{float: "right", width: "110px"}}
                    onClick={this.confirmS1}
                    type="primary"
                    size="large">确认</Button>
        </div>;

        let step1Page = <div>
            <Step1Form wrappedComponentRef={this.savePasswordFormRef}/>
            <Button style={{float: "right", width: "110px"}}
                    onClick={this.confirmS2}
                    type="primary"
                    size="large">确认</Button>
        </div>;

        let step2Page = <div>
            <br/>
            <div className="recBorder">
                &emsp;<Icon type="check" style={{fontSize: 50, color: '#4cc232'}}/>&ensp;密码重置成功!
            </div>
        </div>;


        let resetPage = null;
        if (this.state.firstStep === 0 && this.state.secondStep === 0) {
            resetPage = step0Page;
        }
        else if (this.state.firstStep === 1 && this.state.secondStep === 0) {
            resetPage = step1Page;
        }
        else if (this.state.firstStep === 1 && this.state.secondStep === 1) {
            resetPage = step2Page;
        }
        else {
            console.log("reset password step error");
        }
        return (
            <div>
                <br/>
                <br/>
                <Row>
                    <Col span={4}/>
                    <Col span={16}>
                        <Steps current={this.state.firstStep + this.state.secondStep} align="left">
                            <Step title="验证账号"/>
                            <Step title="重置密码"/>
                            <Step title="修改成功"/>
                        </Steps>
                        <br/>
                        <br/>
                        {resetPage}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ResetPassword;