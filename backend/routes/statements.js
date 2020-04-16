const router = require("express").Router();
let Statement = require("../models/statements.model");

router.route("/").get((req, res) => {
  Statement.find()
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const account_id = req.body.account_id;
  const statement = req.body.statement;

  const newStatement = new Statement({
    account_id,
    statement
  });

  newStatement
    .save()
    .then(() => res.json("Statement Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Statement.findById(req.params.id)
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Statement.findByIdAndDelete(req.params.id)
    .then(() => res.json("Statement deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  Statement.findById(req.params.id)
    .then(employee => {
     
      employee.account_id = req.body.account_id;
      employee.statement = req.body.statement;

      employee
        .save()
        .then(() => res.json("Employee updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
