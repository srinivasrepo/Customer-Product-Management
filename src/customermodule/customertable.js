import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AssignmentIcon from '@material-ui/icons/Assignment';
import "./customertable.css";
import { Redirect, Route, Router, Link } from "react-router-dom";
import Customerview from "./customerview";
import Customernew from "./customernew";
import Axios from "axios";
import Customermodule from "./customermodule";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Assignproducts from "./assignproducts";


const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    }
  }))(TableRow);
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });
  
  const Customertable = props => {
    const classes = useStyles();
  
  /////////  STATES ///////////////
    var [view, setView] = useState("");
    var [boolview, setBoolview] = useState(false);
    var [edit, setEdit] = useState("");
    var [booledit, setBooledit] = useState(false);
    var [status, setStatus] = useState("");
    var [encCustomerID, setEncCustomerID]= useState('');
    var [uebool,setUebool]=useState(false);
    var [refreshbool,setRefreshbool]=useState(false);
    var [apbool, setApbol]=useState(false);
    var [ap,setAp]=useState("");
   
  
  
  /////////  STATUS CHANGE ///////////////
  
    const changestatus=(csdata)=>{
        setStatus(csdata.status)
        setEncCustomerID(csdata.encCustomerID)
        setUebool(!uebool)
        
    }
  
  
    useEffect(()=>{
    const o = {uebool}
    if(o.uebool === true){ 
      updatechangestatus()
    }
    })
  
   const  updatechangestatus=()=>{
      // console.log({encCustomerID})
      const obj1={encCustomerID};
      // console.log(obj1); 
      const obj={ encID  :obj1.encCustomerID , code : "CUSTOMERS"}
      // console.log(obj);
      const st= {status}
      console.log(st)
      Axios
      .post("/ChangeStatus",obj)
      .then(res=>{     
        if(res.data==="SUCCESS")
        {
          NotificationManager.success('Status Updated',"",6000);
        }
        else{
          NotificationManager.error('Status not Updated',"",6000);
        }
        if(res.data==="SUCCESS" ){
          {props.searchmethod()}
        }
      })
      setRefreshbool(true)
      setUebool(false)
       }
  
  
  
    const viewcustomer = id => {
      console.log(boolview);
      console.log(id);
      setView(id);
      setBoolview(!boolview);
    };
  
    const editcustomer = wholedata => {
      setEdit(wholedata);
      setBooledit(!booledit)
    };
   const assignproductsmeth=(dataforap)=>{
      console.log(dataforap)
      {/* <Redirect to="/dashboard/customermodule/assignproducts"/> */}
      setApbol(true);
      setAp(dataforap);

    }
  
    if (boolview === false && booledit === false && apbool===false) {
      return (
        <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>SNO</StyledTableCell>
                <StyledTableCell>Code</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
                <StyledTableCell>View</StyledTableCell>
                <StyledTableCell>Change Status</StyledTableCell>
                <StyledTableCell>Assign Products</StyledTableCell>
              </TableRow>
            </TableHead>
  
            {props.tabledata.map(data => {
              return (
                <TableBody key={data.CustomerID}>
                  <StyledTableRow key={data.customerID} >
                    <StyledTableCell>{data.customerID}</StyledTableCell>
                    <StyledTableCell>{data.customerCode}</StyledTableCell>
                    <StyledTableCell>{data.customerName}</StyledTableCell>
                    <StyledTableCell>{data.customerType}</StyledTableCell>
                    <StyledTableCell>{data.status}</StyledTableCell>
                    <StyledTableCell>
                      {/* <Link to="/dashboard_/productmodule_/productnew"> */}
                      <Button variant="warning" onClick={() => editcustomer(data)}>
                        <EditIcon />
                      </Button>
                      {/* </Link> */}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="info"
                        onClick={() => viewcustomer(data.encCustomerID)}
                      >
                        <VisibilityIcon />
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>                   
                      <label className="switch">
                        <input type="checkbox"  defaultChecked = {data.status==="Active" ?true:false} onClick={()=>changestatus(data)} />
                        <span className="slider round"></span>
                      </label>
                     </StyledTableCell>
                     <StyledTableCell>
                       {/* <Link to="/dashboard/customermodule/assignproducts"> */}
                      <Button
                        variant="secondary"
                        onClick={() => assignproductsmeth(data)}
                      >
                        
                       <AssignmentIcon/>
                      </Button>
                      
                    </StyledTableCell>

                  </StyledTableRow>
                </TableBody>
              );
            })}
          </Table>        
        </TableContainer>
  
        <div >
        < NotificationContainer />
        </div>
  
        </div>
      );
    } 
    else if (boolview === true && booledit === false && refreshbool ===false && apbool===false) {
      console.log(view);
      return (
        <Redirect to={{pathname: "/dashboard/customermodule/customerview" ,view: { view } }} component={Customerview}/>
      );
    }
    else if (boolview === false && booledit === true && refreshbool ===false && apbool===false) {
      console.log(edit);
      return (
        <Redirect to={{pathname: "/dashboard/customermodule/customernew",  edit: {edit}, didmountbool:true }} component={Customernew}/>
      );
    }
    else if (boolview === false && booledit === false && refreshbool ===true && apbool===false ) {
      console.log(refreshbool);
      return (
        <Redirect to="/dashboard/customermodule" component={Customermodule} />
      );
    }
    else if (apbool===true && boolview === false && booledit === false && refreshbool ===false) {
      return(
       <Redirect to={{ pathname: "/dashboard/customermodule/assignproducts", apdata: {ap}}} component={Assignproducts}/>

      )
    }
  };
  
  export default Customertable;
  