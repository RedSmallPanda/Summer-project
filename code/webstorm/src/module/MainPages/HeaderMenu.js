import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Input, Avatar,BackTop } from 'antd';
import { browserHistory} from 'react-router'
import Login from './Login'
import Register from './Register'
import "../../css/App.css"


const SubMenu = Menu.SubMenu;
const Search = Input.Search;

class HeaderMenu extends Component {

    state = {
        isLogin:false,
        isAdmin:false,
        visible:false,
        regVisible:false,
        type:'',
        current: "home",
        search: '',
    };

    // componentWillMount(){
    //     let key = document.cookie.split(";")[0].split("=")[0];
    //     let username = document.cookie.split(";")[0].split("=")[1];
    //     if (username&&key==="username") {
    //         this.setState({
    //             isLogin:true
    //         })
    //     }
    // }

    componentWillMount(){
        let strCookie = document.cookie;
        let arrCookie = strCookie.split(";");
        let username;
        for(let i = 0; i < arrCookie.length; i++){
            let arr = arrCookie[i].split("=");
            if("username" === arr[0] && arr[1]){
                if(arr[1] === "admin") {
                    this.setState({
                        isLogin: true,
                        isAdmin: true
                    });
                }
                else {
                    this.setState({
                        isLogin: true
                    })
                }
            }
        }
    }

    handleSearch = (value) => {
        // localStorage.setItem('search',value);
        browserHistory.push({
            pathname:'/dir',
            state: {
                search: value,
            },
        });
        this.setState({
            current: "dir"
        });
    };
    handleLogout = () =>{
        this.setState({
            isLogin:false,
            isAdmin:false,
        });
        document.cookie="username=";
        this.handleHomePage()
    };

    handleHomePage = () =>{
        browserHistory.push('/home');
        this.setState({
            current: "home",
        });
    };

    handleInfoSpace = (e) =>{
        // localStorage.setItem('key',e.key);
        browserHistory.push({
            pathname:'/info',
            state:{
                SelectedKeys: e.key
            }
        });
        this.setState({
            current: ""
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
            current: ""
        });
    };

    handleDirectory = () =>{
        browserHistory.push('/dir');
        this.setState({
            current: "dir"
        });
    };

    handleAvatar = () =>{
        if(this.state.isLogin){
            localStorage.setItem('key',9);
            browserHistory.push({
                pathname:'/info'
            });
            this.setState({
                current: ""
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

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form username: '+form.getFieldValue("username") );
            console.log('password: '+form.getFieldValue("password"));
            form.resetFields();
            document.cookie="username="+values.username;
            if(values.username === 'admin'){
                this.setState({
                    visible: false,
                    isLogin: true,
                    isAdmin:true,
                });
                window.location.reload();
                return;
            }
            this.setState({
                visible: false,
                isLogin: true,
            });
            window.location.reload();
        });
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
        const form = this.regFormRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form username: '+form.getFieldValue("username") );
            console.log('password: '+form.getFieldValue("password"))
            form.resetFields();
            this.setState({ regVisible: false });
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
                    <Menu.Item key="4" onClick={this.handleAdminSpace}>销量统计</Menu.Item>
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

        let renderHeader =
            <div>
                <Login
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onLogin={this.handleCreate}
                />
                <Register
                    wrappedComponentRef={this.saveRegFormRef}
                    visible={this.state.regVisible}
                    onCancel={this.handleRegCancel}
                    onLogin={this.handleRegCreate}
                />
                <Menu mode="horizontal">
                    <Row>
                        <Col span={3} onClick={this.handleHomePage}>
                            <div align="center"><Icon type="global"/>聚票网</div>
                        </Col>
                        <Col span={7}>
                            <Menu
                                mode="horizontal"
                                style={{border: 0}}
                                selectedKeys={[this.state.current]}
                                defaultSelectedKeys="home"
                            >
                                <Menu.Item key="home" onClick={this.handleHomePage}>首页</Menu.Item>
                                <Menu.Item key="dir" onClick={this.handleDirectory}>全部分类</Menu.Item>
                            </Menu>
                        </Col>
                        <Col span={7}>
                            <Search
                                placeholder="搜索   TODO: 分享  购物车  销量  回复  退款申请  找回密码"
                                onSearch={value => this.handleSearch(value)}
                                defaultValue={this.state.search}
                                enterButton
                            />
                        </Col>
                        <Col span={3}/>
                        <Col span={1}>
                            <Avatar icon="user" onClick={this.handleAvatar}/>
                        </Col>
                        <Col span={3}>
                            {loginOrInfo}
                        </Col>
                    </Row>
                </Menu>
                <BackTop/>
            </div>;
        return (
            renderHeader
        )
    }
}

export default HeaderMenu;
