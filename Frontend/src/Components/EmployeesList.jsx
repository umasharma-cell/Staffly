import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";
import "../styles/EmployeesList.css";

const EmployeesList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [searchTerm, filterDepartment, filterStatus, employees]);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_ENDPOINTS.EMPLOYEES, {
        headers: {
          "auth": token
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterEmployees = () => {
    let filtered = [...employees];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Department filter
    if (filterDepartment !== "all") {
      filtered = filtered.filter(emp => emp.department === filterDepartment);
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(emp => emp.status === filterStatus);
    }

    setFilteredEmployees(filtered);
  };

  const getDepartments = () => {
    return [...new Set(employees.map(emp => emp.department))];
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_ENDPOINTS.EMPLOYEES}/${id}`, {
          method: 'DELETE',
          headers: {
            "auth": token
          }
        });

        if (response.ok) {
          setEmployees(employees.filter(emp => emp._id !== id));
          alert("Employee deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee");
      }
    }
  };

  return (
    <div className="employees-container">
      {/* Header */}
      <div className="employees-header">
        <button onClick={() => navigate("/dashboard")} className="back-btn">
          <span>←</span> Back to Dashboard
        </button>
        <h1 className="page-title">Employee Directory</h1>
        <button onClick={() => navigate("/add-employee")} className="add-new-btn">
          <span>+</span> Add New Employee
        </button>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Departments</option>
            {getDepartments().map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              ⊞
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <span>Showing {filteredEmployees.length} of {employees.length} employees</span>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading employees...</p>
        </div>
      )}

      {/* Employees Display */}
      {!loading && filteredEmployees.length > 0 && (
        <>
          {viewMode === 'grid' ? (
            // Grid View
            <div className="employees-grid">
              {filteredEmployees.map((employee) => (
                <div key={employee._id} className="employee-card">
                  <div className="card-header">
                    <img
                      src={employee.profilePicture || `https://ui-avatars.com/api/?name=${employee.name}&background=random`}
                      alt={employee.name}
                      className="employee-photo"
                    />
                    <span className={`status-badge ${employee.status.toLowerCase()}`}>
                      {employee.status}
                    </span>
                  </div>

                  <div className="card-body">
                    <h3 className="employee-name">{employee.name}</h3>
                    <p className="employee-id">ID: {employee.employeeId}</p>
                    <p className="employee-designation">{employee.designation}</p>

                    <div className="employee-info">
                      <div className="info-item">
                        <span className="info-icon">📧</span>
                        <span className="info-text">{employee.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">🏢</span>
                        <span className="info-text">{employee.department}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">📍</span>
                        <span className="info-text">{employee.location}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">📱</span>
                        <span className="info-text">{employee.contactNumber}</span>
                      </div>
                    </div>

                    <div className="card-footer">
                      <span className="join-date">
                        Joined: {new Date(employee.dateOfJoining).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button className="action-btn edit-btn" title="Edit">
                      ✏️
                    </button>
                    <button
                      className="action-btn delete-btn"
                      title="Delete"
                      onClick={() => handleDelete(employee._id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="employees-list-view">
              <table className="employees-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee._id}>
                      <td>
                        <img
                          src={employee.profilePicture || `https://ui-avatars.com/api/?name=${employee.name}&background=random`}
                          alt={employee.name}
                          className="table-photo"
                        />
                      </td>
                      <td>{employee.employeeId}</td>
                      <td className="employee-name-cell">{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>
                        <span className="dept-chip">{employee.department}</span>
                      </td>
                      <td>{employee.designation}</td>
                      <td>{employee.location}</td>
                      <td>
                        <span className={`status-badge ${employee.status.toLowerCase()}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="action-btn edit-btn" title="Edit">
                            ✏️
                          </button>
                          <button
                            className="action-btn delete-btn"
                            title="Delete"
                            onClick={() => handleDelete(employee._id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* No Employees */}
      {!loading && filteredEmployees.length === 0 && (
        <div className="no-employees">
          <div className="no-data-icon">👥</div>
          <h3>No Employees Found</h3>
          <p>{searchTerm || filterDepartment !== 'all' || filterStatus !== 'all'
            ? "Try adjusting your filters"
            : "Start by adding your first employee"}</p>
          {employees.length === 0 && (
            <button
              className="add-first-btn"
              onClick={() => navigate("/add-employee")}
            >
              Add First Employee
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeesList;