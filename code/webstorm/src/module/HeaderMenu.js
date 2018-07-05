import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Input, Avatar } from 'antd';
import { hashHistory} from 'react-router'
import Login from './Login'
import "../css/App.css"

const SubMenu = Menu.SubMenu;
const Search = Input.Search;

class HeaderMenu extends Component {

    state = {
        isLogin:false,
        visible:false,
    };

    handleLogin = () =>{
        this.setState({
            isLogin:true,
        })
    };

    handleLogout = () =>{
        this.setState({
            isLogin:false,
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
                    <Menu.Item key="5" onClick={this.handleInfoSpace}>我的动态</Menu.Item>
                    <Menu.Item key="9" onClick={this.handleInfoSpace}>账号设置</Menu.Item>
                    <Menu.Item onClick={this.handleLogout}>退出登录</Menu.Item>
                </SubMenu>
            </Menu>;

        let loginOrInfo = this.state.isLogin ? infoButton : loginButton;
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
                        <Col span={4} onClick={this.handleHomePage}>
                            <span><Icon type="global" />聚票网</span>
                        </Col>
                        <Col span={6}>
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
            </div>;
        return (
            renderHeader
        )
    }
}

export default HeaderMenu;
