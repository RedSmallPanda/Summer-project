import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Input, Avatar,BackTop } from 'antd';
import { browserHistory} from 'react-router'
import Cookies from 'js-cookie';
import Login from './Login'
import Register from './Register'
import "../../css/App.css"
import axios from "axios";

const SubMenu = Menu.SubMenu;
const Search = Input.Search;


class HeaderMenu extends Component {
    state = {
        isLogin: this.props.isLogin,
        isAdmin: this.props.isAdmin,
        visible: false,
        regVisible: false,
        type: '',
        current: window.location.pathname,
        search: '',
        imgUrl: '',
    };

    componentWillMount() {
        if (this.props.isLogin) {
            this.getAvatar(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
        if (this.props.isLogin) {
            this.getAvatar(this);
        }
    }

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

    handleSearch = (value) => {
        browserHistory.push({
            pathname:'/dir',
            state: {
                search: value,
            },
        });
        this.setState({
            current: window.location.pathname,
        });
    };

    handleLogout = () =>{
        axios.get("/logout")
            .then(function(response){
                alert(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.props.handleLogin({
            isLogin: false,
            isAdmin: false,
        });
        Cookies.remove('username');
        this.handleHomePage();
    };

    handleHomePage = () =>{
        browserHistory.push('/home');
        this.setState({
            current: window.location.pathname,
        });
    };

    handleInfoSpace = (e) =>{
        browserHistory.push({
            pathname:'/info',
            state:{
                SelectedKeys: e.key
            }
        });
        this.setState({
            current: window.location.pathname,
        });
    };

    handleShoppingCart = () =>{
        browserHistory.push({
            pathname:'/info',
            state:{
                SelectedKeys: '1'
            }
        });
        this.setState({
            current: window.location.pathname,
        });
    };

    handleAdminSpace = (e) =>{
        browserHistory.push({
            pathname:'/admin',
            state:{
                SelectedKeys: e.key
            }
        });
        this.setState({
            current: window.location.pathname,
        });
    };

    handleDirectory = () =>{
        browserHistory.push('/dir');
        this.setState({
            current: window.location.pathname,
        });
    };

    handleAvatar = () =>{
        if(this.state.isLogin){
            this.setState({
                current: window.location.pathname,
            });
            browserHistory.push({
                pathname:'/info',
                state:{
                    SelectedKeys: '9'
                }
            });
        }
        else{
            this.showModal()
        }
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleReset = () => {
        this.setState({
            visible: false,
        });
        browserHistory.push("/resetPassword");
    };

    handleCreate = () => {
        let self = this;
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form username: '+form.getFieldValue("username"));
            console.log('password: '+form.getFieldValue("password"));

            let params = new URLSearchParams();
            params.append("username", JSON.stringify(form.getFieldValue("username")));
            params.append("password", JSON.stringify(form.getFieldValue("password")));
            axios.post("/login",params)
                .then(function(response){
                    console.log(response.data);
                    if(response.data===null){
                        self.setState({
                            visible: false,
                        });
                        alert("登录失败,请重新登录");
                    } else if (response.data === "banned") {
                        self.setState({
                            visible: false,
                        });
                        alert("该账户已被禁用（请联系管理员？？？）");
                    } else if (response.data === "unactivated") {
                        self.setState({
                            visible: false,
                        });
                        alert("账户尚未激活，请先查看注册邮箱进行激活。");
                    } else {
                        Cookies.set('username', values.username);
                        if (values.username === 'admin') {
                            self.setState({
                                visible: false,
                            });
                            self.props.handleLogin({
                                isLogin: true,
                                isAdmin: true,
                            });
                        } else {
                            self.setState({
                                visible: false,
                            });
                            self.props.handleLogin({
                                isLogin: true,
                                isAdmin: false,
                            });
                        }
                        window.location.reload();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            form.resetFields();
        });
    };

    loginToRegister = () =>{
        this.setState({
            visible:false,
            regVisible:true,
        })
    };

    RegisterToLogin = () =>{
        this.setState({
            visible:true,
            regVisible:false,
        })
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    showRegModal = () => {
        this.setState({ regVisible: true });
    };

    handleRegCancel = () => {
        this.setState({ regVisible: false });
    };

    handleRegCreate = () => {
        let self = this;
        const form = this.regFormRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form username: '+form.getFieldValue("username") );
            console.log('password: '+form.getFieldValue("password"));
            console.log('nickname: '+form.getFieldValue("nickname"));
            console.log('email: '+form.getFieldValue("email"));
            console.log('phone: '+form.getFieldValue("phone"));

            let params = new URLSearchParams();
            params.append("username", JSON.stringify(form.getFieldValue("username")));
            params.append("password", JSON.stringify(form.getFieldValue("password")));
            params.append("nickname", JSON.stringify(form.getFieldValue("nickname")));
            params.append("email", JSON.stringify(form.getFieldValue("email")));
            params.append("phone", JSON.stringify(form.getFieldValue("phone")));
            axios.post("/register",params)
                .then(function(response){
                    console.log(response.data);
                    if(response.data===null){//TODO: more detail about reg failure
                        self.setState({
                            regVisible: false,
                        });
                        alert("注册失败");
                    } else {
                        alert("验证邮件已发到邮箱，请前往激活！");
                        self.setState({
                            regVisible: false,
                        });
                        window.location.reload();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            form.resetFields();
        });
    };

    saveRegFormRef = (formRef) => {
        this.regFormRef = formRef;
    };

    render() {
        let loginButton =
            <Menu mode="horizontal" style={{border:0}}>
                <Menu.Item onClick={this.showModal}>登录</Menu.Item>
                <Menu.Item onClick={this.showRegModal}>注册</Menu.Item>
            </Menu>;

        let infoButton =
            <Menu mode="horizontal" style={{border:0}}>
                <SubMenu title={<span>个人信息<Icon type="down" /></span>}>
                    <Menu.Item key="1" onClick={this.handleInfoSpace}>我的订单</Menu.Item>
                    <Menu.Item key="5" onClick={this.handleInfoSpace}>我的动态</Menu.Item>
                    <Menu.Item key="9" onClick={this.handleInfoSpace}>账号设置</Menu.Item>
                    <Menu.Item onClick={this.handleLogout}>退出登录</Menu.Item>
                </SubMenu>
            </Menu>;

        let adminButton =
            <Menu mode="horizontal" style={{border:0}}>
                <SubMenu title={<span>管理员<Icon type="down" /></span>}>
                    <Menu.Item key="1" onClick={this.handleAdminSpace}>用户管理</Menu.Item>
                    <Menu.Item key="2" onClick={this.handleAdminSpace}>票品管理</Menu.Item>
                    <Menu.Item key="3" onClick={this.handleAdminSpace}>退款审核</Menu.Item>
                    <Menu.Item key="4" onClick={this.handleAdminSpace}>订单查询</Menu.Item>
                    <Menu.Item key="5" onClick={this.handleAdminSpace}>销量统计</Menu.Item>
                    <Menu.Item onClick={this.handleLogout}>退出登录</Menu.Item>
                </SubMenu>
            </Menu>;

        let loginOrInfo = null;

        if(this.state.isLogin && this.state.isAdmin){
            loginOrInfo = adminButton;
        }
        else if(this.state.isLogin && !this.state.isAdmin){
            loginOrInfo = infoButton;
        }
        else{
            loginOrInfo = loginButton;
        }
        let self = this;
        let renderHeader =
            <div>
                <Login
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onLogin={this.handleCreate}
                    loginToRegister={this.loginToRegister}
                    onReset={this.handleReset}
                />
                <Register
                    wrappedComponentRef={this.saveRegFormRef}
                    visible={this.state.regVisible}
                    onCancel={this.handleRegCancel}
                    onLogin={this.handleRegCreate}
                    RegisterToLogin={this.RegisterToLogin}
                />
                <Menu mode="horizontal">
                    <Row>
                        <Col span={3} onClick={this.handleHomePage}>
                            <div align="center">
                                <Icon type="global" style={{cursor: "pointer"}}/>
                                <span style={{cursor: "pointer"}}>聚票网</span>
                            </div>
                        </Col>
                        <Col span={7}>
                            <Menu
                                mode="horizontal"
                                style={{border: 0}}
                                selectedKeys={[self.state.current === "/" ? "/home" : self.state.current]}
                                defaultSelectedKeys="/home"
                            >
                                <Menu.Item key="/home" onClick={this.handleHomePage}>首页</Menu.Item>
                                <Menu.Item key="/dir" onClick={this.handleDirectory}>全部分类</Menu.Item>
                            </Menu>
                        </Col>
                        <Col span={7}>
                            <Search
                                onSearch={value => this.handleSearch(value)}
                                defaultValue={this.state.search}
                                enterButton
                            />
                        </Col>
                        <Col span={3}/>
                        <Col span={1}>
                            {
                                this.state.isLogin && this.state.imgUrl !== '' ?
                                    <img src={this.state.imgUrl}
                                         className="infoAvatar" width={40} height={40}
                                         style={{cursor: "pointer"}} onClick={this.handleAvatar}
                                         alt="default"
                                    />
                                    :
                                    <Avatar icon="user" onClick={this.handleAvatar}
                                            style={{cursor: "pointer"}}/>
                            }
                        </Col>
                        <Col span={3}>
                            {loginOrInfo}
                        </Col>
                    </Row>
                </Menu>
                <BackTop style={{
                    bottom: 50,
                    right: 50,
                }}/>
                {this.state.isLogin && !this.state.isAdmin ?
                    <BackTop visibilityHeight={-1} style={{
                        bottom: 100,
                        right: 50,
                        height: 40,
                        width: 40,
                        fontSize: 25,
                        textAlign: "center",
                        color: "#ffffff",
                        background: 'rgba(0,0,0,0.5)',
                        borderRadius: 5,
                    }}>
                        <Icon type="shopping-cart" onClick={this.handleShoppingCart}/>
                    </BackTop> : <div/>
                }
            </div>;
        return (
            renderHeader
        )
    }
}
export default HeaderMenu;
