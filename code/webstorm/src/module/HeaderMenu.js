import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Input, Avatar} from 'antd';
import { Router, Route, Link, hashHistory} from 'react-router'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;

class HeaderMenu extends Component {
    state = {
        isLogin:false,
    };

    handleLogin = () =>{
        this.setState({
            isLogin:true,
        })
    };

    handleLogout = () =>{
        this.setState({
            isLogin:false,
        })
    };

    handleHomePage = () =>{
        hashHistory.push('/home');
    };

    handleInfoSpace = () =>{
        hashHistory.push('/info');
    };

    handleDirectory = () =>{
        hashHistory.push('/all')
    };


    renderHeader = () =>{
        if(this.state.isLogin){
            return (
                <div>
                    <Menu mode="horizontal">
                    <Row>
                        <Col span={4}><Icon type="global" />聚票网</Col>
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
                        <Col span={2}>
                            <Menu mode="horizontal" style={{border:0}}>
                                <SubMenu title={<span onClick={this.handleInfoSpace}>个人信息<Icon type="down" /></span>}>
                                    <Menu.Item>我的订单</Menu.Item>
                                    <Menu.Item>我的动态</Menu.Item>
                                    <Menu.Item>账号设置</Menu.Item>
                                    <Menu.Item onClick={this.handleLogout}>退出登录</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Col>
                    </Row>
                    </Menu>

                </div>

            )
        }
        else{
            return(
                <div>
                    <Menu mode="horizontal">
                        <Row>
                            <Col span={4}><Icon type="global" />聚票网</Col>
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
                                <Menu mode="horizontal" style={{border:0}}>
                                    <Menu.Item onClick={this.handleLogin}>登录</Menu.Item>
                                    <Menu.Item>注册</Menu.Item>
                                </Menu>
                            </Col>
                        </Row>
                    </Menu>

                </div>
            )
        }
    };

    render() {
        return (
            this.renderHeader()
        )
    }
}

export default HeaderMenu;
