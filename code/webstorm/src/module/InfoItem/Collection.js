import React, { Component } from 'react';
import { List, Avatar, Icon } from 'antd';
const listData = [];
for (let i = 0; i < 10; i++) {
    listData.push({
        href: 'http://ant.design',//detail info
        image: 'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',//image
        title: `jpw ${i}`,//name
        time: '2018/07/02-2018/07/27',
        address: 'SE 3-101',
        grade: '0',
        description: 'description',
        stock: 4,
        heart: true,
        comments: i,
    });
}

let IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);
class Collection extends Component {
    constructor(){
        super();
        this.data = listData;
    }
    render(){
        return (
            <List
                size="large"
                itemLayout='horizontal'
                dataSource={this.data}
                footer={<div><b>find</b> more</div>}
                loading={false}
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 8,
                }}




                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText type={item.heart ? "heart" : "heart-o"}/>,
                            <IconText type="message" text="2"/>
                        ]}
                    >
                        <List.Item.Meta
                            align='left'
                            avatar={<img width={150} alt="logo" src={item.image}/>}
                            title={<a href={item.href}>{item.title}</a>}
                            description={
                                <p>
                                    {item.description}<br/>
                                    {item.time}<br/>
                                    {item.address}<br/>
                                    {item.grade}<br/>
                                </p>
                            }
                        />
                        {<p></p>}
                    </List.Item>
                )}
            />
        );
    }

}

export default Collection;
