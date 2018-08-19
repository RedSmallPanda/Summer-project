import React, {Component} from "react";

class ShowLocation extends Component{
    componentDidMount () {
        let BMap = window.BMap;
        let map = new BMap.Map("map"); // 创建Map实例

        let point = new BMap.Point(121.439224, 31.026026);//中心点坐标
        let marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.centerAndZoom(point, 18);// 初始化地图,设置中心点坐标和地图级别

        // let mapType = {mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]};
        map.addControl(new BMap.MapTypeControl()); //添加地图类型控件

        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

        let opts = {
            width: 200,     // 信息窗口宽度
            height: 100,     // 信息窗口高度
            title: "西11", // 信息窗口标题
            enableMessage: true,//设置允许信息窗发送短息
            message: "看什么看"
        };
        var infoWindow = new BMap.InfoWindow("X11", opts);  // 创建信息窗口对象
        marker.addEventListener("click", function(){
            map.openInfoWindow(infoWindow,point); //开启信息窗口
        });
    }

    render () {
        return (
            <div>
                <div
                    id='map'
                    style={{
                        width: "50%",
                        height: 500,
                        marginLeft: "25%",
                        marginTop: 20
                    }}/>
            </div>
        );
    }
}

export default ShowLocation;