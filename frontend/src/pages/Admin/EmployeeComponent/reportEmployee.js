import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const ReportEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const componentRef = React.useRef();

  useEffect(() => {
    axios.get('http://localhost:5002/api/employees/')
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{height: "680px"}}>
      <h2>All Employees</h2>
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
          </tr>
        </thead>
        <tbody ref={componentRef}>
          {employees.map(employee => (
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
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => window.print()}>Download as PDF</Button>
    </div>
  );
};

export default ReportEmployee;