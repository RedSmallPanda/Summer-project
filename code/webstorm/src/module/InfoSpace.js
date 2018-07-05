import React, { Component } from 'react';
import { Row, Col, Menu, Icon} from 'antd'
import BasicInfo from './InfoItem/BasicInfo'
import Password from './InfoItem/Password'
import Address from "./InfoItem/Address";
import Collection from "./InfoItem/Collection";
import Comment from "./InfoItem/Comment";
import Order from './InfoItem/Order'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class InfoSpace extends Component{

    state = {
        SelectedKeys:'9',
        OpenKeys:['sub1','sub2','sub3']

    };

    componentWillMount() {
        this.setState({
            SelectedKeys: this.props.params.keyId
        })
    };

    handleClick = (e) =>{
        this.setState({
            SelectedKeys:e.key
        });
    };

    render(){
        let address = <Address/>;
        let basicInfo = <BasicInfo/>;
        let collection = <Collection/>;
        let comment = <Comment/>;
        let order = <Order/>;
        let password = <Password/>;

        let infoContent = null;
        switch (this.state.SelectedKeys){
            case '1':
            case '2':
                infoContent = order;
                break;
            case '5':
                infoContent = collection;
                break;
            case '6':
                infoContent = comment;
                break;
            case '9':
                infoContent = basicInfo;
                break;
            case '10':
                infoContent = password;
                break;
            case '11':
                infoContent = address;
                break;
            default:
                infoContent = order;
        }


        const infoBar =
            <div style={{marginTop:20}}>
                <Row>
                    <Col span={4}/>
                    <Col span={4}>
                        <Menu
                            onClick={this.handleClick}
                            style={{ width: 200 }}
                            defaultSelectedKeys={[this.state.SelectedKeys]}
                            defaultOpenKeys={this.state.OpenKeys}
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
                            {infoContent}
                        </div>
                    </Col>

                </Row>
            </div>;

        return(
            infoBar
        )
    }

}

export default InfoSpace;