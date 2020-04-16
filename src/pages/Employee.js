import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import Axios from "axios";

const Employee = props => (
  <tr>
    <td>{props.sales.cnic}</td>
    <td>
      {props.sales.first_name} {props.sales.last_name}{" "}
    </td>
    <td>{props.sales.emp_type}</td>
    <td>{props.sales.contact_no}</td>
    <td>{props.sales.dob.substring(0, 10)}</td>
    <td>{props.sales.date.substring(0, 10)}</td>
    <td>
      <Link to={`/editEmployee/${props.sales._id}`}>
        <i className="edit icon"></i>
      </Link>
      |
      <a
        href="#"
        onClick={() => {
          props.deleteSale(props.sales._id, props.sales.cnic);
        }}
      >
        <i className="delete icon"></i>
      </a>
      |{" "}
      <Link to={`/employeeAccount/${props.sales.cnic}`}>
        <button className="btn btn-outline-primary btn-sm"> Account</button>
      </Link>
    </td>
  </tr>
);
export default class Employees extends Component {
  constructor(props) {
    super(props);
    this.Delete = this.Delete.bind(this);
  }
  state = {
    employee: [],
    empAccount: [],
    defaultSale: [],
    AccountId: "",
    saleEmpty: false,
    Searchsale: [],
    TotalAmount: "00",
    Search: "",
    colorA: false,
    colorB: false,
    colorC: false,
    colorD: false,
    colorE: false,
    colorF: false,
    All: true,
    statusSearch: true
  };
  componentWillMount() {
    Axios.get("http://localhost:5000/employee/")
      .then(Response => {
        this.setState({
          employee: Response.data,
          defaultSale: Response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    Axios.get("http://localhost:5000/empAccount/")
      .then(Response => {
        this.setState({
          empAccount: Response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  async setAccountID(id) {
    await new Promise(resolve =>
      this.setState({ AccountId: id }, () => resolve())
    );
    setTimeout(1000);
    console.log(this.state.AccountId);
  }
  componentDidUpdate() {
    const testArray = this.state.defaultSale;
    if (testArray[0] === undefined) {
      if (this.state.saleEmpty !== true)
        this.setState({
          saleEmpty: true
        });
    }
    const testArrayS = this.state.employee;
    if (testArrayS[0] === undefined) {
      if (this.state.saleEmpty !== true)
        this.setState({
          saleEmpty: true
        });
    }
    if (testArrayS[0] !== undefined) {
      if (this.state.saleEmpty !== false)
        this.setState({
          saleEmpty: false
        });
    }
  }
  RetriveA = () => {
    const data = this.state.defaultSale.filter(el => {
      var emp_type = el.emp_type;
      return emp_type === "A";
    });
    this.setState({
      employee: data,
      colorA: true,
      colorB: false,
      colorC: false,
      colorD: false,
      colorE: false,
      colorF: false,
      All: false
    });
  };
  RetriveB = () => {
    const data = this.state.defaultSale.filter(el => {
      var emp_type = el.emp_type;
      return emp_type === "B";
    });
    this.setState({
      employee: data,
      colorA: false,
      colorB: true,
      colorC: false,
      colorD: false,
      colorE: false,
      colorF: false,
      All: false
    });
  };
  RetriveC = () => {
    const data = this.state.defaultSale.filter(el => {
      var emp_type = el.emp_type;
      return emp_type === "C";
    });
    this.setState({
      employee: data,
      colorA: false,
      colorB: false,
      colorC: true,
      colorD: false,
      colorE: false,
      colorF: false,
      All: false
    });
  };
  RetriveD = () => {
    const data = this.state.defaultSale.filter(el => {
      var emp_type = el.emp_type;
      return emp_type === "D";
    });
    this.setState({
      employee: data,
      colorA: false,
      colorB: false,
      colorC: false,
      colorD: true,
      colorE: false,
      colorF: false,
      All: false
    });
  };
  RetriveE = () => {
    const data = this.state.defaultSale.filter(el => {
      var emp_type = el.emp_type;
      return emp_type === "E";
    });
    this.setState({
      employee: data,
      colorA: false,
      colorB: false,
      colorC: false,
      colorD: false,
      colorE: true,
      colorF: false,
      All: false
    });
  };
  RetriveF = () => {
    const data = this.state.defaultSale.filter(el => {
      var emp_type = el.emp_type;
      return emp_type === "F";
    });
    this.setState({
      employee: data,
      colorA: false,
      colorB: false,
      colorC: false,
      colorD: false,
      colorE: false,
      colorF: true,
      All: false
    });
  };
  RetriveAll = () => {
    this.setState({
      employee: this.state.defaultSale,
      colorA: false,
      colorB: false,
      colorC: false,
      colorD: false,
      colorE: false,
      colorF: false,
      All: true
    });
    {
      const CheckArray = this.state.employee;
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
  getSearchKeyword = e => {
    this.setState({
      Search: e.target.value
    });
  };
  Search = () => {
    const data = this.state.defaultSale.filter(el => {
      var cnic = el.cnic;
      return cnic === this.state.Search;
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
      employee: data,
      statusSearch: false
    });
    console.log(this.state.sale);
  };

  Delete = (id, cnic) => {
    Axios.delete("http://localhost:5000/employee/" + id).then(Response => {
      console.log(Response.data);
    });
    this.setState({
      employee: this.state.employee.filter(el => el._id !== id),
      defaultSale: this.state.defaultSale.filter(el => el._id !== id)
    });

    console.log(this.state.empAccount);
    const data = this.state.empAccount.filter(el => {
      var nowcnic = el.cnic;
      return nowcnic === cnic;
    });
    console.log(data);
    const AccountId = data[0]._id;
    Axios.delete("http://localhost:5000/empAccount/" + AccountId).then(
      Response => {
        console.log(Response.data);
      }
    );
  };
  render() {
    return (
      <div>
        <div className="text-center mt-2 display-4 bg-light topHeader">
          Employee Record
        </div>
        <div className="bg-light py-2">
          <button
            className={
              this.state.colorA
                ? "btn btn-danger mt-2 ml-2"
                : "btn btn-secondary mt-2 ml-2"
            }
            onClick={this.RetriveA}
          >
            Type A
          </button>
          <button
            className={
              this.state.colorB
                ? "btn btn-danger mt-2 ml-2"
                : "btn btn-secondary mt-2 ml-2"
            }
            onClick={this.RetriveB}
          >
            Type B
          </button>
          <button
            className={
              this.state.colorC
                ? "btn btn-danger mt-2 ml-2"
                : "btn btn-secondary mt-2 ml-2"
            }
            onClick={this.RetriveC}
          >
            Type C
          </button>
          <button
            className={
              this.state.colorD
                ? "btn btn-danger mt-2 ml-2"
                : "btn btn-secondary mt-2 ml-2"
            }
            onClick={this.RetriveD}
          >
            Type D
          </button>
          <button
            className={
              this.state.colorE
                ? "btn btn-danger mt-2 ml-2"
                : "btn btn-secondary mt-2 ml-2"
            }
            onClick={this.RetriveE}
          >
            Type E
          </button>
          <button
            className={
              this.state.colorF
                ? "btn btn-danger mt-2 ml-2"
                : "btn btn-secondary mt-2 ml-2"
            }
            onClick={this.RetriveF}
          >
            Type F
          </button>
          <button
            className={
              this.state.All
                ? "btn btn-danger mt-2 ml-2"
                : "btn btn-secondary mt-2 ml-2"
            }
            onClick={this.RetriveAll}
          >
            All
          </button>
          <Link to="/newEmployee">
            {" "}
            <button className="btn btn-secondary  mt-2 ml-2">
              <i className="plus icon"></i>Add
            </button>{" "}
          </Link>
          <div className="ml-2" style={{ display: "inline-block" }}>
            <input
              className="searchInput"
              placeholder=" Enter the employee cnic"
              type="text"
              onChange={this.getSearchKeyword}
            ></input>
            <button className="btn btn-secondary ml-1" onClick={this.Search}>
              <i className="search icon "></i>
            </button>
          </div>
        </div>
        <table class="ui striped table">
          <thead>
            <tr>
              <th>Cnic</th>
              <th>Employee Name</th>
              <th>Employee Type</th>
              <th>Contact number</th>
              <th>Date of Birth</th>
              <th>Joining Date</th>
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
                {this.state.employee.map(sales => {
                  return (
                    <>
                      <Employee
                        sales={sales}
                        deleteSale={this.Delete}
                        getAccountID={this.getAccountID}
                        key={sales._id}
                        ID={this.state.AccountId}
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
            <h3 className="text-center">oops, no Employee yet..</h3>
          </>
        ) : (
          <> </>
        )}
      </div>
    );
  }
}
