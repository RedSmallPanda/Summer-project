import React, { Component } from 'react'
import '../../css/VCode.css'

class VCode extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ...this.initState(),
            data:this.props.data,
            refresh: false
        };

        this.result = [];
    }

    initState(){
        return {
            rotate: this.getRandom(75,-75,4),
            fz: this.getRandom(8,20,4),
            color: [this.getRandom(100,255,3),this.getRandom(100,255,4),this.getRandom(100,255,3),this.getRandom(100,255,3)]
        }
    }

    getRandom(max, min, num) {
        const asciiNum = ~~(Math.random()*(max-min+1)+min);
        if(!Boolean(num)){
            return asciiNum
        }
        const arr = [];
        for(let i = 0; i < num; i++){
            arr.push(this.getRandom(max, min))
        }
        return arr;
    }

    canvas() {
        const { getRandom } = this;
        const canvas = document.getElementById('bgi');
        let ctx = canvas.getContext('2d');
        canvas.height = canvas.height;
        // ctx.clearRect(0, 0, canvas.width(), canvas.height());
        ctx.strokeStyle = `rgb(${this.getRandom(100,10,3).toString()})`;
        for( let i = 0; i< 7; i++ ) {
            ctx.lineTo(getRandom(200,0),getRandom(200,10));
            ctx.moveTo(getRandom(200,0),getRandom(200,0));
            ctx.stroke();
        }
    }
    componentDidMount() {
        this.canvas()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data:nextProps.data,
        });
    }

    setResult = (v,i) =>{
        let result;
        result = String.fromCharCode(v > 57 && v < 84 ? v + 7 : ( v < 57 ? v : v + 13 ));
        if(this.result.length < 4) {
            let resultArr = this.result;
            resultArr.push(result);
            this.result = resultArr
        }
        else{
            let resultArr = this.result;
            resultArr[i] = result;
            this.result = resultArr
        }
        return result;
    };

    render() {
        const { rotate, fz, color } = this.state;

        return (
            <div className='vcodewrap'
                 style={{cursor: "pointer"}}
                 onClick={() => {
                     this.props.handleChange();
                     this.setState({...this.initState(),refresh: false});
                     this.canvas()
                 }}
            >
                <canvas id="bgi" width="200" height="200"/>
                {this.state.data.map((v,i) =>
                    <div
                        key={i}
                        className='itemStr'
                        style={{
                            transform:`rotate(${rotate[i]/1.5}deg)`,
                            fontSize: `${fz[i]*1.5}px`,
                            color: `rgb(${color[i].toString()})`
                        }}
                    >
                        {this.setResult(v,i)}
                    </div>
                )}
            </div>
        )
    }
}

export default VCode;