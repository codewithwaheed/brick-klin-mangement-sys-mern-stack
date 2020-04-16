import React, { Component } from "react";
import firebase from "firebase";
import Loading from "../Components/Loading";
import Axios from "axios";

export default class EmployeeAccount extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    employee: [],
    emp_account: [],
    loading: true,
    balance: 0,
    resetId: null,
    statement: [],
    filterStatement: [],
    first_name: "",
    last_name: "",
    contact_no: 0,
    emp_type: "",
    saveState: true,
    statementStatus: false,
    docId: "",
    cnic: "",
    v_monthly_pay: "",
    v_advance: "",
    paymentRefernce: ""
  };
  componentWillMount() {
    Axios.get("http://localhost:5000/empAccount/")
      .then(Response => {
        this.setState({
          employee: Response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    Axios.get("http://localhost:5000/statement/")
      .then(Response => {
        this.setState({
          statement: Response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    const data = this.state.employee.filter(el => {
      var cnic = el.cnic;
      return cnic === this.props.match.params.id;
    });

    const emp_account = this.state.emp_account;
    if (emp_account[0] !== data[0]) {
      this.setState({
        emp_account: data,
        balance: data[0].balance,
        docId: data[0]._id,
        first_name: data[0].first_name,
        last_name: data[0].last_name,
        contact_no: data[0].contact_no,
        cnic: data[0].cnic,
        emp_type: data[0].emp_type
      });
    }
    const statements = this.state.statement.filter(el => {
      var cnic = el.account_id;
      return cnic === this.state.cnic;
    });

    const prev_statement = this.state.filterStatement;
    if (prev_statement[0] === undefined) {
      if (this.state.statementStatus !== true)
        this.setState({
          statementStatus: true
        });
    }
    if (prev_statement[0] !== undefined) {
      if (this.state.statementStatus !== false)
        this.setState({
          statementStatus: false
        });
    }
    if (prev_statement[0] !== statements[0])
      this.setState({
        filterStatement: statements
      });
  }
  getMonthlyPay = e => {
    this.setState({
      v_monthly_pay: e.target.value
    });
  };
  getAdvance = e => {
    this.setState({
      v_advance: e.target.value
    });
  };
  getPaidRefrence = e => {
    this.setState({
      paymentRefernce: e.target.value
    });
  };
  Add = () => {
    var monthlyPay = Number(this.state.v_monthly_pay);
    var advance = Number(this.state.v_advance);
    var Entrybalance = monthlyPay - advance;
    var previousBalance = Number(this.state.balance);
    var currentBalance = previousBalance + Entrybalance;
    this.setState({
      balance: currentBalance
    });
    this.setState({
      saveState: false
    });
    if (this.state.v_advance !== "") {
      var statement1 =
        "Employee get " +
        this.state.v_advance +
        " as Advance money from " +
        this.state.paymentRefernce +
        "on " +
        new Date();

      const Statement = {
        account_id: this.state.cnic,
        statement: statement1
      };
      Axios.post("http://localhost:5000/statement/add", Statement).then(res =>
        console.log(res.data)
      );
    }
    if (this.state.v_monthly_pay !== "") {
      var statement2 =
        "Employee get " +
        this.state.v_monthly_pay +
        " as monthly pay from " +
        this.state.paymentRefernce +
        "on " +
        new Date();
      const Statement = {
        account_id: this.state.cnic,
        statement: statement2
      };
      Axios.post("http://localhost:5000/statement/add", Statement).then(res =>
        console.log(res.data)
      );
    }
    Axios.get("http://localhost:5000/statement/")
      .then(Response => {
        this.setState({
          statement: Response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  save = () => {
    const emp_account = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      cnic: this.state.cnic,
      contact_no: this.state.contact_no,
      emp_type: this.state.emp_type,
      balance: Number(this.state.balance)
    };
    console.log(emp_account);

    Axios.post(
      "http://localhost:5000/empAccount/update/" + this.state.docId,
      emp_account
    ).then(res => console.log(res.data));
    window.location = "/employee";
  };

  async setResetBalance() {
    await new Promise(resolve =>
      this.setState({ balance: 0 }, () => resolve())
    );
  }
  Reset = () => {
    this.setResetBalance();
    const emp_account = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      cnic: this.state.cnic,
      contact_no: Number(this.state.contact_no),
      emp_type: this.state.emp_type,
      balance: Number(this.state.balance)
    };
    this.setState({
      saveState: false
    });

    Axios.post(
      "http://localhost:5000/empAccount/update/" + this.state.docId,
      emp_account
    ).then(res => console.log(res.data));
    const data = this.state.filterStatement;

    for (var i = 0; i < data.length; i++) {
      const id = data[i]._id;
      Axios.delete("http://localhost:5000/statement/" + id).then(Response => {
        console.log(Response.data);
      });
      this.setState({
        statement: this.state.statement.filter(el => el._id !== id),
        filterStatement: this.state.filterStatement.filter(el => el._id !== id)
      });
    }
  };
  render() {
    return (
      <div>
        <div className="text-center mt-2 py-4 display-4 bg-light topHeader">
          Employee Account
        </div>
        <div className="bg-light py-3">
          <button className="btn btn-secondary emp_button btn-sm ml-3">
            Monthly fee
          </button>
          <input
            type="text"
            className="emp_input"
            onChange={this.getMonthlyPay}
          ></input>
          <lable className="btn emp_button btn-secondary btn-sm ml-3">
            Advance
          </lable>
          <input
            className="emp_input"
            type="text"
            onChange={this.getAdvance}
          ></input>
          <lable className="btn emp_button btn-secondary btn-sm ml-3">
            Paid by Refernce
          </lable>
          <input
            className="emp_input"
            type="text"
            onChange={this.getPaidRefrence}
          ></input>
          <button className="btn btn-danger ml-2" onClick={this.Add}>
            Add
          </button>
          <button
            className={
              this.state.saveState
                ? "btn btn-danger ml-2"
                : "btn btn-success ml-2"
            }
            onClick={this.save}
          >
            Save
          </button>
          <button
            className="btn btn-secondary "
            style={{ marginLeft: "20%" }}
            onClick={this.Reset}
          >
            Reset Account
          </button>
        </div>

        {this.state.emp_account &&
          this.state.emp_account.map(Employee => {
            return (
              <div className="bg-light py-3 mt-2">
                <div className="text-center text-secondary display-4">
                  Details of Employee
                </div>
                <div className="ml-5 mt-5">
                  <div className="row">
                    <div className="col-6">
                      <h3>Cnic</h3>
                      <p>{Employee.cnic}</p>{" "}
                    </div>
                    <div className="col-6">
                      <h2>Total Balance</h2>
                      <p className="display-4">{this.state.balance}</p>{" "}
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <h3>Name</h3>
                      <p>
                        {Employee.first_name} {Employee.last_name}
                      </p>{" "}
                    </div>
                    <div className="col-6">
                      <h3>Employee type</h3>
                      <p>{Employee.emp_type}</p>{" "}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <div className="py-3 mt-1">
          <div className="text-center text-secondary py-4 bg-light display-4">
            Statement of Account
          </div>
          {this.state.filterStatement &&
            this.state.filterStatement.map(Statement => {
              return (
                <div className="ml-4 ">
                  <ul class="list-group bg-light">
                    <li class="list-group-item bg-light">
                      {Statement.statement}
                    </li>
                  </ul>
                </div>
              );
            })}
          {this.state.statementStatus === true ? (
            <>
              <h3 className="text-center py-2">
                oops,no account Statements yet
              </h3>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}
