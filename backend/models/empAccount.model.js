const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    cnic: { type: String, required: true, unique: true },
    contact_no: { type: Number, required: true },
    emp_type: { type: String, required: true },
    balance: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

const Eaccount = mongoose.model("Emp_Accounts", employeeSchema);

module.exports = Eaccount;
