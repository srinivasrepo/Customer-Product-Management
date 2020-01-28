import React, { Component } from 'react';
import Xyz from "./xyz"


class Dashboardwelcome extends Component {
    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <h1 style={{textAlign:"center"}}>YAY!!!  WELCOME TO DASHBOARD </h1>
                <br />
                <br />
                <h6 style={{textAlign:"center"}}>( Now you can navigate to product module and customer module by above Navbar )</h6>
            <br/>
            <Xyz />
            </div>
        );
    }
}

export default Dashboardwelcome;