import { Slider, InputNumber, Row, Col } from 'antd';
import React, { Component } from 'react';
class Ticknumpick extends Component {
    //props: func:  setnum,   number: maxnum
    state = {
        inputValue: 1,
    }

    onChange = (value) => {
        if(value){console.log("have value")}
        var is_valid = true;
        if(value==null){return}
        let temp=String(value)
        for(let i=0;i<temp.length;i++){
            if(!(temp[i]>='0'&&temp[i]<='9')){is_valid=false;}
        }
        if(value===null){is_valid=false;}
        if(value>this.props.maxnum){is_valid=false}   //fuck antd input num, need to check by yourself
        if (is_valid) {
            this.setState({
                inputValue: value,
            });
  //          this.props.setnum(value);
        }
    }
    onChange_slide = (value) => {
        if(value){console.log("have value")}
        var is_valid = true;
        if(value==null){return}
        let temp=String(value)
        for(let i=0;i<temp.length;i++){
            if(!(temp[i]>='0'&&temp[i]<='9')){is_valid=false;}
        }
        if(value===null){is_valid=false;}
        if(value>this.props.maxnum){is_valid=false}   //fuck antd input num, need to check by yourself
        if (is_valid) {
            this.setState({
                inputValue: value,
            });
            this.props.setnum(value);
        }
    }
    onblur=(e)=>{
        if(e.target.value) {
            console.log("blur: " + e.target.value)

            this.props.setnum(this.state.inputValue);
        }
        else{
            console.log("must have value")
            this.setState({inputValue:1})
            this.props.setnum(this.state.inputValue);
        }
    }

    render() {
        return (
            <Row>
                <Col span={12}>
                    <Slider min={1} max={this.props.maxnum}  onChange={this.onChange_slide} value={this.state.inputValue} />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={1}
                        max={this.props.maxnum}
                        style={{ marginLeft: 16 }}
                        value={this.state.inputValue}
                        onChange={this.onChange}
                        onBlur={this.onblur}
                    />
                </Col>
            </Row>
        );
    }
}
export default Ticknumpick;