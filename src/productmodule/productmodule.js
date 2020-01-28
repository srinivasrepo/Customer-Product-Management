import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tooltip} from "@material-ui/core";
import { Zoom } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Productsearch from "./productsearch";



const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

class Productmodule extends Component {
  constructor(props) {
    super();
    
  }
  
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/dashboardpage" style={{ color: "#cce0ff" }}>
            CPM Dashboard
          </Navbar.Brand>
          <Nav className="mr-auto">
            <LightTooltip
              title="Jump to Product Module"
              TransitionComponent={Zoom}
              arrow
            >
              <Nav.Link href="/dashboard/productmodule">
                <b>PRODUCT</b>
              </Nav.Link>
            </LightTooltip>
            <LightTooltip
              title="Jump to Product Module"
              TransitionComponent={Zoom}
              arrow
            >
              <Nav.Link href="/dashboard/customermodule">
                <b>CUSTOMER</b>
              </Nav.Link>
            </LightTooltip>
          </Nav>

          <Nav>
            
              <Link to="/">
                <Button variant="outline-warning">LOG OUT</Button>
              </Link>
           
          </Nav>
        </Navbar>

        {/* product module data */}
        <h3 style={{ textAlign: "center", marginTop: "1%", color: "darkblue", }}>
         <span style={{padding: ".5% 7% .5% 7%", border: "solid 2px #4d004d"}}><b>"WELCOME TO PRODUCT MODULE"</b> </span>
        </h3>
        <Productsearch />

        <br />
        
      </div>
    );
  }
}

export default Productmodule;
