import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';


const FormItem = Form.Item;
class DemoForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        password:'12345566'
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            /*labelCol: {
                xs: { span: 6 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 7 },
                sm: { span: 8 },
            },*/
            labelCol: { span: 6 },
            wrapperCol: { span: 7 },
        };
        const tailFormItemLayout = {
            /*wrapperCol: {
                xs: {
                    span: 6,
                    offset: 0,
                },
                sm: {
                    span: 6,
                    offset: 8,
                },
            },*/
            wrapperCol:{ span: 6, offset: 6 }
        };

        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            <Form onSubmit={this.handleSubmit} >

                <FormItem
                    {...formItemLayout}
                    label="原密码"
                >
                    {getFieldDecorator('originPassword', {
                        rules: [{
                            required: true, message: '请输入原密码!',
                        }, {
                            validator:(rule,value,callback)=>{
                                //   const form = this.formRef.props.form;
                                //value's type need to transform
                                if((String(value)!== this.state.password)&&(String(value).length>0)){callback("输入的密码与原密码不符！");}
                                else {callback()}

                            }
                        }],
                    })(
                        <div>
                            <Input type="password" />
                        </div>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="新密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入新密码!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认新密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请再次输入新密码!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">确认提交</Button>
                </FormItem>
            </Form>
            </div>
        );
    }
}

const PasswordForm = Form.create()(DemoForm);

class Password extends Component {
    render(){
        return(
            <div>
                <PasswordForm />
            </div>
        )
    }
}

export default Password;