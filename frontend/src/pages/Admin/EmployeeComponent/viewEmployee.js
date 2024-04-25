import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import employeeImage from '../../../img/profile.png';

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [newSalary, setNewSalary] = useState('');
  const [newOtrate, setNewOtrate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/employees/${id}`)
      .then(res => setEmployee(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSalaryChange = e => {
    setNewSalary(e.target.value);
  };

  const handleOtrateChange = e => {
    setNewOtrate(e.target.value);
  };

  const calculateOtTotal = () => {
    const otrate = parseFloat(newOtrate);
    const salary = parseFloat(newSalary);
    return isNaN(otrate) || isNaN(salary) ? 0 : (otrate * salary)/100;
  };

  const calculateTsalary = () => {
    const ottotal = calculateOtTotal();
    const salary = parseFloat(newSalary);
    return isNaN(ottotal) || isNaN(salary) ? 0 : ottotal + salary;
  };

  const handleSalaryUpdate = () => {
    if (!newSalary || isNaN(newSalary)) {
      setError('Please enter a valid salary amount.');
      return;
    }

    const ottotal = calculateOtTotal();
    const tsalary = calculateTsalary();

    axios.put(`http://localhost:5000/api/employees/update/${id}`, { salary: parseFloat(newSalary), otrate: parseFloat(newOtrate), ottotal, tsalary })
      .then(res => {
        setEmployee(prevEmployee => ({ ...prevEmployee, salary: parseFloat(newSalary), otrate: parseFloat(newOtrate), ottotal, tsalary }));
        setNewSalary('');
        setNewOtrate('');
        setError('');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h2>Employee Details</h2>
      <Card className="mt-3">
        <Card.Img variant="top" src={employeeImage} alt="Employee" style={{ height: '300px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{employee.firstName} {employee.lastName}</Card.Title>
          <Card.Text><strong>Email:</strong> {employee.email}</Card.Text>
          <Card.Text><strong>Position:</strong> {employee.position}</Card.Text>
          <Card.Text><strong>Department:</strong> {employee.department}</Card.Text>
          <Card.Text><strong> Basic Salary (Rs.):</strong> {employee.salary}</Card.Text>
          <Card.Text><strong>OT Rate (%):</strong> {employee.otrate}</Card.Text>
          <Card.Text><strong>OT Total (Rs.):</strong> {employee.ottotal}</Card.Text>
          <Card.Text><strong>Total Salary (Rs.):</strong> {employee.tsalary}</Card.Text>
          <Form.Group controlId="newSalary">
            <Form.Control
              type="number"
              placeholder="New Salary"
              value={newSalary}
              onChange={handleSalaryChange}
              style={{ marginTop: '10px' }}
            />
          </Form.Group>
          <Form.Group controlId="newOtrate">
            <Form.Control
              type="number"
              placeholder="New Overtime Rate"
              value={newOtrate}
              onChange={handleOtrateChange}
              style={{ marginTop: '10px' }}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSalaryUpdate} style={{ marginTop: '10px' }}>Update Salary</Button>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewEmployee;