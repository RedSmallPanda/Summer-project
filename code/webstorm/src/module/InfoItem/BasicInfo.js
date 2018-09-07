import React, { Component } from 'react';
import '../../css/BasicInfo.css';
import {
    Form, Radio, Button, Input, DatePicker, Popover, Upload, Icon
} from 'antd';
import moment from 'moment';
import axios from "axios/index";
import Cookies from "js-cookie";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY-MM-DD';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class Demo extends Component {
    constructor(props){
        super(props);

        this.state = {
            formData: {
            },
            imrUrl:'',
            loading: false,
            base64:'',
            getImg:'',

        };

        let self = this;

        this.uploaderProps = {
            name:"avatar",
            listType:"picture-card",
            className:"avatar-uploader",
            showUploadList:false,
            action:"http://localhost:8080/uploadImg",
            beforeUpload:(file)=>{
                console.log(file);
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e){
                    file = e.target.result;
                    self.setState({
                        base64:file,
                    });
                    self.addAvatar();
                    return file;
                };
            },
        }

    }

    componentDidMount(){
        let self = this;

                axios.get("http://localhost:8080/userInfo", {
                    params: {
                        username: Cookies.get('username'),
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

        this.getAvatar(this);
    };

    addAvatar = () =>{
        let params = new URLSearchParams();
        params.append('imgUrl',this.state.base64);
        params.append('username',Cookies.get('username'));
        axios.post('/addAvatar', params);
    };



    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    };

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

    getAvatar(self) {
        axios.get("/getAvatar",{
            params:{
                username:Cookies.get('username')
            }
        })
            .then(function (response) {
                console.log(response);
                self.setState({
                    imgUrl:response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 7 },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const text = <span>更改头像</span>;
        const content = <div align="center">
            <div>
                <Upload
                    {...this.uploaderProps}
                    onChange={this.handleChange}
                >
                    {uploadButton}
                </Upload>
            </div>
        </div>;

        return (
            <div>
                <br/>
                <br/>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="头像"
                    >
                        <Popover placement="rightTop" title={text} content={content}>
                            <img className="infoAvatar" height="100" width="100" src={this.state.base64 ? this.state.base64 : this.state.imgUrl} alt="default"/>
                        </Popover>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="用户名"
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
                                                value={moment(this.state.formData.birthday, dateFormat)}
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
                                {max: 12, message: '昵称长度不能超过12',},
                                {
                                    validator: (rule, value, callback) => {
                                        //   const form = this.formRef.props.form;
                                        //value's type need to transform
                                        if (String(value).length < 1) {
                                            callback("昵称不能为空");
                                        }
                                        else {
                                            callback()
                                        }

                                    }
                                },

                            ],
                        })(
                            <div>
                                <Input id="inputNickname" value={this.state.formData.nickname}
                                       onChange={this.nicknameOnChange}/>
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
                                {
                                    validator: (rule, value, callback) => {
                                        //   const form = this.formRef.props.form;
                                        //value's type need to transform
                                        if (String(value).length < 1) {
                                            callback("邮箱地址不能为空");
                                        }
                                        else {
                                            callback()
                                        }

                                    }
                                },
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
                                { required: true, message: '手机号不能为空' },
                                {validator:(rule,value,callback)=>{
                                    var phone_validator=/^([0-9])+/;
                                    var is_valid=phone_validator.test(String(value));
                                    //   const form = this.formRef.props.form;
                                    //value's type need to transform
                                    if(String(value).length !== 11){is_valid=false;}
                                    if(!is_valid &&!(String(value)==='')&&!(value===null)){callback("手机号格式错误");}
                                    else {callback()}
                                }},
                            ],
                            validateTrigger:'onBlur',
                        })(
                            <div>
                                <Input id="inputPhone" value={this.state.formData.phone} onChange={this.phoneOnChange}/>
                            </div>
                        )}
                    </FormItem>

                    <FormItem
                        wrapperCol={{span: 6, offset: 6}}
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