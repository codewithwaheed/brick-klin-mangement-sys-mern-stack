import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Dashboard";
import NavBar from "./Components/NavBar";
import Sale from "./pages/Sale";
import Purchase from "./pages/Purchase";
import Employee from "./pages/Employee";
import NewEmployee from "./pages/NewEmployee";
import AddRecorde from "./pages/AddSale";
import EmployeeAccount from "./pages/EmployeeAccount";
import AccountReciveable from "./pages/AccountReciveable";
import AddPurchase from "./pages/AddPurchase";
import AccountPayable from "./pages/AccountPayable";
import EditSale from "./pages/EditSale";
import EditPurchase from "./pages/EditPurchase";
import EditEmployee from "./pages/EditEmployee";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/sale" component={Sale}></Route>
          <Route path="/purchase" component={Purchase}></Route>
          <Route path="/employee" component={Employee}></Route>
          <Route path="/newEmployee" component={NewEmployee}></Route>
          <Route path="/employee" component={Employee}></Route>
          <Route path="/addRecorde" component={AddRecorde}></Route>
          <Route
            path="/employeeAccount/:id"
            component={EmployeeAccount}
          ></Route>
          <Route path="/editSale/:id" component={EditSale}></Route>
          <Route path="/editPurchase/:id" component={EditPurchase}></Route>
          <Route path="/editEmployee/:id" component={EditEmployee}></Route>
          <Route
            path="/accountReciveable"
            component={AccountReciveable}
          ></Route>
          <Route path="/addPurchase" component={AddPurchase}></Route>
          <Route path="/accountPayable" component={AccountPayable}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}
