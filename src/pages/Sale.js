import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import Axios from "axios";

const Sales = props => (
  <tr>
    <td>{props.sales.item_name}</td>
    <td>{props.sales.date.substring(0, 10)}</td>
    <td> on {props.sales.payment_method} </td>
    <td>{props.sales.debtor_name}</td>
    <td>{props.sales.quantity}</td>
    <td>{props.sales.price_per_quantity}</td>
    <td>{props.sales.discount}</td>
    <td>{props.sales.total_price}</td>
    <td>
      <Link to={`/editSale/${props.sales._id}`}>
        <i className="edit icon"></i>
      </Link>
      |
      <a
        href="#"
        onClick={() => {
          props.deleteSale(props.sales._id);
        }}
      >
        <i className="delete icon"></i>
      </a>
    </td>
  </tr>
);
export default class Sale extends Component {
  constructor(props) {
    super(props);
    this.Delete = this.Delete.bind(this);
  }
  state = {
    sale: [],
    defaultSale: [],
    saleEmpty: false,
    Searchsale: [],
    TotalAmount: "00",
    Search: "",
    All: true,
    month: false,
    Year: false,
    today: false,
    statusSearch: true,
    docId: "empty"
  };
  componentWillMount() {
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
  }
  DeleteRecord = () => {
    this.setState({
      stateDelete: true
    });
  };
  RetriveMonth = () => {
    
    const startofMonth = new Date();
    startofMonth.setDate(1);
    const data = this.state.defaultSale.filter(el => {
      var saleDate = new Date(el.date);
      return saleDate > startofMonth;
    });

    this.setState({
      sale: data,
      today: false,
      month: true,
      Year: false,
      All: false
    });
  };
  RetriveYear = () => {
    const startofYear = new Date();
    startofYear.setMonth(0);
    const data = this.state.defaultSale.filter(el => {
      var saleDate = new Date(el.date);
      return saleDate > startofYear;
    });

    this.setState({
      sale: data,
      today: false,
      month: false,
      Year: true,
      All: false
    });
  };
  RetriveToday = () => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const data = this.state.defaultSale.filter(el => {
      var saleDate = new Date(el.date);
      return saleDate > startOfDay;
    });
    this.setState({
      sale: data,
      today: true,
      month: false,
      Year: false,
      All: false
    });
  };
  RetriveAll = () => {
    this.setState({
      sale: this.state.defaultSale,
      today: false,
      month: false,
      Year: false,
      All: true
    });
    {
      const CheckArray = this.state.sale;
      if (CheckArray[0] === undefined) {
        console.log("empty sale");
        this.setState({
          saleEmpty: true
        });
      } else {
        this.setState({
          saleEmpty: false
        });
      }
      console.log(this.state.saleEmpty);
    }
  };
  componentDidUpdate() {
    if (this.state.All) {
      const ArrayAmount = [];
      for (var i = 0; i < this.state.defaultSale.length; i++) {
        var Amount = Number(this.state.defaultSale[i].total_price);
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
    if (this.state.today) {
      const ArrayAmount = [];
      for (var i = 0; i < this.state.sale.length; i++) {
        var Amount = Number(this.state.sale[i].total_price);
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
    if (this.state.month) {
      const ArrayAmount = [];
      for (var i = 0; i < this.state.sale.length; i++) {
        var Amount = Number(this.state.sale[i].total_price);
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
    if (this.state.Year) {
      const ArrayAmount = [];
      for (var i = 0; i < this.state.sale.length; i++) {
        var Amount = Number(this.state.sale[i].total_price);
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
  }
  getSearchKeyword = e => {
    this.setState({
      Search: e.target.value
    });
  };
  Search = () => {
    const data = this.state.defaultSale.filter(el => {
      var debtor_name = el.debtor_name;
      return debtor_name === this.state.Search;
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
      sale: data,
      statusSearch: false
    });
  };
  Delete = id => {
    Axios.delete("http://localhost:5000/sale/" + id).then(Response => {
      console.log(Response.data);
    });
    this.setState({
      sale: this.state.sale.filter(el => el._id !== id),
      defaultSale: this.state.defaultSale.filter(el => el._id !== id)
    });
  };
  render() {
    return (
      <div>
        <div className="text-center mt-2 display-4 bg-light topHeader">
          Sale Record
        </div>
        <div className="bg-light">
          <button
            className={
              this.state.today
                ? "btn btn-danger my-2 ml-2"
                : "btn btn-secondary my-2 ml-2"
            }
            onClick={this.RetriveToday}
          >
            Today
          </button>
          <button
            className={
              this.state.month
                ? "btn btn-danger my-2 ml-2"
                : "btn btn-secondary my-2 ml-2"
            }
            onClick={this.RetriveMonth}
          >
            Month
          </button>
          <button
            className={
              this.state.Year
                ? "btn btn-danger my-2 ml-2"
                : "btn btn-secondary my-2 ml-2"
            }
            onClick={this.RetriveYear}
          >
            Year
          </button>
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

          <Link to="/addRecorde">
            <button className="btn btn-secondary  my-2 ml-2">
              <i className="plus icon"></i>Add
            </button>
          </Link>
          <div className="ml-2" style={{ display: "inline-block" }}>
            <input
              className="searchInput"
              placeholder=" Enter the debtor name"
              type="text"
              onChange={this.getSearchKeyword}
            ></input>
            <button className="btn btn-secondary ml-1" onClick={this.Search}>
              <i className="search icon "></i>
            </button>
          </div>
          <div
            className="text-danger "
            style={{ display: "inline-block", marginLeft: "36%" }}
          >
            <button className="btn btn-secondary">Total Sale : </button>{" "}
            <button className="btn btn-danger">{this.state.TotalAmount}</button>
          </div>
        </div>
        <div className="pt-2"></div>

        <table class="ui striped table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Date</th>
              <th>Payment method</th>
              <th>Debtor Name</th>
              <th>Quantity</th>
              <th>Price Per Quantity</th>
              <th>Discount on Sale</th>
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
                {this.state.sale.map(sales => {
                  return (
                    <>
                      <Sales
                        sales={sales}
                        deleteSale={this.Delete}
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
            <h3 className="text-center">oops, no sales yet..</h3>
          </>
        ) : (
          <> </>
        )}
      </div>
    );
  }
}
