const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ARSchema = new Schema(
  {
    item_name: { type: String, required: true },
    debtor_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    discount: { type: Number, required: true },
    total_price: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const AR = mongoose.model("AccountRecievable", ARSchema);

module.exports = AR;
