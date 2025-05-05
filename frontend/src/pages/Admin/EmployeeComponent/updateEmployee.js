import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import Dashboard from '../Dashboard';

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    salary: 0,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5002/api/employees/${id}`)
      .then(res => setEmployee(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to fetch employee data.');
      });
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { firstName, lastName, email, position, department, salary } = employee;

    // Validate required fields
    if (!firstName || !lastName || !email || !position || !department || !salary) {
      setError('All fields are required.');
      return;
    }

    axios.put(`http://localhost:5002/api/employees/update/${id}`, employee)
      .then(res => {
        setSuccessMessage('Employee updated successfully!');
        setError('');
        navigate('/view-all'); // Navigate to view all employees page
      })
      .catch(err => {
        console.error(err);
        setError('An error occurred while updating the employee.');
      });
  };

  return (
    <Dashboard title="Employee Management">
      <div className="container mt-5">
        <h2>Update Employee</h2>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="firstName">
                <Form.Label htmlFor="firstName">First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={employee.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={employee.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  id="email"
                  value={employee.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group controlId="position">
                <Form.Label htmlFor="position">Position</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  id="position"
                  value={employee.position}
                  onChange={handleChange}
                  placeholder="Enter position"
                />
              </Form.Group>
              <Form.Group controlId="department">
                <Form.Label htmlFor="department">Department</Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  id="department"
                  value={employee.department}
                  onChange={handleChange}
                  placeholder="Enter department"
                />
              </Form.Group>
              <Form.Group controlId="salary">
                <Form.Label htmlFor="salary">Salary</Form.Label>
                <Form.Control
                  type="number"
                  name="salary"
                  id="salary"
                  value={employee.salary}
                  onChange={handleChange}
                  placeholder="Enter salary"
                />
              </Form.Group>
              <Button variant="primary" onClick={() => navigate('/view-all')}>Back</Button>
              <Button variant="primary" type="submit" style={{ margin: "25px" }}>Update Employee</Button>
            </Form>
          </Card.Body>
        </Card>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
      </div>
    </Dashboard>
  );
};

export default UpdateEmployee;
