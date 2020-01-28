import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import AddIcon from "@material-ui/icons/Add";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import Axios from "axios";
import Customertable from "./customertable";

class Customersearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          CustomerName:"",
          StatusID:"" ,
          CustomerType:"",
          tabledata:[],
          bool:false,
          tdata:[],
          searchbool:false,
          searchallbool:false,
        };
      
        this.handleChange = this.handleChange.bind(this);    
        this.searchbuttons = this.searchbuttons.bind(this);
        this.search = this.search.bind(this);
        this.searchall = this.searchall.bind(this)
      }
    
      handleChange(event){
        event.preventDefault()
        this.setState({
          [event.target.name]:event.target.value
        })
        
      }
    
      search=()=>{ 
     
        Axios
        .post("SearchCustomer",{StatusID:this.state.StatusID ,CustomerName:this.state.CustomerName,CustomerType:this.state.CustomerType})
        .then(res =>
          
          this.setState({
            tabledata : res.data.searchList,
            searchbool :true,
            searchallbool:false
          })
          
          ) 
      }
    
      searchall=()=>{
        Axios.post("SearchCustomer", {})
          .then(response => response)
          .then(res =>
            this.setState({
              tabledata: res.data.searchList,
              searchallbool:true,
              searchbool:false
            })
          );
      }
    
    // componentDidUpdate(){
    // Updates for every update eventhough we didn't call ,So, we can't updates values. We have mutiple methods to execute for specific button
    // } 
    
      searchbuttons() {
       
        if (this.state.searchallbool===true) {
          console.log("search all")
          Axios.post("SearchCustomer", {})
          .then(response => response)
          .then(res =>
            this.setState({
              tabledata: res.data.searchList,          
            })) 
        }
        else if (this.state.searchbool===true) {
          console.log("search only")
          Axios
          .post("SearchCustomer",{StatusID:this.state.StatusID ,CustomerName:this.state.CustomerName,CustomerType:this.state.CustomerType})
          .then(res =>
            this.setState({
              tabledata : res.data.searchList,         
            })) 
        }
      }
    
      // componentDidMount() {
    
      // fetch("https://jsonplaceholder.typicode.com/users/1")
      // .then(res => res.json())
      // .then( data=>
        // this.setState({
        //   tdata : data,
        // }),
      //   console.log(data)
      // )
      // }
    
      render() {
        var {  tabledata } = this.state;
        // var alert = useAlert();
    
        return (
          <div>
            {/* <button onClick={this.search} >Check </button> */}
            <Container style={{ marginTop: "4%" }}>
              <Paper elevation={2} style={{ width: "100%" }}>
                <h5 style={{ textAlign: "center", paddingTop: "2%" }}>
                  <span
                    style={{
                      paddingBottom: ".1%",
                      borderBottom: "dotted 2px #000"
                    }}
                  >
                    SEARCH CUSTOMER
                  </span>
                </h5>
                <br></br>
                <br></br>
    
                <Container style={{ marginBottom: "5%", paddingBottom: "5%" }}>
                  <Form >
                    <Row>
                      <Col style={{ color: "#4d0026" }}>
                        {/* Product Name */}
                        <TextField
                          id="CustomerName"
                          name="CustomerName"
                          type="text"
                          label="Enter Customer Name"
                          variant="outlined"
                          onChange={this.handleChange}
                          value={this.state.CustomerName}
                          
                        />
                      </Col>
                      <Col>
                      {/* Select Status */}
                        <FormControl>
                          <InputLabel
                            id="SelectID-label"
                            style={{ padding: "0 0 10% 6%" }}
                            
                          >
                            Select Status
                          </InputLabel>
                          <Select
                            labelId="SelectID-label"
                            id="SelectID"
                            name="StatusID"
                            onChange={this.handleChange}
                            value={this.state.StatusID}
                            style={{ minWidth: 200 }}
                            
                            variant="outlined"
                          >
                            <MenuItem value="" selected="true">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={2}>Inactive</MenuItem>
                          </Select>
                        </FormControl>
                      </Col>
                      {/* Select Type */}
                      <Col>
                      <FormControl>
                          <InputLabel
                            id="CustomerType-label"
                            style={{ padding: "0 0 10% 6%" }}
                            
                          >
                            Select Type
                          </InputLabel>
                          <Select
                            labelId="CustomerType-label"
                            id="CustomerType"
                            name="CustomerType"
                            onChange={this.handleChange}
                            value={this.state.CustomerType}
                            style={{ minWidth: 200 }}
                            
                            variant="outlined"
                          >
                            <MenuItem value="" selected="true">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Domestic</MenuItem>
                            <MenuItem value={2}>International</MenuItem>
                          </Select>
                        </FormControl>
                      </Col>
    
                      
                    </Row>
                  </Form>
    
                  <Row style={{ marginTop: "5%", marginBottom: "5%" }}>
                  <Col>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          startIcon={<SearchIcon />}
                          onClick={this.search}
                        >
                          Search
                        </Button>
                      </Col>
                    <Col>
                      
    
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.searchall}
                          startIcon={<FindInPageIcon />}
                        >
                          Search All
                        </Button>
                      
                    </Col>
                    <Col>
                      <Link to="/dashboard/customermodule/customernew">
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<AddIcon />}
                        >
                          Add
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                  <Customertable key={Math.random()} tabledata={tabledata} searchmethod={this.searchbuttons} />
                </Container>
              </Paper>
            </Container>
            <ul></ul>
          </div>
        );
      }
}

export default Customersearch;