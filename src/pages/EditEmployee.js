import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    date: new Date(),
    v_first_name: "",
    v_last_name: "",
    v_cnic: "",
    v_dob: new Date(),
    v_contact_no: 0,
    v_employee_type: "",
    stateOfRecord: "true",
    validation: false
  };
  componentWillMount() {
    Axios.get("http://localhost:5000/employee/" + this.props.match.params.id)
      .then(Response => {
        this.setState({
          v_first_name: Response.data.first_name,
          v_last_name: Response.data.last_name,
          v_cnic: Response.data.cnic,
          v_contact_no: Response.data.contact_no,
          v_employee_type: Response.data.emp_type
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getFirstName = e => {
    this.setState({
      v_first_name: e.target.value
    });
  };
  getLastName = e => {
    this.setState({
      v_last_name: e.target.value
    });
  };
  getCnic = e => {
    this.setState({
      v_cnic: e.target.value
    });
  };
  getDOB = date => {
    this.setState({
      v_dob: date
    });
  };
  getContactNo = e => {
    this.setState({
      v_contact_no: e.target.value
    });
  };

  getEmployeeType = e => {
    this.setState({
      v_employee_type: e.target.value
    });
  };
  getDate = date => {
    this.setState({
      date: date
    });
  };

  AddValues = e => {
    e.preventDefault();
    if (
      this.state.v_cnic === "" ||
      this.state.v_first_name === "" ||
      this.state.v_last_name === "" ||
      this.state.v_contact_no === "" ||
      this.state.v_employee_type === ""
    ) {
      this.setState({
        validation: true
      });
      return;
    }

    const employee = {
      first_name: this.state.v_first_name,
      last_name: this.state.v_last_name,
      cnic: this.state.v_cnic,
      dob: this.state.v_dob,
      contact_no: Number(this.state.v_contact_no),
      emp_type: this.state.v_employee_type,
      date: this.state.date
    };
    console.log(employee);
    Axios.post(
      "http://localhost:5000/employee/update/" + this.props.match.params.id,
      employee
    ).then(res => console.log(res.data));

    this.setState({
      stateOfRecord: false
    });
    // const AR = {
    //   item_name: this.state.v_pro_name,
    //   quantity: Number(this.state.v_quantity),
    //   total_price: this.state.v_total_price,
    //   debtor_name: this.state.v_debtor_name,
    //   discount: Number(this.state.v_discount),
    //   date: this.state.date
    // };
    // if (this.state.v_debtor_name !== "none") {
    //   Axios.post("http://localhost:5000/AR/add", AR).then(res =>
    //     console.log(res.data)
    //   );
    // }

    window.location = "/employee";
  };

  render() {
    return (
      <div>
        <div className="text-center mt-2 display-4 bg-light topHeader">
          Employee Registration
        </div>
        <form>
          <div className="from-row">
            <div className="col-md-3 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">First Name</label>
              <input
                type="text"
                value={this.state.v_first_name}
                onChange={this.getFirstName}
                placeholder="eg. Ali"
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-3 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Last Name</label>
              <input
                type="text"
                value={this.state.v_last_name}
                onChange={this.getLastName}
                placeholder="eg. Raza"
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-4 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefaultUsername22">Cnic</label>
              <input
                type="text"
                value={this.state.v_cnic}
                onChange={this.getCnic}
                placeholder="xxxxx-xxxxxxx-x"
                className="form-control"
                id="validationDefaultUsername22"
                aria-describedby="inputGroupPrepend23"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <label>Date of Joining : </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.getDate}
                />
              </div>
            </div>
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <label>Date of Birth: </label>
              <div>
                <DatePicker
                  selected={this.state.v_dob}
                  onChange={this.getDOB}
                />
              </div>
            </div>
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Contact no</label>
              <input
                type="text"
                value={this.state.v_contact_no}
                onChange={this.getContactNo}
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>

            <div className="col-md-2 ml-3 mb-3 mb-form">
              <p>Employee Type </p>
              <input
                type="radio"
                name="employeeType"
                id="A"
                value="A"
                onChange={this.getEmployeeType}
              ></input>
              <label for="A">A</label>
              <input
                className="ml-2"
                type="radio"
                name="employeeType"
                id="B"
                value="B"
                onChange={this.getEmployeeType}
              ></input>
              <label for="B">B</label>
              <input
                className="ml-2"
                type="radio"
                name="employeeType"
                id="C"
                value="C"
                onChange={this.getEmployeeType}
              ></input>
              <label for="C">C</label>
              <input
                className="ml-2"
                type="radio"
                name="employeeType"
                id="D"
                value="D"
                onChange={this.getEmployeeType}
              ></input>
              <label for="D">D</label>
              <input
                className="ml-2"
                type="radio"
                name="employeeType"
                id="E"
                value="E"
                onChange={this.getEmployeeType}
              ></input>
              <label for="E">E</label>
              <input
                className="ml-2"
                type="radio"
                name="employeeType"
                id="F"
                value="F"
                onChange={this.getEmployeeType}
              ></input>
              <label for="F">F</label>
            </div>
          </div>
        </form>

        <div className=" text-center">
          {this.state.validation ? (
            <p className="text-danger">You must fill all the values</p>
          ) : (
            <></>
          )}
          <button
            className="btn btn-secondary "
            onClick={this.AddValues}
            style={{
              backgroundColor: this.state.stateOfRecord ? "#d9534f" : "#5cb85c"
            }}
          >
            Save Record
          </button>
        </div>
      </div>
    );
  }
}
