const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    cnic: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    contact_no: { type: Number, required: true },
    emp_type: { type: String, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const SALE = mongoose.model("Employee", employeeSchema);

module.exports = SALE;
