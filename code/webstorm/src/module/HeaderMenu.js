import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Input, Avatar,BackTop } from 'antd';
import { hashHistory} from 'react-router'
import Login from './Login'
import "../css/App.css"

const SubMenu = Menu.SubMenu;
const Search = Input.Search;

class HeaderMenu extends Component {

    state = {
        isLogin:false,
        isAdmin:false,
        visible:false,
        type:''
    };

    handleLogout = () =>{
        this.setState({
            isLogin:false,
            isAdmin:false,
        });
        this.handleHomePage()
    };

    handleHomePage = () =>{
        hashHistory.push('/home');
    };

    handleInfoSpace = (e) =>{
        hashHistory.push({
            pathname:'/info/'+e.key
        });
    };

    handleAdminSpace = (e) =>{
        hashHistory.push({
            pathname:'/admin/'+e.key
        });
    };

    handleDirectory = () =>{
        hashHistory.push('/dir/all')
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
            if(values.username === 'admin'){
                this.setState({
                    visible: false,
                    isLogin: true,
                    isAdmin:true,
                });
                return;
            }
            this.setState({
                visible: false,
                isLogin: true,
            });
        });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render() {

        let loginButton =
            <Menu mode="horizontal" style={{border:0}}>
                <Menu.Item onClick={this.showModal}>登录</Menu.Item>
                <Menu.Item>注册</Menu.Item>
            </Menu>;

        let infoButton =
            <Menu mode="horizontal" style={{border:0}}>
                <SubMenu title={<span>个人信息<Icon type="down" /></span>}>
                    <Menu.Item key="1" onClick={this.handleInfoSpace}>我的订单</Menu.Item>
                    <Menu.Item key="3" onClick={this.handleInfoSpace}>我的优惠券</Menu.Item>
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
                <Menu mode="horizontal">
                    <Row>
                        <Col span={3} onClick={this.handleHomePage}>
                            <div align="center"><Icon type="global" />聚票网</div>
                        </Col>
                        <Col span={7}>
                            <Menu mode="horizontal" style={{border:0}}>
                                <Menu.Item onClick={this.handleHomePage}>首页</Menu.Item>
                                <Menu.Item onClick={this.handleDirectory}>全部分类</Menu.Item>
                            </Menu>
                        </Col>
                        <Col span={7}>
                            <Search
                                placeholder="搜索"
                                enterButton
                            />
                        </Col>
                        <Col span={3}/>
                        <Col span={1}>
                            <Avatar icon="user" />
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
