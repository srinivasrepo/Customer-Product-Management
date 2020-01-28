import React from 'react';
import './App.css';
import Login from "./login/login";
import dashboard from "./dashboard/dashboard";
import dashboardwelcome from "./dashboard/dashboardwelcome";
import productmodule from "./productmodule/productmodule";
import Customermodule from "./customermodule/customermodule";
import { BrowserRouter as Router, Route } from "react-router-dom";
import productnew from './productmodule/productnew';
import Axios from 'axios';
import Productview from './productmodule/productview';
import Customernew from './customermodule/customernew';
import Customerview from './customermodule/customerview';
import Assignproducts from './customermodule/assignproducts';





function App() {
  
  Axios.defaults.baseURL="http://localhost:57679/"

  
  return (
    <div >
      <Router>

        
            <Route path="/"  exact component={Login} />
            <Route path="/dashboardpage" component={dashboard} />
            <Route path="/dashboardpage" component={dashboardwelcome} />
            <Route path="/dashboard/productmodule" exact component={productmodule} />         
            <Route path="/dashboard_/productmodule_/productnew" exact component={productnew}/>
            <Route path="/dashboard/productmodule/productview" exact component={Productview} />
            <Route path="/dashboard/customermodule" exact component={Customermodule} />
            <Route path="/dashboard/customermodule/customernew" exact component={Customernew}/>
            <Route path="/dashboard/customermodule/customerview" exact component={Customerview} />
            <Route path="/dashboard/customermodule/assignproducts" exact component={Assignproducts}/>
        
      </Router>
      
      
      
    </div>
  );
}

export default App;
