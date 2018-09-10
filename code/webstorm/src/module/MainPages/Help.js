import React, { Component } from 'react';
import {Layout, Menu, Breadcrumb, Icon, Row, Col} from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Help extends Component{
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    rootSubmenuValues = {
        'sub1': '购票帮助',
        'sub2': '注意事项',
        'sub3': '常见问题',
    };
    menuItemValues = {
        '1': '购票帮助 1',
        '2': '购票帮助 2',
        '3': '购票帮助 3',
        '4': '注意事项 1',
        '5': '注意事项 2',
        '6': '注意事项 3',
        '7': '常见问题 1',
        '8': '常见问题 2',
        '9': '常见问题 3',
    };

    state = {
        openKeys: ['sub1'],
        selectedKeys: ['1'],
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys, selectedKeys: []});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
                selectedKeys: [],
            });
        }
    };

    onSelect = (selectedKeys) => {
        this.setState({
            selectedKeys: [selectedKeys.key],
        });
    };

    render(){
        return (
            <div className="help">
                {/*<h1>帮助 Q&A</h1>*/}
                <Row>
                    <Col span={1}/>
                    <Col span={4}>
                        <Menu
                            mode="inline"
                            openKeys={this.state.openKeys}
                            selectedKeys={this.state.selectedKeys}
                            onOpenChange={this.onOpenChange}
                            onSelect={this.onSelect}
                        >
                            <SubMenu key="sub1" title={<span
                                style={{fontSize: 20}}><span>{this.rootSubmenuValues["sub1"]}</span></span>}>
                                <Menu.Item key="1">{this.menuItemValues['1']}</Menu.Item>
                                <Menu.Item key="2">{this.menuItemValues['2']}</Menu.Item>
                                <Menu.Item key="3">{this.menuItemValues['3']}</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span
                                style={{fontSize: 20}}><span>{this.rootSubmenuValues["sub2"]}</span></span>}>
                                <Menu.Item key="4">{this.menuItemValues['4']}</Menu.Item>
                                <Menu.Item key="5">{this.menuItemValues['5']}</Menu.Item>
                                <Menu.Item key="6">{this.menuItemValues['6']}</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span
                                style={{fontSize: 20}}><span>{this.rootSubmenuValues["sub3"]}</span></span>}>
                                <Menu.Item key="7">{this.menuItemValues['7']}</Menu.Item>
                                <Menu.Item key="8">{this.menuItemValues['8']}</Menu.Item>
                                <Menu.Item key="9">{this.menuItemValues['9']}</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                    <Col span={18}>
                        <Content style={{padding: 20}}>
                            <Breadcrumb style={{margin: 16, fontSize: 20}}>
                                <Breadcrumb.Item>帮助Q&A</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.rootSubmenuValues[this.state.openKeys]}</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.menuItemValues[this.state.selectedKeys]}</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{
                                background: '#fff',
                                padding: 30,
                                minHeight: 280
                            }}>content
                            </div>
                        </Content>
                    </Col>
                    <Col span={1}/>
                </Row>
            </div>
        );
    }
}

export default Help;