import {DatePicker} from 'antd';
import React, { Component } from 'react';
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class DatePick extends Component {
    //  props: func:  setdate(),   date : enableddate
    // componentWillMount(){
    //     this.setState({enableddate:this.props.Dates})
    // }
    state = {
        enableddate:this.props.Dates,
        pickeddate:this.props.Dates[0],
    }


  /*  defaultdate=moment(this.state.enableddate[0],"YYYY-MM-DD-dddd")  //set default time picker*/
    timepickerformat="YYYY-MM-DD-dddd";

    componentWillReceiveProps(nextProps) {
    this.setState({enableddate:nextProps.Dates,pickeddate:nextProps.Dates[0]});
}

    disabledDate=(time)=>{
        let enabledate=this.state.enableddate;
        let picked_time=String(moment(time).format("YYYY-MM-DD"));
        for(var j = 0; j < enabledate.length; j++) {

            if(enabledate[j]===picked_time){return false;}
        }
        //    if(picked_time==="2018-07-05"){console.log("ojbk")}
        return (true);                       //return true to disable
    }

    ontimechange=(value,dateString)=>{
        console.log("you picked : "+dateString);
        let picked=String(moment(value).format("YYYY-MM-DD"));
        this.props.setdate(picked);
        this.setState({pickeddate:picked});

    }
    renderpicker=()=>{
        return ( <DatePicker
            allowClear={false}
            placeholder={String(moment(this.state.pickeddate).format(this.timepickerformat))}
            format={this.timepickerformat}
            size="normal"
            onChange={this.ontimechange}
            disabledDate={this.disabledDate}
        />);
}


    render() {
       // console.log(this.state)
        return (
            this.renderpicker()
        );
    }
}
export default DatePick;