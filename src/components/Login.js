import React, { Component } from 'react';
import {Button, Modal, Form, Input,Icon,Radio} from 'antd'



const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="Description">
                            {getFieldDecorator('description')(<Input type="textarea" />)}
                        </FormItem>
                        <FormItem className="collection-create-form_last-form-item">
                            {getFieldDecorator('modifier', {
                                initialValue: 'public',
                            })(
                                <Radio.Group>
                                    <Radio value="public">Public</Radio>
                                    <Radio value="private">Private</Radio>
                                </Radio.Group>
                            )}
                        </FormItem>
                    </Form>
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

            console.log('Received values of form: ', values);
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
                <Button type="primary" onClick={this.showModal}>New Collection</Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}




/*
class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
        };
    }
    showmodal=()=>{
        this.setState({visible:true})
    }
    cancel=()=>{
        this.setState({visible:false})
    }
    handleSubmit=()=>{
        console.log("sad");
        alert(this.props.form.getFieldValue('userName')+"-"+this.props.form.getFieldValue('passWord'));
    }
    render(){
        const FormItem = Form.Item;
        const { getFieldProps } = this.props.form;

        return(
            <div>
                <Button onClick={this.showmodal}>登录</Button>
            <Modal
                visible={this.state.visible}
                title="test"
                footer={null}
                maskClosable={false}
                onCancel={this.cancel}
            >

                <Form inline onSubmit={this.handleSubmit}>
                    <FormItem label="Account">
                        {
                            <Input placeholder="please input the account" {...getFieldProps('userName')}/>
                        }
                    </FormItem>
                    <FormItem label="Password">
                        {
                            <Input type="password" placeholder="Please input the pasword" {...getFieldProps('passWord')}/>
                        }
                    </FormItem>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form>


            </Modal>
            </div>
        )
    }

}
*/
export default CollectionsPage;