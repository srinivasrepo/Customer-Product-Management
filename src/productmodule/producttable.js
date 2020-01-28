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
import "./producttable.css";
import { Redirect } from "react-router-dom";
import Productview from "./productview";
import productnew from "./productnew";
import Axios from "axios";
import productmodule from "./productmodule";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

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

const Producttable = props => {
  const classes = useStyles();

/////////  STATES ///////////////
  var [view, setView] = useState("");
  var [boolview, setBoolview] = useState(false);
  var [edit, setEdit] = useState("");
  var [booledit, setBooledit] = useState(false);
  var [status, setStatus] = useState("");
  var [encProductID, setEncProductID]= useState('');
  var [uebool,setUebool]=useState(false);
  var [refreshbool,setRefreshbool]=useState(false);
 


/////////  STATUS CHANGE ///////////////

  const changestatus=(csdata)=>{
      setStatus(csdata.status)
      setEncProductID(csdata.encProductID)
      setUebool(!uebool)
      
  }


  useEffect(()=>{
  const o = {uebool}
  if(o.uebool === true){ 
    updatechangestatus()
  }
  })

 const  updatechangestatus=()=>{
    // console.log({encProductID})
    const obj1={encProductID};
    // console.log(obj1); 
    const obj={ encID  :obj1.encProductID , code : "PRODUCTS"}
    // console.log(obj);
    const st= {status}
    console.log(st)
    Axios
    .post("/ChangeStatus",obj)
    .then(res=>{     
      if(res.data==="SUCCESS")
      {
        NotificationManager.success('Status Updated',"",2000);
      }
      else{
        NotificationManager.error('Status not Updated',"",2000);
      }
      if(res.data==="SUCCESS" ){
        {props.searchmethod()}
      }
    })
    setRefreshbool(true)
    setUebool(false)
     }



  const viewproduct = id => {
    console.log(boolview);
    console.log(id);
    setView(id);
    setBoolview(!boolview);
  };

  const editproduct = wholedata => {
    setEdit(wholedata);
    setBooledit(!booledit)
  };

  if (boolview === false && booledit === false) {
    return (
      <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>SNO</StyledTableCell>
              <StyledTableCell>Code</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Cost</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>View</StyledTableCell>
              <StyledTableCell>Change Status</StyledTableCell>
            </TableRow>
          </TableHead>

          {props.tabledata.map(data => {
            return (
              <TableBody key={data.productID}>
                <StyledTableRow key={data.productID} >
                  <StyledTableCell>{data.productID}</StyledTableCell>
                  <StyledTableCell>{data.productCode}</StyledTableCell>
                  <StyledTableCell>{data.productName}</StyledTableCell>
                  <StyledTableCell>{data.productCost}</StyledTableCell>
                  <StyledTableCell>{data.status}</StyledTableCell>
                  <StyledTableCell>
                    {/* <Link to="/dashboard_/productmodule_/productnew"> */}
                    <Button variant="warning" onClick={() => editproduct(data)}>
                      <EditIcon />
                    </Button>
                    {/* </Link> */}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="info"
                      onClick={() => viewproduct(data.encProductID)}
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
                </StyledTableRow>
              </TableBody>
            );
          })}
        </Table>        
      </TableContainer>

      <div >
      <NotificationContainer />
      </div>

      </div>
    );
  } 
  else if (boolview === true && booledit === false && refreshbool ===false) {
    console.log(view);
    return (
      <Redirect to={{pathname: "/dashboard/productmodule/productview",view: { view } }} component={Productview}/>
    );
  }
  else if (boolview === false && booledit === true && refreshbool ===false) {
    console.log(edit);
    return (
      <Redirect to={{pathname: "/dashboard_/productmodule_/productnew",  edit: {edit}, didmountbool:true }} component={productnew}/>
    );
  }
  else if (boolview === false && booledit === false && refreshbool ===true ) {
    console.log(refreshbool);
    return (
      <Redirect to="/dashboard/productmodule" component={productmodule} />
    );
  }
};

export default Producttable;
