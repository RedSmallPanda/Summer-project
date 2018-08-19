import React, { Component } from 'react';
import ShowLocation from "./ShowLocation";

class Us extends Component{
    render(){
        return (
            <div className="us" style={{textAlign: 'center', marginTop: '20px'}}>
                还你<br/>
                那我就用来做地图了
                <ShowLocation style={{
                    width: 600,
                    height: 400,
                    marginTop: 30,
                    marginLeft: '25%'
                }}/>
            </div>
        );
    }
}

export default Us;