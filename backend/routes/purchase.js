const router = require("express").Router();
let Purchase = require("../models/purchase.model");

router.route("/").get((req, res) => {
  Purchase.find()
    .then(purchase => res.json(purchase))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const item_name = req.body.item_name;
  const creditor_name = req.body.creditor_name;
  const payment_method = req.body.payment_method;
  const distributor_name = req.body.distributor_name;
  const quantity = Number(req.body.quantity);
  const price_per_quantity = Number(req.body.price_per_quantity);
  const discount = Number(req.body.discount);
  const total_price = Number(req.body.total_price);
  const date = Date.parse(req.body.date);

  const newPurchase = new Purchase({
    item_name,
    creditor_name,
    distributor_name,
    payment_method,
    quantity,
    price_per_quantity,
    discount,
    total_price,
    date
  });

  newPurchase
    .save()
    .then(() => res.json("Purchase added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Purchase.findById(req.params.id)
    .then(purchase => res.json(purchase))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Purchase.findByIdAndDelete(req.params.id)
    .then(() => res.json("purchase deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Purchase.findById(req.params.id)
    .then(purchase => {
      purchase.item_name = req.body.item_name;
      purchase.creditor_name = req.body.creditor_name;
      purchase.distributor_name = req.body.distributor_name;
      purchase.payment_method = req.body.payment_method;
      purchase.quantity = Number(req.body.quantity);
      purchase.price_per_quantity = Number(req.body.price_per_quantity);
      purchase.discount = Number(req.body.discount);
      purchase.total_price = Number(req.body.total_price);
      purchase.date = Date.parse(req.body.date);

      purchase
        .save()
        .then(() => res.json("Purchase updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
