const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const APSchema = new Schema(
  {
    item_name: { type: String, required: true },
    creditor_name: { type: String, required: true },
    distributor_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    discount: { type: Number, required: true },
    total_price: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const AP = mongoose.model("AccountPayable", APSchema);

module.exports = AP;
