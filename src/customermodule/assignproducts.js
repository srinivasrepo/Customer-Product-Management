import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import {
  NotificationManager,
  NotificationContainer
} from "react-notifications";

class Assignproducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerdata: [],
      getassignproductsdata: [],
      isSelect: "",
      productName: "",
      productID: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveproducts=this.saveproducts.bind(this);
  }
  componentDidMount() {
    this.setState({
      customerdata: this.props.location.apdata.ap
    });
    Axios.get("/GetAssignCustomerProducts", {
      params: { encCustomerID: this.props.location.apdata.ap.encCustomerID }
    }).then(res => {
      var avraiable = res.data.filter(wholedata => wholedata.isSelect);

      console.log(avraiable);
      this.setState({
        getassignproductsdata: res.data
      });
    });
  }

  handleChange = (checkboxdata, index) => {
    console.log(this.state.getassignproductsdata);
    console.log(checkboxdata);
    if (checkboxdata.isSelect === true) {
      let flatestobj = {
        productName: checkboxdata.productName,
        productID: checkboxdata.productID,
        isSelect: false
      };

      console.log(checkboxdata.isSelect + " (true) statement executes ");
      console.log("index value is " + index);

      this.setState({
        getassignproductsdata: this.state.getassignproductsdata.splice(
          index,
          1,
          flatestobj
        )
      });
      console.log(this.state.getassignproductsdata);
      this.setState({
        getassignproductsdata : this.state.getassignproductsdata
      })
    } 
    else if (checkboxdata.isSelect === false) {
      let tlatestobj = {
        productName: checkboxdata.productName,
        productID: checkboxdata.productID,
        isSelect: true
      };
      console.log(checkboxdata.isSelect + " ( false ) statement executes ");
      console.log("index value is " + index);
      this.setState({
        getassignproductsdata: this.state.getassignproductsdata.splice(
          index,
          1,
          tlatestobj
        )
      });
      console.log(this.state.getassignproductsdata);
      this.setState({
        getassignproductsdata : this.state.getassignproductsdata
      })
    }
  };

   saveproducts(){
        console.log(this.state.getassignproductsdata)
        const obj1=this.state.customerdata.encCustomerID;
        console.log(obj1);
        const objx=this.state.getassignproductsdata.filter(o => o.isSelect===true);
        console.log(objx);
        const obj2=objx.map(a=>({productID : a.productID}))
        const obj={ encCustomerID :obj1, list:obj2}
        console.log(obj);
        Axios
        .post("/ManageAssignedCustomerProducts",obj)
        .then(res=>{
            console.log(res);

          if(res.data==="SUCCESS")
          {
            NotificationManager.success('Product Assigned',"",2000);
          }
          else{
            NotificationManager.error('Product not Assigned',"",2000);
          }
          if(res.data==="SUCCESS" ){
             Axios
        .get("/GetAssignCustomerProducts",{params:{encCustomerID:this.state.customerdata.encCustomerID}})
        .then(res=>{
            console.log(res.data);
            this.setState({
              getassignproductsdata : res.data,

            })
        })}
      })

   }

  render() {
    console.log(this.state.getassignproductsdata);
    return (
      <div>
        <h4 style={{ color: " #2929a3", textAlign: "center", marginTop: "2%" }}>
          Customer :<em> Mr./Miss. {this.state.customerdata.customerName}</em>{" "}
        </h4>
        <p style={{ textAlign: "center", color: "black" }}>
          ( To assign products to this Customer click save button on end of this
          page. )
        </p>
        <br></br>

        {this.state.getassignproductsdata.map((product, index) => {
          return (
            <ul key={product.productID}>
              <li style={{ listStyleType: "none" }}>
                <Checkbox
                  defaultChecked={product.isSelect}
                  onChange={() => this.handleChange(product, index)}
                  value={this.state.isSelect}
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                {product.productName}
              </li>
            </ul>
          );
        })}

        <div style={{ marginBottom: "5%", marginLeft: "2%" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "20%" }}
            onClick={this.saveproducts}
          >
            SAVE
          </Button>

          <Link
            to="/dashboard/customermodule"
            style={{ margin: " 0% 7% 0% 8%" }}
          >
            <Button
              variant="contained"
              color="secondary"
              style={{ width: "20%" }}
            >
              GO BACK
            </Button>
          </Link>
        </div>
        <div>
          <NotificationContainer />
        </div>
      </div>
    );
  }
}

export default Assignproducts;
