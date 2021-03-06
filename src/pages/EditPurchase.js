import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";

export default class EditPurchase extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    date: new Date(),
    v_pro_name: "",
    v_quantity: 0,
    v_price_per_quantity: 0,
    v_payment_method: "",
    v_total_price: "",
    v_creditor_name: "none",
    v_discount: 0,
    v_distributor_name: "",
    stateOfRecord: "true",
    validation: false
  };
  componentWillMount() {
    Axios.get("http://localhost:5000/purchase/" + this.props.match.params.id)
      .then(Response => {
        this.setState({
          v_pro_name: Response.data.item_name,
          v_quantity: Response.data.quantity,
          v_price_per_quantity: Response.data.price_per_quantity,
          v_payment_method: Response.data.payment_method,
          v_total_price: Response.data.total_price,
          v_creditor_name: Response.data.creditor_name,
          v_discount: Response.data.discount,
          v_distributor_name: Response.data.distributor_name
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getProId = e => {
    this.setState({
      v_pro_id: e.target.value
    });
  };
  getProName = e => {
    this.setState({
      v_pro_name: e.target.value
    });
  };
  getQuantity = e => {
    this.setState({
      v_quantity: e.target.value
    });
  };
  getPricePerQ = e => {
    this.setState({
      v_price_per_quantity: e.target.value
    });
  };
  getDistributorName = e => {
    this.setState({
      v_distributor_name: e.target.value
    });
  };

  getTotalPrice = e => {
    this.setState({
      v_total_price: e.target.value
    });
  };
  getPaymentMethod = e => {
    this.setState({
      v_payment_method: e.target.value
    });
    if (this.state.v_payment_method !== "debit") {
      this.setState({
        v_creditor_name: "none"
      });
    }
  };
  getCreditorName = e => {
    this.setState({
      v_creditor_name: e.target.value
    });
  };
  getDiscount = e => {
    this.setState({
      v_discount: e.target.value
    });
  };
  getDate = date => {
    this.setState({
      date: date
    });
  };
  getTotalPricefun = () => {
    var price_per_quantity = Number(this.state.v_price_per_quantity);
    var quantity = Number(this.state.v_quantity);
    var discount = Number(this.state.v_discount);
    var total_price = price_per_quantity * quantity - discount;

    if (
      this.state.v_quantity !== "" &&
      this.state.v_price_per_quantity !== "" &&
      this.state.v_discount !== ""
    ) {
      this.setState({
        v_total_price: Number(total_price)
      });
    }
  };
  AddValues = e => {
    e.preventDefault();

    if (
      this.state.v_pro_name === "" ||
      this.state.v_quantity === "" ||
      this.state.v_price_per_quantity === "" ||
      this.state.v_total_price === "" ||
      this.state.v_payment_method === ""
    ) {
      this.setState({
        validation: true
      });
      return;
    }

    const purchase = {
      item_name: this.state.v_pro_name,
      quantity: Number(this.state.v_quantity),
      price_per_quantity: Number(this.state.v_price_per_quantity),
      total_price: this.state.v_total_price,
      payment_method: this.state.v_payment_method,
      creditor_name: this.state.v_creditor_name,
      distributor_name: this.state.v_distributor_name,
      discount: Number(this.state.v_discount),
      date: this.state.date
    };
    Axios.post(
      "http://localhost:5000/purchase/update/" + this.props.match.params.id,
      purchase
    ).then(res => console.log(res.data));

    this.setState({
      stateOfRecord: false
    });

    window.location = "/purchase";
  };

  render() {
    return (
      <div>
        <div className="text-center mt-2 display-4 bg-light topHeader">
          Edit Purchase Record
        </div>
        <form>
          <div className="from-row">
            <div className="col-md-4 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">item name</label>
              <input
                type="text"
                value={this.state.v_pro_name}
                onChange={this.getProName}
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-4 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Distributor name</label>
              <input
                type="text"
                value={this.state.v_distributor_name}
                onChange={this.getDistributorName}
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-4 ml-3 mb-3 mb-form">
              <div className="form-group">
                <label>Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.getDate}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Quantity</label>
              <input
                type="number"
                value={this.state.v_quantity}
                onChange={this.getQuantity}
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Price per Quantity</label>
              <input
                type="number"
                value={this.state.v_price_per_quantity}
                onChange={this.getPricePerQ}
                className="form-control"
                id="validationDefault22"
                required
              />{" "}
            </div>
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Get Discount</label>
              <input
                type="number"
                value={this.state.v_discount}
                onChange={this.getDiscount}
                className="form-control"
                id="validationDefault22"
                required
              />
            </div>
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <label htmlFor="validationDefault22">Total price</label>
              <input
                type="number"
                value={this.state.v_total_price}
                onChange={this.getTotalPrice}
                className="form-control"
                id="validationDefault22"
                required
              />{" "}
              <button
                type="button"
                style={{ display: "inline-block" }}
                className="btn btn-outline-secondary btn-sm ml-2 mt-2"
                onClick={this.getTotalPricefun}
              >
                Get Total price
              </button>
            </div>
            <div className="col-md-2 ml-3 mb-3 mb-form">
              <p>Describe payment method </p>
              <input
                type="radio"
                name="payment"
                id="cash"
                value="cash"
                onChange={this.getPaymentMethod}
              ></input>
              <label for="cash">Cash</label>
              <input
                className="ml-2"
                type="radio"
                name="payment"
                id="debit"
                value="debit"
                onChange={this.getPaymentMethod}
              ></input>
              <label for="debit">Debit</label>
            </div>
            {this.state.v_payment_method === "debit" ? (
              <div className="col-md-2 ml-3 mb-3 mb-form">
                <label htmlFor="validationDefault22">Creditor Name</label>
                <input
                  type="text"
                  onChange={this.getCreditorName}
                  value={this.state.v_creditor_name}
                  defaultValue={this.state.v_creditor_name}
                  className="form-control"
                  id="validationDefault22"
                  required
                />
              </div>
            ) : (
              <div />
            )}
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
