import React, { useState } from 'react';
import '../styles/AddEmployee.css';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    age: '',
    department: '',
    designation: '',
    dateOfJoining: '',
    contactNumber: '',
    status: 'Active',
    location: '',
    profilePicture: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileInput, setFileInput] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileChange = (e) => {
    setFileInput(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.employeeId) newErrors.employeeId = 'Employee ID is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (isNaN(formData.age) || formData.age < 18) newErrors.age = 'Age must be at least 18';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required';
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required';
    if (!formData.location) newErrors.location = 'Location is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create FormData object for file upload
      const employeeFormData = new FormData();
      
      // Append all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key !== 'profilePicture') {
          employeeFormData.append(key, formData[key]);
        }
      });
      
      // Append file if it exists
      if (fileInput) {
        employeeFormData.append('profilePicture', fileInput);
      }
      
      // Send the request to your backend API
      const response = await fetch('http://localhost:4000/employees', {
        method: 'POST',
        // Don't set Content-Type header when sending FormData
        // The browser will automatically set it including the boundary
        headers: {
          // Get the authorization token from localStorage or your auth context
          'auth': localStorage.getItem('token')
        },
        body: employeeFormData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add employee');
      }
      
      const data = await response.json();
      
      // Reset form on success
      alert('Employee added successfully!');
      setFormData({
        employeeId: '',
        name: '',
        email: '',
        age: '',
        department: '',
        designation: '',
        dateOfJoining: '',
        contactNumber: '',
        status: 'Active',
        location: '',
        profilePicture: ''
      });
      setFileInput(null);
      
      // Reset the file input
      const fileInputElement = document.querySelector('input[type="file"]');
      if (fileInputElement) {
        fileInputElement.value = '';
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      employeeId: '',
      name: '',
      email: '',
      age: '',
      department: '',
      designation: '',
      dateOfJoining: '',
      contactNumber: '',
      status: 'Active',
      location: '',
      profilePicture: ''
    });
    setErrors({});
    setFileInput(null);
    
    // Reset the file input
    const fileInputElement = document.querySelector('input[type="file"]');
    if (fileInputElement) {
      fileInputElement.value = '';
    }
  };

  return (
    <div className="employee-form-container">
      <div className="employee-form-card">
        <div className="form-header">
          <h2>Add New Employee</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-grid">
            {/* Employee ID */}
            <div className="form-group">
              <label className="form-label">
                Employee ID*
              </label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className={errors.employeeId ? 'form-input error' : 'form-input'}
              />
              {errors.employeeId && (
                <p className="error-message">{errors.employeeId}</p>
              )}
            </div>

            {/* Name */}
            <div className="form-group">
              <label className="form-label">
                Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'form-input error' : 'form-input'}
              />
              {errors.name && (
                <p className="error-message">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'form-input error' : 'form-input'}
              />
              {errors.email && (
                <p className="error-message">{errors.email}</p>
              )}
            </div>

            {/* Age */}
            <div className="form-group">
              <label className="form-label">
                Age*
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={errors.age ? 'form-input error' : 'form-input'}
              />
              {errors.age && (
                <p className="error-message">{errors.age}</p>
              )}
            </div>

            {/* Department */}
            <div className="form-group">
              <label className="form-label">
                Department*
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={errors.department ? 'form-input error' : 'form-input'}
              >
                <option value="">Select Department</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
              </select>
              {errors.department && (
                <p className="error-message">{errors.department}</p>
              )}
            </div>

            {/* Designation */}
            <div className="form-group">
              <label className="form-label">
                Designation*
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className={errors.designation ? 'form-input error' : 'form-input'}
              />
              {errors.designation && (
                <p className="error-message">{errors.designation}</p>
              )}
            </div>

            {/* Date of Joining */}
            <div className="form-group">
              <label className="form-label">
                Date of Joining*
              </label>
              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                className={errors.dateOfJoining ? 'form-input error' : 'form-input'}
              />
              {errors.dateOfJoining && (
                <p className="error-message">{errors.dateOfJoining}</p>
              )}
            </div>

            {/* Contact Number */}
            <div className="form-group">
              <label className="form-label">
                Contact Number*
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className={errors.contactNumber ? 'form-input error' : 'form-input'}
              />
              {errors.contactNumber && (
                <p className="error-message">{errors.contactNumber}</p>
              )}
            </div>

            {/* Status */}
            <div className="form-group">
              <label className="form-label">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label">
                Location*
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={errors.location ? 'form-input error' : 'form-input'}
              />
              {errors.location && (
                <p className="error-message">{errors.location}</p>
              )}
            </div>

            {/* Profile Picture */}
            <div className="form-group">
              <label className="form-label">
                Profile Picture
              </label>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="reset-button"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className={isSubmitting ? 'submit-button disabled' : 'submit-button'}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;