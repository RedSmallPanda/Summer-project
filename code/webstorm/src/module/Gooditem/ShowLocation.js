import React, {Component} from "react";
import {Button, Icon} from "antd";
import axios from "axios";

// let count = 0;
class ShowLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: this.props.style,
            city: this.props.city,
            location: this.props.location,
            longitude: null,
            latitude: null,
            working: true,
            error: false,
            got: false,
            shouldUpdate: false,
            shouldRequest: false,
        };
        // console.log("ShowLocation: constructor " + (++count));
        // console.log(this.state);
        this.getLocation = this.getLocation.bind(this);
        this.renderMap = this.renderMap.bind(this);
    }

    render() {
        // console.log("ShowLocation: render" + (++count));
        // console.log(this.state);
        return (
            <div>
                <div id='map' style={{
                    ...this.state.style,
                    textAlign: "center",
                }}>{
                    this.state.working ?
                        <Icon type="loading" style={{
                            lineHeight: "250px",
                            fontSize: 80
                        }}/>
                        :
                        <div>
                            <p>{this.state.error?"error":"暂无地图数据"}</p>
                            <Button htmlType="button"
                                    onClick={this.getLocation}>
                                重新获取
                            </Button>
                        </div>
                }</div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        // console.log("ShowLocation: nextProps " + (++count));
        // console.log(nextProps);
        if (nextProps.city !== this.state.city && nextProps.location !== this.state.location) {
            this.setState({
                ...nextProps,
                shouldUpdate: true,
                shouldRequest: true,
            });
        }
    }

    shouldComponentUpdate() {
        // console.log("ShowLocation: shouldComponentUpdate " + this.state.shouldUpdate + (++count));
        if (this.state.shouldUpdate) {
            this.setState({
                shouldUpdate: false,
            });
            return true;
        }
        return false;
    }

    componentWillUpdate() {
        // console.log("ShowLocation: willUpdate " + this.state.shouldRequest + (++count));
        if (this.state.shouldRequest) {
            this.setState({
                shouldRequest: false,
            });
            this.getLocation();
        }
    }

    getLocation() {
        // console.log("ShowLocation: getLocation" + (++count));
        let self = this;
        axios.get("/getLocation", {
            params: {
                location: self.state.location
            }
        })
            .then(function (response) {
                // console.log(response.data);
                if (response.data.length === 0) {
                    self.setState({
                        error: false,
                        working: false,
                        got: false,
                        shouldUpdate: true,
                    });
                } else {
                    self.setState({
                        error: false,
                        working: true,
                        got: true,
                        shouldUpdate: true,
                        longitude: response.data[0].longitude,
                        latitude: response.data[0].latitude,
                        // longitude: 121.439224,
                        // latitude: 31.026026,
                    });
                    self.renderMap();
                }
            })
            .catch(function (error) {
                console.log(error);
                self.setState({
                    error: true,
                    working: false,
                    got: false,
                    shouldUpdate: true,
                });
            });
    }

    renderMap() {
        // console.log("ShowLocation: update" + (++count));
        // console.log(this.state);
        if (this.state.longitude === null || this.state.latitude === null ||
            this.state.error || !this.state.working) {
            return;
        }
        console.log("map rendering");

        let BMap = window.BMap;
        let map = new BMap.Map("map"); // 创建Map实例 "map":<div id='map'>...</div>

        let point = new BMap.Point(this.state.longitude, this.state.latitude);//中心点坐标
        map.centerAndZoom(point, 17);// 初始化地图,设置中心点坐标和地图级别
        this.addMarkerAndInfo(BMap, point, map);//添加标注和点击后的信息

        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        let mapType = {mapTypes: [window.BMAP_NORMAL_MAP, window.BMAP_HYBRID_MAP]};
        map.addControl(new BMap.MapTypeControl(mapType)); //添加地图类型控件

        // 定义一个控件类,即function
        function BackControl(){
            // 默认停靠位置和偏移量
            this.defaultAnchor = window.BMAP_ANCHOR_TOP_LEFT;
            this.defaultOffset = new BMap.Size(10, 10);
        }

        // 通过JavaScript的prototype属性继承于BMap.Control
        BackControl.prototype = new BMap.Control();

        // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
        // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
        BackControl.prototype.initialize = function (map) {
            // 创建一个DOM元素
            let div = document.createElement("div");
            // 添加文字说明
            div.appendChild(document.createTextNode("回到标注点"));
            // 设置样式
            div.style.cursor = "pointer";
            div.style.border = "1px solid gray";
            div.style.backgroundColor = "white";
            // 绑定事件,点击一次回到标注点
            div.onclick = function (e) {
                map.centerAndZoom(point, 17);
            };
            // 添加DOM元素到地图中
            map.getContainer().appendChild(div);
            // 将DOM元素返回
            return div;
        };
        // 创建控件
        let myBackCtrl = new BackControl();
        // 添加到地图当中
        map.addControl(myBackCtrl);
    }

    addMarkerAndInfo(BMap, point, map) {
        let marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        let opts = {
            width: 50,     // 信息窗口宽度
            height: 30,     // 信息窗口高度
            title: "西11", // 信息窗口标题
            enableMessage: true,//设置允许信息窗发送短息
            message: "看什么看"
        };
        let infoWindow = new BMap.InfoWindow(this.state.location, opts);  // 创建信息窗口对象
        marker.addEventListener("click", function () {
            map.openInfoWindow(infoWindow, point); //开启信息窗口
        });
    }

}

export default ShowLocation;