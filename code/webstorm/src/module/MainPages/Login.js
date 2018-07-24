import React from 'react';
import {Button, Modal, Form, Input,Icon,Row, Col} from 'antd'
import VCode from "./VCode"
import "../../css/App.css"
import "../../css/Login.css"


const FormItem = Form.Item;
const Login = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                ...this.initState(),
                result:"",
                refresh: false
            };
        }

        initState(){
            return {
                data: this.getRandom(109,48,4),
            }
        }

        handleChange = () =>{
            this.setState({
                ...this.initState(),
            })
        };

        getRandom(max, min, num) {
            const asciiNum = ~~(Math.random()*(max-min+1)+min);
            if(!Boolean(num)){
                return asciiNum
            }
            const arr = [];
            for(let i = 0; i < num; i++){
                arr.push(this.getRandom(max, min))
            }
            return arr;
        }

        setResult = (arr) =>{
            let result = "";
            for(let i = 0; i < 4; i++){
                let v;
                v = arr[i];
                result += String.fromCharCode(v > 57 && v < 84 ? v + 7 : ( v < 57 ? v : v + 13 ));
            }
            return result;
        };

        //自定义 validator函数
        username_validate=(rule,value,callback)=>{
            //   const form = this.formRef.props.form;
            //value's type need to transform
            if(String(value).length>10){callback("username >10 ");}
            else {callback("username<10 ");}
            callback()
        };
        render() {
            const { visible, onCancel,  form, onLogin } = this.props;
            const { getFieldDecorator } = form;
            return (
                <div className="loginModal">
                <Modal
                    visible={visible}
                    title={null}
                    onCancel={onCancel}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose={true}
                    width="400px"

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
                                    validateTrigger:'onBlur'
                                })(
                                    <p>
                                        <Input className="input"  placeholder="请输入用户名"
                                               prefix={<Icon type="user"   />}/>
                                    </p>
                                )}
                            </FormItem>
                            <FormItem label={null}>
                                {getFieldDecorator('password',{
                                    rules:[{
                                        required:true,
                                    }]
                                })(
                                    <p>
                                        <Input className="input"  placeholder="请输入密码" prefix={<Icon type="lock" />}  type="password" />
                                    </p>
                                )}
                            </FormItem>
                            <FormItem label={null}>
                                {getFieldDecorator('vCode',{
                                    rules:[{
                                        required:false,
                                    },{
                                        validator:(rule,value,callback)=>{
                                            //   const form = this.formRef.props.form;
                                            //value's type need to transform
                                            if(String(value).toLowerCase() !== this.setResult(this.state.data).toLowerCase()){callback("验证码错误");}
                                            else {callback()}
                                        }
                                    }],
                                    validateTrigger:'onBlur',
                                })(<p>
                                    <Row>
                                        <Col span={15}>
                                            <Input placeholder="请输入验证码" prefix={<Icon type="safety" />}/>
                                        </Col>
                                        <Col span={2}/>
                                        <VCode
                                            data={this.state.data}
                                            handleChange={this.handleChange}/>
                                    </Row>
                                </p>)}
                            </FormItem>
                            <Row>
                                <Col span={6}>
                                    <Button type="primary" onClick={onLogin} size="large"> 登录 </Button>
                                </Col>
                                <Col span={6}>
                                    <Row style={{height:'18px'}}/>
                                    <span style={{marginBottom:"0px",cursor: "pointer"}} >忘记密码？</span>
                                </Col>
                                <Col span={7}/>
                                <Col span={5}>
                                    <Button type="normal" onClick={this.props.loginToRegister} size="large"> 注册 </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal>
                </div>
            );
        }
    }
);


export default Login;