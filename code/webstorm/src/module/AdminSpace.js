import React, { Component } from 'react';
import { Row, Col, Menu, Icon} from 'antd'
import TicketManage from './AdminItem/TicketManage'
import SalesData from './AdminItem/SalesData'
import UserManage from './AdminItem/UserManage'
import RefundAudit from './AdminItem/RefundAudit'

class AdminSpace extends Component{

    state = {
        SelectedKeys:localStorage.getItem('key'),
        OpenKeys:['sub1','sub2','sub3']
    };

    /*componentWillMount() {
        this.setState({
            SelectedKeys: localStorage.getItem('key')
        })
    };*/

    componentWillReceiveProps(nextProps) {
        this.setState({
            SelectedKeys:localStorage.getItem('key')
        })
    }

    handleClick = (e) =>{
        this.setState({
            SelectedKeys:e.key
        });
    };

    render(){

        let userManage = <UserManage/>;
        let ticketManage = <TicketManage/>;
        let refundAudit = <RefundAudit/>;
        let salesData = <SalesData/>;

        let adminContent = null;

        let key = this.state.SelectedKeys;
        switch (key){
            case '1':
                adminContent = userManage;
                break;
            case '2':
                adminContent = ticketManage;
                break;
            case '3':
                adminContent = refundAudit;
                break;
            case '4':
                adminContent = salesData;
                break;
            default:
                adminContent = userManage;
        }

        alert(key);
        let menu = <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={[key]}
            //SelectedKeys={[this.state.SelectedKeys]}
            mode="inline"
        >
            <Menu.Item key="1">用户管理</Menu.Item>
            <Menu.Item key="2">票品管理</Menu.Item>
            <Menu.Item key="3">退款审核</Menu.Item>
            <Menu.Item key="4">销量统计</Menu.Item>
        </Menu>
        //alert
        let adminBar =
            <div style={{marginTop:20}}>
                <Row>
                    <Col span={3}/>
                    <Col span={3}>
                        <div align="center">
                            {menu}
                        </div>
                    </Col>
                    <Col span={15}>
                        <div style={{ marginLeft:20}}>
                            {adminContent}
                        </div>
                    </Col>

                </Row>
            </div>;

        return(
            adminBar
        )
    }
}

export default AdminSpace;