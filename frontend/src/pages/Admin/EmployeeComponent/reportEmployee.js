import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import Dashboard from '../Dashboard';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../img/logo.jpeg';

const ReportEmployee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5002/api/employees/')
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Get current date and time
    const currentDate = new Date().toLocaleString();

    // Add a title with the current date and time
    doc.text(`   Employee Details Report                   Generated: ${currentDate}`, 10, 10);

    // Define table columns
    const columns = [
      'Employee ID',
      'First Name',
      'Email',
      'Position',
      'Basic Salary',
      'OT rate',
      'Total Salary'
    ];

    // Define table rows
    const rows = employees.map(employee => [
      employee._id,
      employee.firstName,
      employee.email,
      employee.position,
      employee.salary,
      employee.otrate,
      employee.tsalary
    ]);

    // Auto-generate the table in the PDF
    doc.autoTable({
      head: [columns],
      body: rows
    });

    // Add logo at the bottom of the report
    const imgWidth = 60;
    const imgHeight = 60;
    const bottomMargin = 120;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const imgX = (pageWidth - imgWidth) / 2;
    const imgY = pageHeight - imgHeight - bottomMargin;
    doc.addImage(logo, 'JPEG', imgX, imgY, imgWidth, imgHeight);

    // Save the PDF
    doc.save('All employee_report.pdf');
  };

  return (
    <Dashboard title="Employee Management">
      <div style={{ height: "1100px" }}>
        <h2>All Employee Details Report</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Basic Salary</th>
              <th>OT rate</th>
              <th>Total Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.salary}</td>
                <td>{employee.otrate}</td>
                <td>{employee.tsalary}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-center mt-3 mb-3"> 
          <Button onClick={handleDownloadPDF}>Download PDF</Button>
        </div>
        <Link to="/view-all" className="btn btn-primary" style={{ backgroundColor: '#007bff' }}>Back</Link> 
      </div>
    </Dashboard>
  );
};

export default ReportEmployee;
