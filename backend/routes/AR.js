const router = require("express").Router();
let AR = require("../models/AR.models");

router.route("/").get((req, res) => {
  AR.find()
    .then(AR => res.json(AR))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const item_name = req.body.item_name;
  const debtor_name = req.body.debtor_name;
  const quantity = Number(req.body.quantity);
  const discount = Number(req.body.discount);
  const total_price = Number(req.body.total_price);
  const date = Date.parse(req.body.date);

  const newAR = new AR({
    item_name,
    debtor_name,
    quantity,
    discount,
    total_price,
    date
  });

  newAR
    .save()
    .then(() => res.json("AR added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  AR.findById(req.params.id)
    .then(AR => res.json(AR))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  AR.findByIdAndDelete(req.params.id)
    .then(() => res.json("AR deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
