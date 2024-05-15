import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import Dashboard from '../Dashboard';

const ViewAllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5002/api/employees/')
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios.delete(`http://localhost:5002/api/employees/${id}`)
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

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value);
  };

  const getCategory = position => {
    if (['Manager', 'Operations Manager', 'Production Manager', 'Marketing and Sales Manager'].includes(position)) {
      return 'Manager';
    } else if (['Gemologist',].includes(position)) {
      return 'Specialist';
    } else {
      return 'Trainee';
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const category = getCategory(employee.position);
    return (
      (searchTerm === '' ||
        employee._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === '' || category === selectedCategory)
    );
  });

  return (
    <Dashboard title="Employee Management">
      <div style={{ height: "1500px", padding: "22px" }}>
        <h2>All Employees Details</h2>
        <p>Total Employees: {filteredEmployees.length}</p>
        <Form.Group as={Row} controlId="search" style={{ marginBottom: "20px" }}>
          <Col sm={6}>
            <Form.Control
              type="text"
              placeholder="Search by name, email, position, or department"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
          <Col sm={3}>
            <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All</option>
              <option value="Manager">Managers</option>
              <option value="Specialist">Specialist</option>
              <option value="Trainee">Trainee</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Table striped bordered hover responsive>
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
                  <Link to={`/update/${employee._id}`} className="btn btn-warning btn-sm mr-2">Edit</Link>
                  <Link to={`/view/${employee._id}`} className="btn btn-primary btn-sm mr-2">View</Link>
                  <Button variant="danger" onClick={() => handleDelete(employee._id)} size="sm">Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-center mt-3 mb-3">
          <Link to="/report" className="btn btn-primary">Generate Report</Link>
        </div>
        <Link to="/emplyee" className="btn btn-primary">Back</Link> <Link to="/add" className="btn btn-success">New Employee</Link>
        
      </div>
    </Dashboard>
  );
};

export default ViewAllEmployees;
