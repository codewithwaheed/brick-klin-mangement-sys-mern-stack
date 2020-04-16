const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const saleRouter = require("./routes/sale");
const purchaseRouter = require("./routes/purchase");
const employeeRouter = require("./routes/employee");
const empAccountRouter = require("./routes/empAccount");
const statmentRouter = require("./routes/statements");
const ArRouter = require("./routes/AR");
const ApRouter = require("./routes/AP");

app.use("/sale", saleRouter);
app.use("/purchase", purchaseRouter);
app.use("/employee", employeeRouter);
app.use("/AP", ApRouter);
app.use("/AR", ArRouter);
app.use("/empAccount", empAccountRouter);
app.use("/statement", statmentRouter);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
