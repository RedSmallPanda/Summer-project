import React, { Component } from 'react';
import ShowLocation from "./ShowLocation";

class Us extends Component{
    render(){
        return (
            <div className="us" style={{textAlign: 'center', marginTop: '20px'}}>
                还你<br/>
                那我就用来做地图了
                <ShowLocation/>
            </div>
        );
    }
}

export default Us;