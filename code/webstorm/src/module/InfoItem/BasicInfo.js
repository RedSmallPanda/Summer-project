import React, { Component } from 'react';
import '../../css/BasicInfo.css';
import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Button, Upload, Icon, Rate, Input, Avatar
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Demo extends React.Component {
    state={
        formData:{
            name:'王小明',
            sex:'male',
            nickname:'暗影之',
            email:'12345678@qq.com',
            img:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
    };

    sexOnChange = (e) => {
        console.log('radio checked', e.target.value);
        let newForm=this.state.formData;
        newForm.sex=e.target.value;
        this.setState({
            formData:newForm,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 7},
        };
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="头像"
                    >
                        <div><img className="infoAvatar" height="100" width="100" src={this.state.formData.img} /></div>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="名字"
                    >
                        <span className="ant-form-text">{this.state.formData.name}</span>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="性别"
                    >
                        {getFieldDecorator('radio-group')(
                            <div>
                                <RadioGroup onChange={this.sexOnChange} defaultValue={this.state.formData.sex}>
                                    <Radio value="male">男</Radio>
                                    <Radio value="female">女</Radio>
                                </RadioGroup>
                            </div>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="昵称"
                    >
                        {getFieldDecorator('nickname', {
                            rules: [
                                {
                                    required: true, message: '请输入昵称!',
                                },
                                { max:12,message:'昵称长度不超过12', },
                                /*{validator:(rule,value,callback)=>{
                                        //   const form = this.formRef.props.form;
                                        //value's type need to transform
                                        if(String(value).length>10){callback("username >10 ");}
                                        else {callback()}

                                    }},*/

                            ],
                        })(
                            <div>
                                <Input defaultValue={this.state.formData.nickname}/>
                            </div>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="E-mail"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '不合法的E-mail地址!',
                            },
                            ],
                        })(
                            <div>
                                <Input defaultValue={this.state.formData.email}/>
                            </div>
                        )}
                    </FormItem>

                    <FormItem
                        wrapperCol={{ span: 6, offset: 6 }}
                    >
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedDemo = Form.create()(Demo);


class BasicInfo extends Component {
    render(){
        return(
            <div>
                <WrappedDemo />
            </div>
        )
    }
}

export default BasicInfo;