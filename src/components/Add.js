import React, { useState } from 'react';
import axios from 'axios';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    age: '',
    phone: '',
    location: ''
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://zithara-task-api.onrender.com/add', formData);
      alert('Customer added successfully');
      setFormData({
        customer_name: '',
        age: '',
        phone: '',
        location: ''
      });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding customer', err);
      alert('Failed to add customer');
    }
  };

  return (
    <>
      <button style={{ backgroundColor: 'transparent', border: '1px solid #000', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => setShowForm(true)}>Add Customer</button>
      
      {showForm && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '9999', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#FDF5E6', padding: '50px', borderRadius: '8px', border: '1px solid #ccc', maxWidth: '300px' }}>
          <a style={{ fontSize: '25px', textAlign: 'center' }}>Please Add customer</a>

            <button style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => setShowForm(false)}>✖️</button>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <input type="text" name="customer_name" placeholder="Name" value={formData.customer_name} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }} />
              <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }} />
              <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }} />
              <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }} />
              <button type="submit" style={{ backgroundColor: '#FDF5E6', border: '1px solid #000', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}>Submit</button>
              <button type="button" onClick={() => setShowForm(false)} style={{ backgroundColor: '#FDF5E6', border: '1px solid #000', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCustomer;
