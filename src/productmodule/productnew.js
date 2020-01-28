import React, { Component } from 'react';
import { Paper, Container } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import Axios from 'axios';



class Productnew extends Component {
    constructor(props){
        super(props);
        this.state={
          
            productName:"",
            productCost:"",
            description:"",
            encProductID:"",
          
          
        }
        this.changestate=this.changestate.bind(this);
        this.registerproduct=this.registerproduct.bind(this);
        
    }

    //For EDIT with previous input values from table-row or back-end
    componentDidMount(){

      if (this.props.location.didmountbool===true) {
        console.log(this.props.location.edit.edit);
        // this.setState({
        //   productName : this.props.location.edit.edit.productName,
        //   productCost : this.props.location.edit.edit.productCost,
        //   description : this.props.location.edit.edit.description,
        //   encProductID : this.props.location.edit.edit.encProductID,
        //
        //Generally, table-row object has to work and there is no need for other request's response data 
        //but this will not work because "SearchProduct" post request from productsearch.js doesnot return description in its response, so we cant get description in table-row
        //
        // })

        Axios
        .get("ViewProduct",{ params: { encProductID: this.props.location.edit.edit.encProductID }})
        .then(res=>
          this.setState({
          productName :res.data.productName,
          productCost :res.data.productCost,
          description :res.data.description,
          encProductID : this.props.location.edit.edit.encProductID 
        }))
                  
      }        
    }

    changestate(event){
        this.setState({
          [event.target.name]:event.target.value,            
      })
        console.log(this.state.productname)
        
    }


    registerproduct(eve){
      eve.preventDefault();
      Axios
      .post("/ManageProduct",this.state)
      .then(res=>{
      if (res.data==="SUCCESS") {
        console.log(res);
        alert("Keep Smile ! Data added succesfully ")
        this.setState({
          productName:"",
            productCost:"",
            description:"",
        })
      }
      })        
    }
    render() {
console.log(this.state);


        return (
            <div>
                <Container>
                    <br/>
                <h4 style={{borderBottom:"solid", display:"inline",margin:"4%",marginLeft:"10%"}}>ADD / EDIT PRODUCT HERE</h4>
                    <br/>
                    <br/>

                    <Paper elevation={3} style={{margin:"1%", padding:"2%", width:"50%"}}> 
                     <h5 style={{color:"darkblue"}}>PRODUCT REGISTRATION FORM</h5>
                      <form
                      onSubmit={this.registerproduct}
                      noValidate
                    >
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="ProductName"
                        label="Enter Name"
                        name="productName"
                        type="text"
                        autoComplete="ProductName"
                        value={this.state.productName}
                        onChange={this.changestate}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="productCost"
                        label="Enter Cost"
                        type="number"
                        id="ProductCost"
                        autoComplete="ProductCost"
                        value={this.state.productCost}
                        onChange={this.changestate}
                      />
                       <textarea
                        placeholder="Add Description"
                        variant="outlined"
                        margin="normal"
                        width="200%"
                        id="Description"
                        name="description"
                        label="Add Description here"
                        type="textArea"                     
                        value={this.state.description}
                        onChange={this.changestate}
                        style={{flexDirection: 'row',width:"100%",marginTop:"4%",padding:"3%"}}
                      />
                      <br/>
                      
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        
                        color="primary"
                        style={{ marginTop: "2%",width:"20%" }}
                      >
                        SAVE
                      </Button>
                    
                      <Link to="/dashboard/productmodule" style={{marginLeft:"15%"}}>
                    <Button
                        fullWidth
                        onClick={this.editbutton}
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: "2%",width:"40%" }}
                      >
                        GO BACK 
                      </Button>
                      </Link>
                    </form>

                    </Paper>
                </Container>
            </div>
        );
    }
}

export default Productnew;
