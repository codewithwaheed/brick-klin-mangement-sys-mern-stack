const router = require("express").Router();
let EmployeeAccount = require("../models/empAccount.model");

router.route("/").get((req, res) => {
  EmployeeAccount.find()
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const cnic = req.body.cnic;
  const contact_no = Number(req.body.contact_no);
  const emp_type = req.body.emp_type;
  const balance = Number(req.body.balance);

  const newEmployeeAccount = new EmployeeAccount({
    first_name,
    last_name,
    cnic,
    contact_no,
    emp_type,
    balance
  });

  newEmployeeAccount
    .save()
    .then(() => res.json("Employee account Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  EmployeeAccount.findById(req.params.id)
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  EmployeeAccount.findByIdAndDelete(req.params.id)
    .then(() => res.json("Employee Account deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  EmployeeAccount.findById(req.params.id)
    .then(employee => {
      employee.first_name = req.body.first_name;
      employee.last_name = req.body.last_name;
      employee.cnic = req.body.cnic;
      employee.contact_no = Number(req.body.contact_no);
      employee.emp_type = req.body.emp_type;
      employee.balance = Number(req.body.balance);

      employee
        .save()
        .then(() => res.json("Employee updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
