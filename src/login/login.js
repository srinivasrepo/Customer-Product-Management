import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Dashboard from "../dashboard/dashboard";
import dashboardwelcome from "../dashboard/dashboardwelcome";
import { Container } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Axios from "axios";

const useStyles = {
  y: {
    width: "50%", 
    marginTop: "10px"
  },

  x: {
    color: "red"
  },

  Card: {
    width: "50%"
  }
};
class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      toDashboard: false,
      loginaccess:false
    };
    this.loginmethod = this.loginmethod.bind(this);
    this.changestate = this.changestate.bind(this);
  }


  loginmethod(event) {
    event.preventDefault();
    console.log(this.state.username +" , "+ this.state.password)
    Axios
    .post("/ValidLogin",{UserName:this.state.username,Password:this.state.password})
    .then(res=>{
      //admin , A1234
      console.log(res)
      if (res.data.retCode==="OK") {
        console.log("correct credentials");
        
        this.setState({
          loginaccess : true ,
          toDashboard : true,
        })
      } 
      else {
        alert("Please provide valid details");
      }
      
    })
    
  }
  changestate(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
 

  render() {
    if (this.state.toDashboard===true) {
         return (<Redirect to="/dashboardpage" component={Dashboard} /> && <Redirect to="/dashboardpage" component={dashboardwelcome} />)
    } 
    
    return (
      <div>
        <h1
          style={{
            color: "rgb(0, 82, 71)",
            fontStyle: "",
            textAlign: "center",
            marginTop: "1%",
            backgroundColor: "rgb(240, 240, 240)",
            padding: "2%"
          }}
        >
          <b style={{ textShadow: " 2px 2px white" }}>
            CUSTOMER PRODUCT MANGEMENT
          </b>
        </h1>
        <Container>
          <Row>
            <Col>
              <img
                src="https://www.careeranna.com/articles/wp-content/uploads/2018/10/pm.jpeg"
                alt="Logo"
                style={{ width: "90%",  marginTop: "6%" }}
              />
            </Col>
            <Col>
              <Card
                style={{ width: "60%", float: "left", margin: "10% 3% 0% 30%" }}
              >
                <CardContent>
                  <CssBaseline />
                  <div>
                    <Avatar
                      style={{ marginLeft: "40%", backgroundColor: "red" }}
                    >
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography
                      component="h1"
                      variant="h5"
                      style={{ marginLeft: "28%", marginTop: "3%" }}
                    >
                      Login Form
                    </Typography>
                    <form
                      style={useStyles}
                      onSubmit={this.loginmethod}
                    >
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={this.state.username}
                        onChange={this.changestate}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.changestate}
                      />

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "2%" }}
                      >
                        Log In
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default login;
