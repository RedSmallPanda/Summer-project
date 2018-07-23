import React, { Component } from 'react';
import '../../css/BasicInfo.css';
import {
    Form, Radio, Button, Input, DatePicker,
} from 'antd';
import moment from 'moment';
import axios from "axios/index";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY-MM-DD';

class Demo extends Component {
    state = {
        formData: {
            // name:'王小明',
            // gender:'female',
            // nickname:'暗影之王',
            // email:'12345678@qq.com',
            // phone:'12345678901',
            // birthday:'2000-01-05',
            // img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530851539076&di=1806b53542a9b07d0dd12974618dd4b6&imgtype=0' +
            // '&src=http%3A%2F%2Fwww.cnr.cn%2Fjingji%2Fcjsjy%2Fjctp%2F20161013%2FW020161013523561662545.jpg',
            // province:'zhejiang',
            // city:'hangzhou',
            // district:'xihu'
        },
    };

    componentDidMount(){
        let self = this;
        let strCookie = document.cookie;
        let arrCookie = strCookie.split(";");
        for(let i = 0; i < arrCookie.length; i++){
            let arr = arrCookie[i].split("=");
            if("username" === arr[0] && arr[1]){
                axios.get("http://localhost:8080/userInfo", {
                    params: {
                        username: arr[1],
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        let preData=response.data;
                        self.setState({
                            loading: false,
                            formData: preData,
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }

    nicknameOnChange = () => {
        let newForm=this.state.formData;
        newForm.nickname=document.getElementById("inputNickname").value;
        this.setState({
            formData:newForm,
        });
    };

    emailOnChange = () => {
        let newForm=this.state.formData;
        newForm.email=document.getElementById("inputEmail").value;
        this.setState({
            formData:newForm,
        });
    };

    phoneOnChange = () => {
        let newForm=this.state.formData;
        newForm.phone=document.getElementById("inputPhone").value;
        this.setState({
            formData:newForm,
        });
    };

    dateOnChange = (date,dateString) => {
        let newForm=this.state.formData;
        newForm.birthday=String(dateString);
        if(String(date)===null){
            date=this.state.formData.birthday;
        }
        console.log("date:"+String(date));
        console.log("dateString:"+String(dateString));
        this.setState({
            formData:newForm,
        });
    };

    genderOnChange = (e) => {
        console.log('radio checked', e.target.value);
        let newForm=this.state.formData;
        newForm.gender=e.target.value;
        this.setState({
            formData:newForm,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', this.state.formData);    //Silly method
                let params = new URLSearchParams();
                params.append("form", JSON.stringify(this.state.formData));
                axios.post("/userInfo",params)
                    .then(function(response){
                        console.log(response);
                        alert(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 7 },
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
                        <div><img className="infoAvatar" height="100" width="100" src={this.state.formData.img} alt="default"/></div>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="名字"
                    >
                        <span className="ant-form-text">{this.state.formData.username}</span>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="性别"
                    >
                        {getFieldDecorator('radio-group')(
                            <div>
                                <RadioGroup onChange={this.genderOnChange} value={this.state.formData.gender}>
                                    <Radio value="male">男</Radio>
                                    <Radio value="female">女</Radio>
                                </RadioGroup>
                            </div>
                        )}
                    </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="出生日期"
                            // hasFeedback
                        >
                            {getFieldDecorator('date-picker')(
                                <div>
                                    <DatePicker id="datePicker" allowClear={false}
                                                value={moment(this.state.formData.birthday,dateFormat)}
                                                format={dateFormat} onChange={this.dateOnChange}/>
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
                                <Input id="inputEmail" value={this.state.formData.email} onChange={this.emailOnChange}/>
                            </div>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="手机号"
                        initialValue={this.state.formData.phone}
                    >
                        {getFieldDecorator('phone', {
                            rules: [
                                {validator:(rule,value,callback)=>{
                                        //   const form = this.formRef.props.form;
                                        //value's type need to transform
                                        if(value==null){
                                            value=this.state.formData.phone;
                                        }
                                        console.log(String(value));
                                        if(String(value).length!==11){callback("手机号格式错误");}
                                        //else if(String(value).length<11){callback("手机号格式错误");}
                                        else {callback()}

                                    }},
                            ],
                        })(
                            <div>
                                <Input id="inputPhone" value={this.state.formData.phone} onChange={this.phoneOnChange}/>
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