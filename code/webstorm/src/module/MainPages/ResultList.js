import React, { Component } from 'react';
import { Menu, Dropdown, List, Button, Icon, Rate } from 'antd';
import { browserHistory } from 'react-router'
import axios from 'axios';
import moment from 'moment';
import Cookies from "js-cookie";

import Image from './Image'

const dateFormat = "YYYY-MM-DD";
let listData = [];
// for (let i = 0; i < 10; i++) {
//     listData.push({
//         showId: i,
//         image: 'https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg',//image
//         title: `jpw ${i}`,//name
//         starttime: "2018/07/02",
//         endtime: `2018/07/${(7 + i) < 10 ? `0${7 + i}` : 7 + i}`,
//         address: "SE 3-101",
//         rate: 9,
//         info: 'description',
//         stock: 0,
//         isLike: true,
//         commentNum: i,
//         minPrice: 99.99,
//         city: "sh",
//     });
// }

let IconText = ({ type, text, onClick}) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} onClick={onClick}/>
        {text}
  </span>
);

class ResultList extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            data: [],
            size:0,
            tempData:[],
            page:1,
        };

        this.collect = this.collect.bind(this);
        this.judgeDate = this.judgeDate.bind(this);
        this.detail = this.detail.bind(this);
        this.getResult = this.getResult.bind(this);
    }

    // POST to get data and filter
    getResult(self, prop, currentPage) {
        axios.get("/shows", {
            params: {
                city: prop.filter.city,
                type: prop.filter.type,
                time: prop.filter.time,
                starttime: moment(prop.filter.starttime).format(dateFormat),
                endtime: moment(prop.filter.endtime).format(dateFormat),
                search: prop.filter.search,
                collection: prop.type,
                page:currentPage,
            }
        })
            .then(function (response) {
                console.log(response);
                // alert(JSON.stringify(response.data[0]));
                listData = response.data;
                let tempData=self.state.data;
                for(let i=0;i<listData.length;i++){
                    tempData.splice((currentPage-1)*10+i,1,listData[i]);
                }
                self.setState({
                    loading: false,
                    data: tempData,
                });
            })
            .catch(function (error) {
                console.log(error);
                self.setState({
                    loading: false,
                });
            });
    }

    getOriginSize(self, prop) {
        axios.get("/originNumber", {
            params: {
                city: prop.filter.city,
                type: prop.filter.type,
                time: prop.filter.time,
                starttime: moment(prop.filter.starttime).format(dateFormat),
                endtime: moment(prop.filter.endtime).format(dateFormat),
                search: prop.filter.search,
            }
        })
            .then(function (response) {
                console.log(response);
                // alert(JSON.stringify(response.data[0]));
                self.setState({
                    size:response.data,
                });
                console.log("dataaaaaa: "+response.data);
                console.log("sizeeeeee: "+self.state.size);
            })
            .catch(function (error) {
                console.log(error);
                self.setState({
                    loading: false,
                });
            });
    }

    getImage(self) {
        axios.get("/getImage")
            .then(function (response) {
                console.log(response);
                self.setState({
                    imgUrl:response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    componentDidMount(){
        if(this.props.type!=="collection") {
            let size = 0;
            let self = this;

            axios.get("/originNumber", {
                params: {
                    city: self.props.filter.city,
                    type: self.props.filter.type,
                    time: self.props.filter.time,
                    starttime: moment(self.props.filter.starttime).format(dateFormat),
                    endtime: moment(self.props.filter.endtime).format(dateFormat),
                    search: self.props.filter.search,
                }
            })
                .then(function (response) {
                    console.log(response);
                    // alert(JSON.stringify(response.data[0]));

                    console.log("dataaaaaa: " + response.data);
                    console.log("sizeeeeee: " + self.state.size);
                    size = response.data;
                    console.log(size);
                    let data = [];
                    for (let i = 0; i < size; i++) {
                        data.push({title: "xxx"});
                    }
                    console.log("originnnnnn: " + self.state.data.length);
                    console.log(size);
                    console.log(data);
                    self.setState({
                        data: data,
                        size: response.data,
                        page: 1,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                    self.setState({
                        loading: false,
                    });
                });


            axios.get("/shows", {
                params: {
                    city: self.props.filter.city,
                    type: self.props.filter.type,
                    time: self.props.filter.time,
                    starttime: moment(self.props.filter.starttime).format(dateFormat),
                    endtime: moment(self.props.filter.endtime).format(dateFormat),
                    search: self.props.filter.search,
                    collection: self.props.type,
                    page: 1,
                }
            })
                .then(function (response) {
                    console.log(response);
                    // alert(JSON.stringify(response.data[0]));
                    listData = response.data;
                    let tempData = self.state.data;
                    for (let i = 0; i < listData.length; i++) {
                        tempData.splice(i, 1, listData[i]);
                    }
                    self.setState({
                        loading: false,
                        data: tempData,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                    self.setState({
                        loading: false,
                    });
                });
        }
        else{
            this.getResult(this,this.props,1);
        }
    }
    componentWillReceiveProps(nextProps) {
        let size = 0;
        let self=this;

        axios.get("/originNumber", {
            params: {
                city: nextProps.filter.city,
                type: nextProps.filter.type,
                time: nextProps.filter.time,
                starttime: moment(nextProps.filter.starttime).format(dateFormat),
                endtime: moment(nextProps.filter.endtime).format(dateFormat),
                search: nextProps.filter.search,
            }
        })
            .then(function (response) {
                console.log(response);
                // alert(JSON.stringify(response.data[0]));

                console.log("dataaaaaa: "+response.data);
                console.log("sizeeeeee: "+self.state.size);
                size = response.data;
                console.log(size);
                let data=[];
                for(let i=0;i<size;i++){
                    data.push({title:"xxx"});
                }
                console.log("originnnnnn: "+self.state.data.length);
                console.log(size);
                console.log(data);
                self.setState({
                    data:data,
                    size:response.data,
                    page:1,
                });
            })
            .catch(function (error) {
                console.log(error);
                self.setState({
                    loading: false,
                });
            });



        axios.get("/shows", {
            params: {
                city: nextProps.filter.city,
                type: nextProps.filter.type,
                time: nextProps.filter.time,
                starttime: moment(nextProps.filter.starttime).format(dateFormat),
                endtime: moment(nextProps.filter.endtime).format(dateFormat),
                search: nextProps.filter.search,
                collection: nextProps.type,
                page:1,
            }
        })
            .then(function (response) {
                console.log(response);
                // alert(JSON.stringify(response.data[0]));
                listData = response.data;
                let tempData=self.state.data;
                for(let i=0;i<listData.length;i++){
                    tempData.splice(i,1,listData[i]);
                }
                self.setState({
                    loading: false,
                    data: tempData,
                });
            })
            .catch(function (error) {
                console.log(error);
                self.setState({
                    loading: false,
                });
            });
    }

    collect(showId,isLike) {
        let self = this;
        let username = Cookies.get('username');
        if (typeof(username) !== "undefined" && username !== "") {
            axios.get("/collect", {
                params: {
                    showId: showId,
                    isLike: isLike,
                }
            })
                .then(function (response) {
                    console.log("change collection" + showId + response);
                    if (response.data === true || response.data === false) {
                        listData.forEach(function (item) {
                            if (item.showId === showId) {
                                item.isLike = !item.isLike;
                            }
                        });
                        self.setState({
                            data: listData,
                        });
                        alert(response.data ? "收藏成功！" : "已移出收藏");
                    } else {
                        alert("收藏失败！");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("请先登录~~~");
        }
    }

    //judge out-of-date
    //todo: judge by exact time
    judgeDate(endTime){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let currentDateTime = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;
        return currentDateTime < endTime;
    }

    detail(showId){
        browserHistory.push({
            pathname: "/detail/" + showId,
        });
    }
    comment(showId){
        browserHistory.push({
            pathname:"/detail/" + showId,
        });
    }

    render(){
        // alert("ResultList: "+this.props.filter.search);
        return (
            <div>
                <List
                    size="large"
                    itemLayout='horizontal'
                    dataSource={this.state.data}
                    footer={<a href="/"><b>发现</b> 更多</a>}
                    loading={this.state.loading}
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                            this.getResult(this, this.props,page);
                            this.setState({
                                page:page,
                            });
                        },
                        pageSize: 10,
                        current: this.state.page,
                    }}

                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText type={item.isLike ? "heart" : "heart-o"}
                                          onClick={() => this.collect(item.showId, item.isLike)}/>,
                                <IconText type="message" text={item.commentNum}
                                          onClick={() => this.comment(item.showId)}/>,//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111
                                <Dropdown
                                    overlay={(
                                        <Menu>
                                            <Menu.Item>
                                                <a target="_blank" rel="noopener noreferrer"
                                                   href={
                                                       "http://connect.qq.com/widget/shareqq/index.html?"
                                                       + "url=http://www.baidu.com" //detail page
                                                       + "&title=" + item.title//show title
                                                       + "&pics=https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg"
                                                       + "&summary=" + item.info
                                                       + "&desc=快上聚票网看看"
                                                   }>
                                                    <Icon type="qq"/> QQ
                                                </a>
                                            </Menu.Item>
                                            {/*<Menu.Item>*/}
                                            {/*<a target="_blank" rel="noopener noreferrer">*/}
                                            {/*<span>*/}
                                            {/*<Icon type="wechat"/>WeChat*/}
                                            {/*</span>*/}
                                            {/*</a>*/}
                                            {/*</Menu.Item>*/}
                                            <Menu.Item>
                                                <a target="_blank" rel="noopener noreferrer"
                                                   href={
                                                       "http://service.weibo.com/share/share.php?"
                                                       + "url=http://www.baidu.com" //detail page
                                                       + "&title=" + item.title//show title
                                                       + "&pics=https://img.piaoniu.com/poster/d1ecfa59a6c6d38740578624acbdcdcd087db77c.jpg"
                                                       + "&summary=" + item.info
                                                       + "&desc=快上聚票网看看"
                                                   }>
                                                    <Icon type="weibo"/> weibo
                                                </a>
                                            </Menu.Item>
                                        </Menu>
                                    )}
                                    placement="bottomRight">
                                    <Icon type="share-alt"/>
                                </Dropdown>,
                            ]}
                        >
                            <List.Item.Meta
                                align='left'
                                avatar={<Image width={120} showId={item.showId}/>}
                                title={
                                    <a onClick={() => this.detail(item.showId)}
                                       dangerouslySetInnerHTML={{
                                           __html: item.title.replace(this.props.filter.search,
                                               `<span style="color: red;" >${this.props.filter.search}</span>`)
                                       }}/>
                                }
                                description={
                                    <p>
                                        {item.info}<br/><br/>
                                        <Icon type="calendar"/>
                                        {" " + item.startTime + "-" + item.endTime}<br/>
                                        <Icon type="environment"/>{" " + item.address}<br/>
                                        <Rate disabled allowHalf defaultValue={item.rate / 2}/>
                                        {item.commentNum ? "" : "暂无评分"}
                                        <br/>
                                    </p>
                                }
                            />
                            {
                                <div>
                                    <h3><b>{"￥" + item.minPrice}</b>{" 起"}</h3>
                                    {this.judgeDate(item.endTime) ?
                                        (
                                            item.stock ?
                                                <Button type="primary"
                                                        size="large"
                                                        onClick={() => this.detail(item.showId)}
                                                >购买</Button>
                                                :
                                                <Button type="dashed"
                                                        size="large"
                                                        disabled
                                                >售罄</Button>
                                        )
                                        :
                                        <Button type="dashed"
                                                size="large"
                                                disabled
                                        >过期</Button>
                                    }
                                </div>
                            }
                        </List.Item>
                    )}
                />
                <br/><br/><br/>
            </div>
        );
    }
}

ResultList.defaultProps = {
    filter: {
        city: "all",
        type: "all",
        time: "all",
        search: "",
    },
    type: "default",
};
export default ResultList;
