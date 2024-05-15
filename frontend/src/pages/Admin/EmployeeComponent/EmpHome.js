import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import logo from '../../../img/logo.jpeg';
import employeeImage from '../../../img/viewemp.jpg';
import newemployeeImage from '../../../img/employee.jpg';
import reportImage from '../../../img/report.jpeg';
import Dashboard from '../Dashboard';

const EmpHome = () => {
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5002/api/employees/')
      .then(res => setEmployeeCount(res.data.length))
      .catch(err => console.error(err));
  }, []);

  return (
    <Dashboard title="Employee Management">
      <div className="container mt-5">
        <h1 className="text-center mb-4">Welcome to Employee Management!</h1>
        <h3 className="text-center mb-4">Total Employees: {employeeCount}</h3>
        <Row className="justify-content-center align-items-center mb-5">
          <Col xs={12} sm={6} md={10} className="text-center">
            <img src={logo} alt="Company Logo" className="img-fluid mb-3" style={{ maxHeight: '200px' }} />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={4} className="d-flex">
            <Card className="mb-4 flex-fill">
              <Card.Img variant="top" src={newemployeeImage} alt="Add Employee" />
              <Card.Body className="text-center d-flex flex-column">
                <Card.Title>Add Employee</Card.Title>
                <Card.Text>
                  Click below to add a new employee.
                </Card.Text>
                <Link to="/add" className="btn btn-primary mt-auto">Add Employee</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex">
            <Card className="mb-4 flex-fill">
              <Card.Img variant="top" src={employeeImage} alt="View All Employees" />
              <Card.Body className="text-center d-flex flex-column">
                <Card.Title>View All Employees</Card.Title>
                <Card.Text>
                  Click below to view all employees.
                </Card.Text>
                <Link to="/view-all" className="btn btn-primary mt-auto">View all Employees</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex">
            <Card className="mb-4 flex-fill">
              <Card.Img variant="top" src={reportImage} alt="Generate Report" />
              <Card.Body className="text-center d-flex flex-column">
                <Card.Title>Generate Report</Card.Title>
                <Card.Text>
                  Generate reports for employee data.
                </Card.Text>
                <Link to="/report" className="btn btn-primary mt-auto">Generate Report</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Dashboard>
  );
};

export default EmpHome;
