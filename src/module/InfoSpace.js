import React, { Component } from 'react';
import { Row, Col, Menu, Icon} from 'antd'
import BasicInfo from './InfoItem/BasicInfo'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class InfoSpace extends Component{

    render(){
        return(
            <div style={{marginTop:20}}>
                <Row>
                    <Col span={4}/>
                    <Col span={4}>
                        <Menu
                            onClick={this.handleClick}
                            style={{ width: 200 }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            <SubMenu key="sub1" title={<span>订单管理</span>}>
                                <Menu.Item key="1">当前订单</Menu.Item>
                                <Menu.Item>历史订单</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span>动态管理</span>}>
                                <Menu.Item key="5">我的收藏</Menu.Item>
                                <Menu.Item key="6">我的评论</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title={<span>账号设置</span>}>
                                <Menu.Item key="9">基本信息</Menu.Item>
                                <Menu.Item key="10">修改密码</Menu.Item>
                                <Menu.Item key="11">收获地址</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                    <Col span={12}>
                        <BasicInfo/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default InfoSpace;