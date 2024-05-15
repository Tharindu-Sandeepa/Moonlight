import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import Link
import axios from 'axios';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../img/logo.jpeg';
import employeeImage from '../../../img/profile.png';
import Dashboard from '../Dashboard';

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [newSalary, setNewSalary] = useState('');
  const [newOtrate, setNewOtrate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5002/api/employees/${id}`)
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

    axios.put(`http://localhost:5002/api/employees/update/${id}`, { salary: parseFloat(newSalary), otrate: parseFloat(newOtrate), ottotal, tsalary })
      .then(res => {
        setEmployee(prevEmployee => ({ ...prevEmployee, salary: parseFloat(newSalary), otrate: parseFloat(newOtrate), ottotal, tsalary }));
        setNewSalary('');
        setNewOtrate('');
        setError('');
      })
      .catch(err => console.error(err));
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    
    // Set text styles
    doc.setFont('helvetica');
    doc.setFontSize(12);
    
    // Get current date and time
    const currentDate = new Date().toLocaleString();
    
    // Add title with employee name and current date
    const title = `    Employee Report: ${employee.firstName} ${employee.lastName}                                      Generated: ${currentDate}`;
    doc.text(title, 10, 15);
    
    // Add employee details table
    doc.autoTable({
      startY: 18, // Adjust start Y position
      head: [['Details', 'Value']],
      body: [
        ['Employee ID', employee._id],
        ['First Name', employee.firstName],
        ['Last Name', employee.lastName],
        ['Email', employee.email],
        ['Position', employee.position],
        ['Department', employee.department],
        ['Basic Salary', `Rs. ${employee.salary}`],
        ['OT Rate', `${employee.otrate}%`],
        ['OT Total', `Rs. ${employee.ottotal}`],
        ['Total Salary', `Rs. ${employee.tsalary}`],
      ],
      headStyles: {
        fillColor: [41, 128, 185], // Blue background color for header
        textColor: [255], // White text color for header
        fontStyle: 'bold',
        halign: 'center',
        valign: 'middle'
      },
      bodyStyles: {
        halign: 'center',
        valign: 'middle'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245] // Light gray background color for alternating rows
      }
    });
    
    // Add logo image at the bottom
    const imgWidth = 50;
    const imgHeight = 50;
    const bottomMargin = 140;
    const pageHeight = doc.internal.pageSize.height;
    const imgX = (doc.internal.pageSize.width - imgWidth) / 2;
    const imgY = pageHeight - imgHeight - bottomMargin;
    doc.addImage(logo, 'JPEG', imgX, imgY, imgWidth, imgHeight);
    
    doc.save(`${employee.firstName} ${employee.lastName}_report.pdf`);
};

  return (
    <Dashboard title="Employee Management">
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
            <Button variant="primary" onClick={handleSalaryUpdate} style={{ marginTop: '10px', marginRight: '10px' }}>Update Salary</Button>
            <Button variant="success" onClick={handleGenerateReport} style={{ marginTop: '10px' }}>Generate Report</Button>
            <Link to="/view-all"> <Button variant="primary" style={{ marginBottom: '-10px' }}>View All Employees</Button> </Link>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Card.Body>
        </Card>
      </div>
    </Dashboard>
  );
};

export default ViewEmployee;
