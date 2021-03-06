import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import Axios from "axios";

const AP = props => (
  <tr>
    <td>{props.sales.creditor_name}</td>
    <td>{props.sales.item_name}</td>
    <td>{props.sales.distributor_name}</td>
    <td>{props.sales.date.substring(0, 10)}</td>
    <td>{props.sales.quantity}</td>
    <td>{props.sales.discount}</td>
    <td>{props.sales.total_price}</td>
    <td>
      <a
        className="btn btn-outline-danger"
        onClick={() => {
          props.deleteAR(props.sales._id);
        }}
      >
        Paid
      </a>
    </td>
  </tr>
);
export default class Aps extends Component {
  constructor(props) {
    super(props);
    this.Delete = this.Delete.bind(this);
  }
  state = {
    AP: [],
    defaultAR: [],
    All: true,
    saleEmpty: false,
    TotalAmount: "00",
    Search: "",
    statusSearch: true
  };
  componentWillMount() {
    Axios.get("http://localhost:5000/AP/")
      .then(Response => {
        this.setState({
          AP: Response.data,
          defaultAR: Response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    const ArrayAmount = [];
    for (var i = 0; i < this.state.AP.length; i++) {
      var Amount = Number(this.state.AP[i].total_price);
      ArrayAmount.push(Amount);
    }
    if (ArrayAmount[0] !== undefined) {
      if (this.state.saleEmpty !== false) {
        this.setState({
          saleEmpty: false
        });
      }
    }
    if (ArrayAmount[0] === undefined) {
      if (this.state.saleEmpty !== true) {
        this.setState({
          saleEmpty: true
        });
      }
      return;
    }
    const TotalAmount = ArrayAmount.reduce(function(a, b) {
      return a + b;
    });
    if (this.state.TotalAmount !== TotalAmount)
      this.setState({
        TotalAmount: TotalAmount
      });
  }
  getSearchKeyword = e => {
    this.setState({
      Search: e.target.value
    });
  };
  Search = () => {
    const data = this.state.AP.filter(el => {
      var creditor_name = el.creditor_name;
      return creditor_name === this.state.Search;
    });
    if (data[0] !== undefined) {
      this.setState({
        saleEmpty: false
      });
    }
    if (data[0] === undefined) {
      this.setState({
        saleEmpty: true
      });
      return;
    }
    this.setState({
      AP: data,
      statusSearch: false
    });
  };
  Delete = id => {
    Axios.delete("http://localhost:5000/AP/" + id).then(Response => {
      console.log(Response.data);
    });
    this.setState({
      AP: this.state.AP.filter(el => el._id !== id)
    });
  };
  RetriveAll = () => {
    this.setState({
      AP: this.state.defaultAR
    });
  };
  render() {
    return (
      <div>
        <div className="text-center mt-2 display-4 bg-light topHeader">
          Account Payable
        </div>
        <div className="bg-light pb-1">
          <button
            className={
              this.state.All
                ? "btn btn-danger my-2 ml-2"
                : "btn btn-secondary my-2 ml-2"
            }
            onClick={this.RetriveAll}
          >
            All
          </button>
          <div className="ml-2 " style={{ display: "inline-block" }}>
            <input
              className="searchInput"
              placeholder=" Enter the creditor name"
              type="text"
              onChange={this.getSearchKeyword}
            ></input>
            <button className="btn btn-secondary ml-1" onClick={this.Search}>
              <i className="search icon "></i>
            </button>
          </div>
          <div
            className="text-danger "
            style={{ display: "inline-block", marginLeft: "50%" }}
          >
            <button className="btn btn-secondary">Total Payable : </button>{" "}
            <button className="btn btn-danger">{this.state.TotalAmount}</button>
          </div>
        </div>

        <table class="ui striped table">
          <thead>
            <tr>
              <th>Creditor Name</th>
              <th>Item Name</th>
              <th>Distributor Name</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          {this.state.Search && this.state.statusSearch ? (
            <>
              <Loading title="Searching from Record"></Loading>
            </>
          ) : (
            <>
              <tbody>
                {this.state.AP.map(sales => {
                  return (
                    <>
                      <AP
                        sales={sales}
                        deleteAR={this.Delete}
                        key={sales._id}
                      />
                    </>
                  );
                })}
              </tbody>
            </>
          )}
        </table>
        {this.state.saleEmpty === true ? (
          <>
            <h3 className="text-center">oops, no Payable yet..</h3>
          </>
        ) : (
          <> </>
        )}
      </div>
    );
  }
}
