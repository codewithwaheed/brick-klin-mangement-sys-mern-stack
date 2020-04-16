const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const statements = new Schema(
  {
    account_id: { type: String, required: true },
    statement: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const Statement = mongoose.model("statements", statements);

module.exports = Statement;
