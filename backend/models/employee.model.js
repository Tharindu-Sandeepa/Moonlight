const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, default: 0, required: true }, // Default value is 0
  otrate: { type: Number, default: 0, required: true },
  ottotal: { type: Number, default: 0, required: true },
  tsalary: { type: Number, default: 0, required: true }
}, {
  timestamps: true,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;