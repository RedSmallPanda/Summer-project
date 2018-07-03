import React, { Component } from 'react';
import { Row, Col, Menu, Icon} from 'antd'
import BasicInfo from './InfoItem/BasicInfo'
import Password from './InfoItem/Password'
import '../css/App.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class InfoSpace extends Component{

    state = {
        SelectedKeys:'9',
        OpenKeys:'sub3',

    };

   handleClick = (e) =>{
        this.setState({
            SelectedKeys:e.key
        });
        //alert(this.state.SelectedKeys)
    };

   renderContent = () =>{
       return(
           <BasicInfo/>
       )
   };

    render(){
        let basicInfo = <BasicInfo/>;
        let password = <Password/>;
        let InfoContent = null;
        if(this.state.SelectedKeys==='9'){
            InfoContent = basicInfo
        }
        else if(this.state.SelectedKeys==='10'){
            InfoContent = password
        }

        const renderInfoBar =
            <div style={{marginTop:20}}>
                <Row>
                    <Col span={4}/>
                    <Col span={4}>
                        <Menu
                            onClick={this.handleClick}
                            style={{ width: 200 }}
                            defaultSelectedKeys={[this.state.SelectedKeys]}
                            defaultOpenKeys={[this.state.OpenKeys]}
                            mode="inline"
                        >
                            <SubMenu key="sub1" title={<span>订单管理</span>}>
                                <Menu.Item key='1'>当前订单</Menu.Item>
                                <Menu.Item key='2'>历史订单</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span>动态管理</span>}>
                                <Menu.Item key="5">我的收藏</Menu.Item>
                                <Menu.Item key="6">我的评论</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span>账号设置</span>}>
                                <Menu.Item key="9">基本信息</Menu.Item>
                                <Menu.Item key="10">修改密码</Menu.Item>
                                <Menu.Item key="11">收获地址</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                    <Col span={12}>
                        <div>
                            {InfoContent}
                        </div>
                    </Col>

                </Row>
            </div>;

        return(
            renderInfoBar
        )
    }

}

export default InfoSpace;