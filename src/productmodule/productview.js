import React, { Component } from "react";
import Axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

class Productview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataa: []
    };
  }

  componentDidMount() {
    console.log(this.props.location.view);  
    Axios.get("ViewProduct",{ params: { encProductID: this.props.location.view.view }})
    .then(res => this.setState({ dataa: res.data}));    
  }
  
  render() {
    console.log(this.state.dataa)
      
    return (
      <div>
<br></br>
        <h4 style={{color:"#b30059",textAlign:"center"}}>INFORMATION OF THE SELECTED PRODUCT</h4>
        

        <Table striped bordered hover size="sm" style={{margin:"4%"}}>
  <thead>
    <tr>
      <th>S NO.</th>
      <th>Product Code</th>
      <th>Product Name</th>
      <th>Product Cost</th>
      <th>Status</th>
      <th>Description</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>{this.state.dataa.productCode}</td>
      <td>{this.state.dataa.productName}</td>
      <td>{this.state.dataa.productCost}</td>
      <td>{this.state.dataa.status}</td>
      <td>{this.state.dataa.description}</td>
      

    </tr>
   
  </tbody>
</Table>

<Link to="/dashboard/productmodule" style={{marginLeft:"80%"}} >
<Button variant="contained" color="secondary" style={{ width:"15%" }} >Go Back</Button>
</Link>
      </div>
    );
  }
}

export default Productview;
