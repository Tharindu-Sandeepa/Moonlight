import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SupplierForm({ supplier, onCancel, onUpdate }) {
  const [formData, setFormData] = useState({
    supName: supplier.supName,
    Items: supplier.Items.join(', '),
    description: supplier.description,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSupplierData = {
      _id: supplier._id,
      supName: formData.supName,
      Items: formData.Items.split(',').map(Items => Items.trim()),
      description: formData.description,
    };
  
    axios.post('http://localhost:5002/api/updatesupplier', updatedSupplierData)
      .then(response => {
        // Handle successful update
        console.log(response.data);
        onUpdate(updatedSupplierData); // Notify the parent component about the update with the updated data
        // Display toast notification
        toast.success('Supplier updated successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(error => {
        console.error("Error updating supplier:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="supName" style={styles.label}>Supplier Name:</label>
          <input
            type="text"
            id="supName"
            name="supName"
            value={formData.supName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="Items" style={styles.label}>Items:</label>
          <input
            type="text"
            id="Items"
            name="Items"
            value={formData.Items}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
        </div>
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>Update Supplier</button>
          <button type="button" onClick={onCancel} style={styles.button}>Cancel</button>
        </div>
      </form>
    </div>

    
  );
}

const styles = {
  form: {
    maxWidth: '1700px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    minHeight: '100px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
  },
};

export default SupplierForm;
