const router = require("express").Router();
let Employee = require("../models/employee.model");

router.route("/").get((req, res) => {
  Employee.find()
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const cnic = req.body.cnic;
  const dob = Date.parse(req.body.dob);
  const contact_no = Number(req.body.contact_no);
  const emp_type = req.body.emp_type;
  const date = Date.parse(req.body.date);

  const newEmployee = new Employee({
    first_name,
    last_name,
    cnic,
    dob,
    contact_no,
    emp_type,
    date
  });

  newEmployee
    .save()
    .then(() => res.json("Employee Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Employee.findById(req.params.id)
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json("Employee deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Employee.findById(req.params.id)
    .then(employee => {
      employee.first_name = req.body.first_name;
      employee.last_name = req.body.last_name;
      employee.cnic = req.body.cnic;
      employee.dob = Date.parse(req.body.dob);
      employee.contact_no = Number(req.body.contact_no);
      employee.emp_type = req.body.emp_type;
      employee.date = Date.parse(req.body.date);

      employee
        .save()
        .then(() => res.json("Employee updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
