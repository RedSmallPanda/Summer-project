import React, { Component } from 'react';
import ResultList from "../MainPages/ResultList";
import { Tabs, Modal, Button } from 'antd';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class Collection extends Component {
    constructor(){
        super();
        this.state = {
            tab: 1,
        };
        this.clearCollection = this.clearCollection.bind(this);
    }
    clearCollection = () =>{
        confirm({
            title: '确认清空 我的收藏 ?',
            content: '已过期/未过期的收藏都将被删除！',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                alert("collection should be deleted.");
            },
            onCancel() {
                alert("nothing happened.");
            },
        });
    }
    render(){
        return (
            <Tabs tabBarExtraContent={<Button onClick={this.clearCollection}>清空</Button>}>
                <TabPane tab="未过期" key="1"><ResultList type="collection"/></TabPane>
                <TabPane tab="已过期" key="2"><ResultList type="collection"/></TabPane>
            </Tabs>

        );
    }
}

export default Collection;