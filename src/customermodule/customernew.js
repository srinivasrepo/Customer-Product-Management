import React, { Component } from "react";
import {
  Paper,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Row } from "react-bootstrap";
import  Button  from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import { Table } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';


class Customernew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
      customerType: "",
      customerTypeValueName:"",
      encCustomerID: "",
      addressID:"",
      address:"",
      country:"",
      countryName:"",
      state:"",
      city:"",
      zip:"",
      list: [],
      typeres:[],
      edittablebool:false,
      edittableindex:"",
      dummylist:[],
      sRCompDMbool:false,
    };
    this.changestate = this.changestate.bind(this);
    this.registercustomer = this.registercustomer.bind(this);
    this.saveaddress = this.saveaddress.bind(this);
    this.edittable = this.edittable.bind(this);
    this.deletetable=this.deletetable.bind(this)
  }

  //For EDIT with previous input values from table-row or back-end
  componentDidMount() {
       
    Axios
    .get("/GetCategoryItems",{params:{categoryCode:"COUN"}})
    .then(res=>{
      let countryres = res.data   
      this.setState({
         country : countryres[0].catItemID,
         countryName: countryres[0].catItem
      })
    })
    Axios
    .get("/GetCategoryItems",{params:{categoryCode:"CUST"}})
    .then(res=>{
          this.setState({
            typeres :res.data
          })  
          // console.log(res.data);
          
    })


    if (this.props.location.didmountbool === true) {
      console.log(this.props.location.edit.edit);
      // this.setState({
      //   customerName : this.props.location.edit.edit.productName,
      //   customerType : this.props.location.edit.edit.productCost,
      //   list : this.props.location.edit.edit.list,
      //   encCustomerID : this.props.location.edit.edit.encCustomerID,
      //
      //Generally, table-row object has to work and there is no need for other request's response data
      //but this will not work because "SearchCustomer" post request from Customersearch.js doesnot return description in its response, so we cant get description in table-row
      // })
      Axios.get("ViewCustomer", {
         params: { encCustomerID: this.props.location.edit.edit.encCustomerID }
      }).then(res =>{
        console.log(res);
        this.setState({
          customerName: res.data.customerName,
          customerTypeValueName:res.data.customerType,
          list: res.data.addressList,
          encCustomerID: this.props.location.edit.edit.encCustomerID,
         })
        })
    }   
  }

  componentDidUpdate(){
    if (this.state.sRCompDMbool===true) {
    Axios
    .get("/GetCategoryItems",{params:{categoryCode:"COUN"}})
    .then(res=>{
      let countryres = res.data   
      this.setState({
         country : countryres[0].catItemID,
         countryName: countryres[0].catItem
      })
    })
    Axios
    .get("/GetCategoryItems",{params:{categoryCode:"CUST"}})
    .then(res=>{
          this.setState({
            typeres :res.data
          })  
          // console.log(res.data);
          
    })
    this.setState({
      sRCompDMbool:false
    })
  }
  }
  registercustomer() {
    Axios.post("/ManageCustomer", this.state).then(res => {
      console.log(res);

      console.log(this.state);
      alert("Keep Smile ! Data added succesfully ");
    });
  }
  changestate(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      
    });
    console.log(this.state.customerName);
  }

  saveaddress(event){
event.preventDefault()
if (this.state.edittablebool===true) {
  var newarraylist = [...this.state.list];
  newarraylist.splice(this.state.edittableindex,1,{
    addressID :this.state.addressID,
    address : this.state.address,
    country:this.state.country,
    countryName:this.state.countryName,
    state :this.state.state,          
    city:this.state.city,
    zip:this.state.zip
  })
  this.setState({
    list : newarraylist,
    edittablebool:false,
    addressID:"",
      address:"",
      country:"",
      countryName:"",
      state:"",
      city:"",
      zip:"",
      sRCompDMbool:true,
  })
}
else{
    this.setState({
      list : [...this.state.list , 
        {
          addressID :this.state.addressID,
          address : this.state.address,
          country:this.state.country,
          countryName:this.state.countryName,
          state :this.state.state,          
          city:this.state.city,
          zip:this.state.zip
        }
      ],
      addressID:"",
      address:"",
      country:"",
      countryName:"",
      state:"",
      city:"",
      zip:"",
      sRCompDMbool:true,


    })
  }
    
  }


  edittable(rowdata,index){  
    // let arrlist=[...this.state.list]  
    // arrlist.splice(index,1)
this.setState({
  addressID : rowdata.addressID,
  address:rowdata.address,
  country:rowdata.country,
  countryName:rowdata.countryName,
  state:rowdata.state,
  city:rowdata.city,
  zip:rowdata.zip,
  // list:arrlist,
  edittablebool:true,
  edittableindex:index,

})
  }

  deletetable(i){
    let arrlist=[...this.state.list]
    arrlist.splice(i,1)
    this.setState({
      list:  arrlist
    })
  }

 
  render() {
    console.log(this.state);
    return (
      <div>
        <Container>
          <br />
          <h4
            style={{
              
              margin: "0% 0% 0% 26%"
            }}
          >
         <span style={{borderBottom: "dotted #000066",color:" #000066"}}>ADD / EDIT CUSTOMER HERE</span>   
          </h4>
          <br />
          <br />

          <Paper
            elevation={3}
            style={{ margin: "0% 0% 2% 3%", padding: "2%", width: "80%" }}
          >
            <h5 style={{ color: "darkblue" }}>
              <span>
                CUSTOMER REGISTRATION FORM
              </span>
            </h5>
           
            <h6 style={{ marginTop: "2%", marginBottom: "1%",color:"#336600" }}>
               <em>Name and Type : </em> 
              </h6>

              <Row style={{ marginBottom: "2%" }}>
                <Col>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="customerName"
                    label="Enter Name"
                    name="customerName"
                    type="text"
                    autoComplete="customerName"
                    style={{ width: "100%" }}
                    value={this.state.customerName}
                    onChange={this.changestate}
                  />
                </Col>
                <Col>
                  <FormControl style={{ marginTop: "4%", width: "100%" }}>
                    <InputLabel
                      id="customerType-label"
                      style={{ padding: "0 0 10% 6%" }}
                    >
                     Select Type *
                    </InputLabel>                    
                    <Select
                      labelId="customerType-label"
                      id="customerType"
                      name="customerType"
                      onChange={this.changestate}
                      value={(this.props.location.didmountbool===true)? (this.state.customerTypeValueName==="Domestic")? 1:2 :this.state.customerType}
                      variant="outlined"
                    >
                      <MenuItem value="None" disabled >
                        <em>None</em>
                      </MenuItem> 
                      {this.state.typeres.map((type)=>{
                          return(
                        <MenuItem  value={type.catItemID}>{ type.catItem}</MenuItem>
                      )})}                                          
                   </Select>
                  </FormControl> 
                </Col>
              </Row>

              <Divider />
              <h6 style={{ marginTop: "2%", marginBottom: "1%",color:"#408000" }}>
               <em>Address : </em> 
              </h6>
              <form noValidate onSubmit={this.saveaddress}>
              <Row>
                <Col>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="addressID"
                    label="Enter Address ID"
                    name="addressID"
                    type="text"
                    autoComplete="addressID"
                    style={{ width: "100%" }}
                    value={this.state.addressID}
                    onChange={this.changestate}
                  />
                </Col>
                <Col>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Enter Address"
                    name="address"
                    type="text"
                    autoComplete="address"
                    style={{ width: "100%" }}
                    value={this.state.address}
                    onChange={this.changestate}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="country"
                    label=" Country code"
                    name="country"
                    type="text"
                    autoComplete="country"
                    style={{ width: "100%" }}
                    value={this.state.country}
                    onChange={this.changestate}
                  />
                </Col>
                <Col>
                  <FormControl style={{ marginTop: "4%", width: "100%" }}>
                    <InputLabel
                      id="countryName-label"
                      style={{ padding: "0 0 10% 6%" }}
                    >
                      Select Country *
                    </InputLabel>
                    <Select
                      labelId="countryName-label"
                      id="countryName"
                      name="countryName"
                      onChange={this.changestate}
                      value={this.state.countryName}                      
                      variant="outlined"
                    >
                      <MenuItem value=""  disabled selected="true">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={this.state.countryName}>{this.state.countryName}</MenuItem>
                      {/* <MenuItem value={2}>Australia</MenuItem> */}
                    </Select>
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="state"
                    label="Enter State"
                    name="state"
                    type="text"
                    autoComplete="state"
                    style={{ width: "100%" }}
                    value={this.state.state}
                    onChange={this.changestate}
                  />
                </Col>
                <Col>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="city"
                    label="Enter City"
                    name="city"
                    type="text"
                    autoComplete="city"
                    style={{ width: "100%" }}
                    value={this.state.city}
                    onChange={this.changestate}
                  />
                </Col>
                <Col>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zip"
                    label="Enter Zip"
                    name="zip"
                    type="text"
                    autoComplete="zip"
                    style={{ width: "100%" }}
                    value={this.state.zip}
                    onChange={this.changestate}
                  />
                </Col>
              </Row>

              
              <div style={{marginBottom:"2%",textAlign:"center"}}>
                <Button
                  type="submit"
                  variant="info"
                  style={{ marginTop: "2%", width: "20%" }}
                  
                >
                  SAVE ADDRESS
                </Button>
              </div>
              </form>
              {/* </form> */}
              <Divider />
              <br/>
              <div >
     <h6 style={{color:"#336600"}}><em>Saved Addresses :</em></h6>
     <Table striped bordered hover size="sm" style={{marginTop:"2%",padding:"5%"}}>
     <thead>
       <tr>
        <th>S No.</th>
       <th>Address ID</th>
       <th>Address</th>
       <th>Country Code</th>
       <th>Country Name</th>
       <th>State</th>
       <th>City</th>
       <th>Zip</th>
       <th>Edit</th>
       <th>Delete</th>
       </tr>
     </thead>

     {this.state.list.map((data,index)=> {
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
      <td><Button variant="warning" onClick={()=>this.edittable(data,index)}><EditIcon/></Button></td>
       <td><Button variant="danger" onClick={()=>this.deletetable(index)} ><DeleteIcon/></Button></td>
      </tr>
     </tbody>
     )})}
      </Table>
</div>
              <br />
              <Row>
                
                <Col>
              <Button
                variant="success"
                style={{ margin: " 0 10% 0 29%" , width: "50%" }}
                onClick={this.registercustomer} >
                SAVE 
              </Button>
              </Col>
              <Col>
              <Link
                to="/dashboard/customermodule"
                style={{ margin: " 0% 7% 0% 8%" }}>
                <Button
                  variant="dark"
                  style={{ width: "50%" }}>
                  GO BACK
                </Button>
                
              </Link>
              </Col>
              
              </Row>
            
          </Paper>
        </Container>
      </div>
    );
  }
}

export default Customernew;
