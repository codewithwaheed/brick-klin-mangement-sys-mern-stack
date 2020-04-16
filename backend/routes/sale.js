const router = require("express").Router();
let Sale = require("../models/sale.model");

router.route("/").get((req, res) => {
  Sale.find()
    .then(sales => res.json(sales))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const item_name = req.body.item_name;
  const debtor_name = req.body.debtor_name;
  const payment_method = req.body.payment_method;
  const quantity = Number(req.body.quantity);
  const price_per_quantity = Number(req.body.price_per_quantity);
  const discount = Number(req.body.discount);
  const total_price = Number(req.body.total_price);
  const date = Date.parse(req.body.date);

  const newSale = new Sale({
    item_name,
    debtor_name,
    payment_method,
    quantity,
    price_per_quantity,
    discount,
    total_price,
    date
  });

  newSale
    .save()
    .then(() => res.json("Sale added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Sale.findById(req.params.id)
    .then(sale => res.json(sale))
    .catch(err => res.status(400).json("Error: " + err));
});


router.route("/:id").delete((req, res) => {
  Sale.findByIdAndDelete(req.params.id)
    .then(() => res.json("SAle deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Sale.findById(req.params.id)
    .then(sale => {
      sale.item_name = req.body.item_name;
      sale.debtor_name = req.body.debtor_name;
      sale.payment_method = req.body.payment_method;
      sale.quantity = Number(req.body.quantity);
      sale.price_per_quantity = Number(req.body.price_per_quantity);
      sale.discount = Number(req.body.discount);
      sale.total_price = Number(req.body.total_price);
      sale.date = Date.parse(req.body.date);

      sale
        .save()
        .then(() => res.json("sale updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
