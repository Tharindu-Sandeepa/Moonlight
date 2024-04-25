import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard';

const AddEmployee = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    salary: 0,
    otrate: 0,
    ottotal: 0,
    tsalary: 0
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Simple validation example (add more as needed)
    if (!employee.firstName || !employee.lastName || !employee.email) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    axios.post('http://localhost:5002/api/employees/add', employee)
      .then(res => {
        console.log(res.data);
        setSuccessMessage('Employee added successfully.');
        navigate('/view-all'); // Navigate to home page after successful addition
      })
      .catch(err => {
        console.error(err);
        setErrorMessage('An error occurred while adding the employee.');
      });
  };

  return (
    <Dashboard title="Employee Management">
    <div className="container mt-5" style={{marginBottom: "25px"}}>
      <h2 className="mb-4">Add Employee</h2>
      <Card className="p-4">
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" value={employee.firstName} onChange={handleChange} placeholder="Enter first name" />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" value={employee.lastName} onChange={handleChange} placeholder="Enter last name" />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="position">
            <Form.Label>Position</Form.Label>
            <Form.Control type="text" name="position" value={employee.position} onChange={handleChange} placeholder="Enter position" />
          </Form.Group>
          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control type="text" name="department" value={employee.department} onChange={handleChange} placeholder="Enter Branch" />
          </Form.Group>
          <Button variant="primary" type="submit" style={{margin: "25px"}}>
            Add Employee
          </Button>
        </Form>
      </Card>
    </div></Dashboard>
  );
};

export default AddEmployee;