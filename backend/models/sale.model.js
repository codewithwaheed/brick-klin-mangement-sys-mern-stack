const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const saleSchema = new Schema(
  {
    item_name: { type: String, required: true },
    payment_method: { type: String, required: true },
    debtor_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price_per_quantity: { type: Number, required: true },
    discount: { type: Number, required: true },
    total_price: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const SALE = mongoose.model("Sale", saleSchema);

module.exports = SALE;
