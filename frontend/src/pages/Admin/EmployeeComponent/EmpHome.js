import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import logo from '../../../img/logo.jpeg';
import employeeImage from '../../../img/employee.jpg';
import reportImage from '../../../img/report.jpeg';

const EmpHome = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Welcome to Employee Management.!</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "25px" }}>
  <div style={{ width: "200px", height: "200px" }}>
    <Card.Img variant="top" src={logo} alt="Add Employee" style={{ width: "100%", height: "100%" }} />
  </div>
</div>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={employeeImage} alt="Add Employee" />
            <Card.Body>
              <Card.Title>Add Employee</Card.Title>
              <Card.Text>
                Click below to add a new employee.
              </Card.Text>
              <Link to="/add" className="btn btn-primary">Add Employee</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={employeeImage} alt="Add Employee" />
            <Card.Body>
              <Card.Title>View All Employees</Card.Title>
              <Card.Text>
                Click below to viewall employee.
              </Card.Text>
              <Link to="/view-all" className="btn btn-primary">View all Employees</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={reportImage} alt="Generate Report" />
            <Card.Body>
              <Card.Title>Generate Report</Card.Title>
              <Card.Text>
                Generate reports for employee data.
              </Card.Text>
              <Link to="/report" className="btn btn-primary">Generate Report</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EmpHome;