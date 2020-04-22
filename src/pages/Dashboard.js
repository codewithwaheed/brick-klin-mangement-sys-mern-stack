import React, { Component } from "react";
import firebase from "firebase";
import Axios from "axios";
export default class Home extends Component {
  state = {
    sale: [],
    defaultSale: [],
    Purchase: [],
    AR: [],
    AP: [],
    employee: [],
    todaySale: 0,
    todayPurchase: 0,
    monthSale: 0,
    monthPurchase: 0,
    yearPurchase: 0,
    yearSale: 0,
    payable: 0,
    recievable: 0,
    employeeCount: 0,
    dashData: null
  };
  componentDidMount() {
    Axios.get("http://localhost:5000/sale/")
      .then(Response => {
        this.setState({
          sale: Response.data,
          defaultSale: Response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    Axios.get("http://localhost:5000/purchase/")
      .then(Response => {
        this.setState({
          Purchase: Response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    Axios.get("http://localhost:5000/AR/")
      .then(Response => {
        this.setState({
          AR: Response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    Axios.get("http://localhost:5000/AP/")
      .then(Response => {
        this.setState({
          AP: Response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    Axios.get("http://localhost:5000/employee/")
      .then(Response => {
        this.setState({
          employee: Response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidUpdate() {
    if (this.state.employeeCount !== this.state.employee.length) {
      this.setState({
        employeeCount: this.state.employee.length
      });
    }
    const startofYear = new Date();
    startofYear.setMonth(0);
    const data2 = this.state.defaultSale.filter(el => {
      var saleDate = new Date(el.date);
      return saleDate > startofYear;
    });
    const ArrayAmount2 = [];
    for (var i = 0; i < data2.length; i++) {
      var Amount = Number(data2[i].total_price);
      ArrayAmount2.push(Amount);
    }
    if (ArrayAmount2[0] !== undefined) {
      const TotalAmount2 = ArrayAmount2.reduce(function(a, b) {
        return a + b;
      });
      if (this.state.yearSale !== TotalAmount2)
        this.setState({
          yearSale: TotalAmount2
        });
    }

    const data5 = this.state.Purchase.filter(el => {
      var saleDate = new Date(el.date);
      return saleDate > startofYear;
    });
    const ArrayAmount5 = [];
    for (var i = 0; i < data5.length; i++) {
      var Amount = Number(data5[i].total_price);
      ArrayAmount5.push(Amount);
    }
    if (ArrayAmount5[0] !== undefined) {
      const TotalAmount5 = ArrayAmount5.reduce(function(a, b) {
        return a + b;
      });
      if (this.state.yearPurchase !== TotalAmount5)
        this.setState({
          yearPurchase: TotalAmount5
        });
    }

    const startofMonth = new Date();
    startofMonth.setDate(0);
    const data1 = this.state.defaultSale.filter(el => {
      var saleDate = new Date(el.date);
      return saleDate > startofMonth;
    });
    const ArrayAmount1 = [];
    for (var i = 0; i < data1.length; i++) {
      var Amount = Number(data1[i].total_price);
      ArrayAmount1.push(Amount);
    }
    if (ArrayAmount1[0] !== undefined) {
      const TotalAmount1 = ArrayAmount1.reduce(function(a, b) {
        return a + b;
      });
      if (this.state.monthSale !== TotalAmount1)
        this.setState({
          monthSale: TotalAmount1
        });
    }

    const data4 = this.state.Purchase.filter(el => {
      var saleDate = new Date(el.date);
      return saleDate > startofMonth;
    });
    const ArrayAmount4 = [];
    for (var i = 0; i < data4.length; i++) {
      var Amount = Number(data4[i].total_price);
      ArrayAmount4.push(Amount);
    }
    if (ArrayAmount4[0] !== undefined) {
      const TotalAmount4 = ArrayAmount4.reduce(function(a, b) {
        return a + b;
      });
      if (this.state.monthPurchase !== TotalAmount4)
        this.setState({
          monthPurchase: TotalAmount4
        });
    }

    const ArrayAmount6 = [];
    for (var i = 0; i < this.state.AP.length; i++) {
      var Amount = Number(this.state.AP[i].total_price);
      ArrayAmount6.push(Amount);
    }

    if (ArrayAmount6[0] !== undefined) {
      const TotalAmount6 = ArrayAmount6.reduce(function(a, b) {
        return a + b;
      });
      if (this.state.payable !== TotalAmount6)
        this.setState({
          payable: TotalAmount6
        });
    }

    const ArrayAmount7 = [];
    for (var i = 0; i < this.state.AR.length; i++) {
      var Amount = Number(this.state.AR[i].total_price);
      ArrayAmount7.push(Amount);
    }
    if (ArrayAmount7[0] !== undefined) {
      const TotalAmount7 = ArrayAmount7.reduce(function(a, b) {
        return a + b;
      });
      if (this.state.recievable !== TotalAmount7)
        this.setState({
          recievable: TotalAmount7
        });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const data = this.state.defaultSale.filter(el => {
      var saleDate = new Date(el.date);
      return saleDate > startOfDay;
    });
    const ArrayAmount = [];

    for (var i = 0; i < data.length; i++) {
      var Amount = Number(data[i].total_price);
      ArrayAmount.push(Amount);
    }
    if (ArrayAmount[0] !== undefined) {
      const TotalAmount = ArrayAmount.reduce(function(a, b) {
        return a + b;
      });
      if (this.state.todaySale !== TotalAmount)
        this.setState({
          todaySale: TotalAmount
        });
    }

    const data3 = this.state.Purchase.filter(el => {
      var saleDate = new Date(el.date);
      return saleDate > startOfDay;
    });
    const ArrayAmount3 = [];
    for (var i = 0; i < data3.length; i++) {
      var Amount = Number(data3[i].total_price);
      ArrayAmount3.push(Amount);
    }
    if (ArrayAmount3[0] !== undefined) {
      const TotalAmount3 = ArrayAmount3.reduce(function(a, b) {
        return a + b;
      });
      if (this.state.todayPurchase !== TotalAmount3)
        this.setState({
          todayPurchase: TotalAmount3
        });
    }
  }
  render() {
    return (
      <div>
        <div className="text-center mt-2 py-4 display-4 bg-light topHeader">
          Dashboard
        </div>
        <div className="container mt-3">
          <div className="row text-center">
            <div className="col-md-4 dashBox box1">
              <h3 className="py-3">Today Sale Amount</h3>
              <p className="dashData ">
                {this.state.todaySale} <small>pkr</small>{" "}
              </p>
            </div>
            <div className="col-md-4 dashBox box2">
              <h3 className="py-3"> This Month Sale Amount</h3>
              <p className="dashData">
                {this.state.monthSale} <small>pkr</small>
              </p>
            </div>
            <div className="col-md-4 dashBox box3 ">
              <h3 className="py-3">This Year Sale Amount</h3>
              <p className="dashData">
                {this.state.yearSale} <small>pkr</small>
              </p>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-md-4 dashBox box4">
              <h3 className="py-3">Today Purchase Amount</h3>
              <p className="dashData">
                {this.state.todayPurchase} <small>pkr</small>
              </p>
            </div>
            <div className="col-md-4 dashBox box5">
              <h3 className="py-3"> This Month Purchase Amount</h3>
              <p className="dashData">
                {this.state.monthPurchase} <small>pkr</small>
              </p>
            </div>
            <div className="col-md-4 dashBox box6 ">
              <h3 className="py-3">This Year Purchase Amount</h3>
              <p className="dashData">
                {this.state.yearPurchase} <small>pkr</small>
              </p>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-md-4 dashBox box7">
              <h3 className="py-3">Total Register Employee</h3>
              <p className="dashData">
                {this.state.employeeCount} <small></small>
              </p>
            </div>
            <div className="col-md-4 dashBox box8">
              <h3 className="py-3">Total Payable Amount</h3>
              <p className="dashData">
                {this.state.payable} <small>pkr</small>
              </p>
            </div>
            <div className="col-md-4 dashBox box9 ">
              <h3 className="py-3">Total Recievable Amount</h3>
              <p className="dashData">
                {this.state.recievable} <small>pkr</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
