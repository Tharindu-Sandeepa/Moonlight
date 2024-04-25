const router = require('express').Router();
let Employee = require('../models/employee.model');

// Get all employees
router.route('/').get((req, res) => {
  Employee.find()
    .then(employees => res.json(employees))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new employee
router.route('/add').post((req, res) => {
  const { firstName, lastName, email, position, department, salary, otrate, ottotal, tsalary } = req.body;
  const newEmployee = new Employee({ firstName, lastName, email, position, department, salary, otrate, ottotal, tsalary });

  newEmployee.save()
    .then(() => res.json('Employee added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get employee by ID
router.route('/:id').get((req, res) => {
  Employee.findById(req.params.id)
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update employee by ID
router.route('/update/:id').put(async (req, res) => {
  try {
    const { salary, otrate } = req.body;

    // Calculate ottotal and tsalary
    const ottotal = (otrate * salary)/100;
    const tsalary = (salary + ottotal);

    // Update employee in the database
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { salary, otrate, ottotal, tsalary },
      { new: true }
    );

    res.json(updatedEmployee);
  } catch (err) {
    console.error('Error:', err);
    res.status(400).json('Error: ' + err);
  }
});

// Delete employee by ID
router.delete('/:id', getEmployee, async (req, res) => {
  try {
    await res.employee.deleteOne();
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get employee by ID
async function getEmployee(req, res, next) {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.employee = employee;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;