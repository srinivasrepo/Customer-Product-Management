import React, { Component } from "react";
import Axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

class Customerview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataa: [],
      addressarray:[],
      counter:1
    };
  }

  componentDidMount() {
    console.log(this.props.location.view);  
    Axios.get("ViewCustomer",{ params: { encCustomerID: this.props.location.view.view }})
    .then(res => this.setState({ 
      dataa: res.data,
      addressarray:res.data.addressList
    }))   
    .then(response=>console.log(response))
  }
  
  render() {
    // var addressarray={this.state.dataa.assignedProducts}
    
      console.log(this.state.dataa.addressList)
      console.log(this.state.addressarray)
      // aarray :{this.state.addressarray}
    return (
      <div>
<br></br>
        <h4 style={{color:"#b30059",marginLeft:"4%"}}>INFORMATION OF THE SELECTED CUSTOMER</h4>
        
        <h6 style={{color:"#408000",marginTop:"2%"}}> <em style={{marginLeft:"4%",marginBottom:"1%"}}>Customer Info :</em> </h6>
        
        <Table striped bordered hover size="sm" style={{marginLeft:"4%"}}>
      
      <tr> 
           <th>Customer Code</th>
           <td>{this.state.dataa.customerCode}</td>
      </tr> 
      <tr>
          <th>Customer Name</th>
          <td>{this.state.dataa.customerName}</td>
      </tr>
      <tr>
          <th>Customer Type</th>
          <td>{this.state.dataa.customerType}</td>
      </tr>
      <tr>
          <th>Status</th>
          <td>{this.state.dataa.status}</td>
      </tr>
      <tr>
          <th>Assigned Products</th>
          <td>{this.state.dataa.assignedProducts}</td>
     </tr>
</Table>
<br/>
<div style={{marginLeft:"4%",marginTop:"0%"}}>
     <h6 style={{color:"#408000"}}> <em style={{marginBottom:"1%",marginTop:"1%"}}>All Addresses :</em> </h6>
     
     <Table striped bordered hover size="sm" style={{marginTop:"0%",padding:"5%"}}>
     <thead>
       <tr>
        <th>S No.</th>
       <th>Address ID</th>
       <th>Address</th>
       <th>Country</th>
       <th>Country Name</th>
       <th>State</th>
       <th>City</th>
       <th>Zip</th>
       </tr>
     </thead>
     {this.state.addressarray.map((data,index)=> {
     return(
     <tbody key={data.addressID} >
       <tr>
       <td>{index + 1} </td>
       <td>{data.addressID}</td>
       <td>{data.address}</td>
       <td>{data.country}</td>
       <td>{data.countryName}</td>
       <td>{data.state}</td>
       <td>{data.city}</td>
       <td>{data.zip}</td>
      </tr>
     </tbody>
     )
     
      })
      }
      </Table>
</div>

<Link to="/dashboard/customermodule" style={{marginLeft:"80%"}} >
<Button variant="contained" color="secondary" style={{ width:"15%" }} >Go Back</Button>
</Link>
      </div>
    );
  }
}

export default Customerview;