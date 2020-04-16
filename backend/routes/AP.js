const router = require("express").Router();
let AP = require("../models/AP.models");

router.route("/").get((req, res) => {
  AP.find()
    .then(AP => res.json(AP))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const item_name = req.body.item_name;
  const creditor_name = req.body.creditor_name;
  const distributor_name = req.body.distributor_name;
  const quantity = Number(req.body.quantity);
  const discount = Number(req.body.discount);
  const total_price = Number(req.body.total_price);
  const date = Date.parse(req.body.date);

  const newAP = new AP({
    item_name,
    creditor_name,
    distributor_name,
    quantity,
    discount,
    total_price,
    date
  });

  newAP
    .save()
    .then(() => res.json("AP added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  AP.findById(req.params.id)
    .then(AP => res.json(AP))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  AP.findByIdAndDelete(req.params.id)
    .then(() => res.json("AP deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
