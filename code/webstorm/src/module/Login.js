import React, { Component } from 'react';
import {Button, Modal, Form, Input,Icon,} from 'antd'
import "../css/App.css"


const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        //自定义 validator函数
        username_validate=(rule,value,callback)=>{
            //   const form = this.formRef.props.form;
                                                              //value's type need to transform
            if(String(value).length>10){callback("username >10 ");}
            else {callback("username<10 ")}
            callback()
        }
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
                                <Input className="input" placeholder="Enter your username"
                                       prefix={<Icon type="user"   />}/>
                                </p>
                            )}
                        </FormItem>
                        <FormItem label={null}>
                            {getFieldDecorator('password',{rules:[{required:true,}]})(<p><Input className="input" placeholder="Enter your password" prefix={<Icon type="lock" />}  type="password" /></p>)}
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

class CollectionsPage extends Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form username: '+form.getFieldValue("username") );
            console.log('password: '+form.getFieldValue("password"))
            form.resetFields();
            this.setState({ visible: false });
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>登录</Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onLogin={this.handleCreate}
                />
            </div>
        );
    }
}

export default CollectionsPage;