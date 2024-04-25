import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

const ViewAllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees/')
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios.delete(`http://localhost:5000/api/employees/${id}`)
        .then(res => {
          console.log(res.data);
          setEmployees(employees.filter(emp => emp._id !== id));
          alert('Employee deleted successfully.');
        })
        .catch(err => console.error(err));
    }
  };

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(employee =>
    employee._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{height: "680px"}}>
      <h2>All Employees</h2>
      <Form.Group controlId="search" style={{marginBottom: "25px"}}>
        <Form.Control
          type="text"
          placeholder="Search by name, email, position, or department"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Basic Salary</th>
            <th>OT rate</th>
            <th>Total OT</th>
            <th>Total Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>{employee.otrate}</td>
              <td>{employee.ottotal}</td>
              <td>{employee.tsalary}</td>
              <td>
                <Link to={`/view/${employee._id}`} className="btn btn-primary mr-2" style={{marginRight: "25px"}}>View</Link>
                <Link to={`/update/${employee._id}`} className="btn btn-warning mr-2" style={{marginRight: "25px"}}>Edit</Link>
                <Button variant="danger" onClick={() => handleDelete(employee._id)} style={{marginRight: "25px"}}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewAllEmployees;