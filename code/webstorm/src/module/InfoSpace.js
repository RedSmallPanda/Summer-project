import React, { Component } from 'react';
import { Row, Col, Menu, Icon} from 'antd'
import BasicInfo from './InfoItem/BasicInfo'
import Password from './InfoItem/Password'
import Address from "./InfoItem/Address";
import Collection from "./InfoItem/Collection";
import Comment from "./InfoItem/Comment";
import Order from './InfoItem/Order'
import HistoryOrder from './InfoItem/HistoryOrder'
import Coupon from './InfoItem/Coupon'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class InfoSpace extends Component{

    state = {
        SelectedKeys:'9',
        OpenKeys:['sub1','sub2','sub3','sub4']

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
        let historyOrder=<HistoryOrder/>;
        let coupon=<Coupon/>;

        let infoContent = null;
        switch (this.state.SelectedKeys){
            case '1':
                infoContent = order;
                break;
            case '2':
                infoContent = historyOrder;
                break;
            case '3':
                infoContent = coupon;
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
                    <Col span={3}/>
                    <Col span={3}>
                        <div align="center">
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={[this.state.SelectedKeys]}
                            defaultOpenKeys={this.state.OpenKeys}
                            mode="inline"
                        >
                            <SubMenu key="sub1" title={<span>订单管理</span>}>
                                <Menu.Item key='1'>当前订单</Menu.Item>
                                <Menu.Item key='2'>历史订单</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title={<span>优惠券</span>}>
                                <Menu.Item key='3'>我的优惠券</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span>动态管理</span>}>
                                <Menu.Item key="5">我的收藏</Menu.Item>
                                <Menu.Item key="6">我的评论</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span>账号设置</span>}>
                                <Menu.Item key="9">基本信息</Menu.Item>
                                <Menu.Item key="10">修改密码</Menu.Item>
                                <Menu.Item key="11">收货地址</Menu.Item>
                            </SubMenu>
                        </Menu>
                        </div>
                    </Col>
                    <Col span={15}>
                        <div style={{ marginLeft:20}}>
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