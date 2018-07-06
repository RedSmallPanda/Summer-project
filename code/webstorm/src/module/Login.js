import React, { Component } from 'react';
import {Button, Modal, Form, Input,Icon,} from 'antd'
import "../css/App.css"


const FormItem = Form.Item;
const Login = Form.create()(
    class extends React.Component {
        //自定义 validator函数
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
                        <p className="letters">请登录</p>
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
                                <Input className="input"  placeholder="Enter your username"
                                       prefix={<Icon type="user"   />}/>
                                </p>
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('password',{rules:[{required:true,}]})(<p><Input className="input"  placeholder="Enter your password" prefix={<Icon type="lock" />}  type="password" /></p>)}
                        </FormItem>
                        <Button type="primary" onClick={onLogin}> 登录 </Button>
                        <FormItem/>
                    </Form>
                    </div>
                </Modal>
            );
        }
    }
);


export default Login;