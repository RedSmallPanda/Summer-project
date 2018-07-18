import React from 'react';
import {Button, Modal, Form, Input,Icon,} from 'antd'
import "../../css/App.css"


const FormItem = Form.Item;
const Register = Form.create()(
    class extends React.Component {
        username_validate=(rule,value,callback)=>{
            //   const form = this.formRef.props.form;
            //value's type need to transform
            if(String(value).length>10){callback("username >10 ");}
            else {callback("username<10 ")}
            callback()
        };
        render() {
            const { visible, onCancel,  form, onLogin } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title={null}
                    onCancel={onCancel}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose={true}
                >
                    <div className="padding">
                        <p className="letters">注册</p>
                        <Form layout="vertical" >
                            <FormItem label={null}>
                                {getFieldDecorator('username', {
                                    rules: [
                                        { required: true, message: '请输入用户名' },
                                        //                       { max:12,message:'用户名长度不超过12', },
                                        {validator:(rule,value,callback)=>{
                                            //   const form = this.formRef.props.form;
                                            //value's type need to transform
                                            if(String(value).length>10){callback("username >10 ");}
                                            else {callback()}

                                        }},

                                    ],
                                    validateTrigger:'onBlur',
                                })(
                                    <p>
                                        <Input className="input" placeholder="Enter your username"
                                               prefix={<Icon type="user"   />}/>
                                    </p>
                                )}
                            </FormItem>
                            <FormItem label={null}>
                                {getFieldDecorator('password',{rules:[{required:true,}]})(<p><Input className="input" placeholder="Enter your password" prefix={<Icon type="lock" />}  type="password" /></p>)}
                            </FormItem>
                            <FormItem label={null}>
                                {getFieldDecorator('email', {
                                    rules: [
                                        { required: true, message: '请输入邮箱' },
                                        //                       { max:12,message:'用户名长度不超过12', },
                                        {validator:(rule,value,callback)=>{
                                            var email_validator=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                                            var is_valid=email_validator.test(String(value));
                                            //   const form = this.formRef.props.form;
                                            //value's type need to transform
                                            if(!is_valid &&!(String(value)==='')&&!(value==null)){callback("邮箱格式错误");}
                                            else {callback()}

                                        }},

                                    ],
                                    validateTrigger:'onBlur',
                                })(
                                    <p>
                                        <Input className="input" placeholder="email"
                                               prefix={<Icon type="api" spin={true}/>}/>
                                    </p>
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
                                            if(String(value).length>13){is_valid=false;}
                                            if(!is_valid &&!(String(value)==='')&&!(value==null)){callback("手机号格式错误");}
                                            else {callback()}

                                        }},

                                    ],
                                    validateTrigger:'onBlur',
                                })(
                                    <p>
                                        <Input className="input" placeholder="phone"
                                               prefix={<Icon type="phone" />}/>
                                    </p>
                                )}
                            </FormItem>
                            <Button type="primary" onClick={onLogin}> 注册 </Button>
                            <FormItem/>
                        </Form>
                    </div>
                </Modal>
            );
        }
    }
);

export default Register;