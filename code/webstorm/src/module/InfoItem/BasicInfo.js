import React, { Component } from 'react';
import '../../css/BasicInfo.css';
import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Button, Upload, Icon, Rate, Input, Avatar, DatePicker,
} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class Demo extends React.Component {
    state={
        formData:{
            name:'王小明',
            sex:'male',
            nickname:'暗影之王',
            email:'12345678@qq.com',
            birthday:'2000/1/5',
            img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530851539076&di=1806b53542a9b07d0dd12974618dd4b6&imgtype=0' +
            '&src=http%3A%2F%2Fwww.cnr.cn%2Fjingji%2Fcjsjy%2Fjctp%2F20161013%2FW020161013523561662545.jpg',
            province:'zhejiang',
            city:'hangzhou',
            district:'xihu'

        },
    };

    nicknameOnChange = () => {
        let newForm=this.state.formData;
        newForm.nickname=document.getElementById("inputNickname").value;
        this.setState({
            formData:newForm,
        });
    }

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
        const dateFormat = 'YYYY/MM/DD';
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 7},
        };
        return (
            <div>
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
                            label="出生日期"
                        >
                            {getFieldDecorator('date-picker')(
                                <div>
                                    <DatePicker defaultValue={moment(this.state.formData.birthday, dateFormat)} format={dateFormat} />
                                </div>
                            )}
                        </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="昵称"
                    >
                        {getFieldDecorator('nickname', {
                            rules: [
                                //{
                                  //  required: true, message: '请输入昵称!',
                                //},
                                {max:12,message:'昵称长度不能超过12', },
                                {validator:(rule,value,callback)=>{
                                        //   const form = this.formRef.props.form;
                                        //value's type need to transform
                                        if(String(value).length<1){callback("昵称不能为空");}
                                        else {callback()}

                                    }},

                            ],
                        })(
                            <div>
                                <Input id="inputNickname" value={this.state.formData.nickname} onChange={this.nicknameOnChange}/>
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
                                {validator:(rule,value,callback)=>{
                                        //   const form = this.formRef.props.form;
                                        //value's type need to transform
                                        if(String(value).length<1){callback("邮箱地址不能为空");}
                                        else {callback()}

                                    }},
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
                        <Button type="primary" htmlType="submit">确认提交</Button>
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