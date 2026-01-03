import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    departments: [],
    recentEmployees: []
  });

  useEffect(() => {
    fetchDashboardData();
    updateGreeting();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const updateGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/employees", {
        headers: {
          "auth": token
        }
      });

      if (response.ok) {
        const employees = await response.json();
        setStats({
          totalEmployees: employees.length,
          activeEmployees: employees.filter(emp => emp.status === "Active").length,
          departments: [...new Set(employees.map(emp => emp.department))],
          recentEmployees: employees.slice(-5).reverse()
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="modern-dashboard">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-overlay"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Premium Header */}
        <header className="premium-header">
          <div className="header-left">
            <div className="brand">
              <div className="brand-icon">S</div>
              <div className="brand-text">
                <h1>Staffly</h1>
                <p>HR Excellence Platform</p>
              </div>
            </div>
          </div>

          <div className="header-center">
            <div className="live-clock">
              <div className="time">{currentTime.toLocaleTimeString()}</div>
              <div className="date">{currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</div>
            </div>
          </div>

          <div className="header-right">
            <div className="user-profile">
              <div className="notification-bell">
                <span className="bell-icon">🔔</span>
                <span className="notification-badge">3</span>
              </div>
              <div className="user-info">
                <img src="https://via.placeholder.com/40" alt="User" className="user-avatar" />
                <div className="user-details">
                  <span className="user-name">Admin User</span>
                  <span className="user-role">HR Manager</span>
                </div>
              </div>
              <button onClick={handleLogout} className="premium-logout">
                <span>⚡</span> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h2 className="greeting-text">
              {greeting}, <span className="highlight">Admin</span> 👋
            </h2>
            <p className="welcome-subtitle">
              Here's what's happening with your workforce today
            </p>
          </div>
          <div className="welcome-illustration">
            <div className="illustration-circle">
              <div className="inner-circle">
                <span className="employees-count">{stats.totalEmployees}</span>
                <span className="employees-label">Total Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Stats Cards */}
        <div className="premium-stats">
          <div className="stat-card glass-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper blue-gradient">
                <span className="stat-icon">👥</span>
              </div>
              <div className="stat-trend up">
                <span>↑ 12%</span>
              </div>
            </div>
            <div className="stat-body">
              <h3 className="stat-value">{stats.totalEmployees}</h3>
              <p className="stat-label">Total Employees</p>
            </div>
            <div className="stat-footer">
              <div className="mini-chart">
                <div className="bar" style={{height: '40%'}}></div>
                <div className="bar" style={{height: '60%'}}></div>
                <div className="bar" style={{height: '45%'}}></div>
                <div className="bar" style={{height: '80%'}}></div>
                <div className="bar" style={{height: '65%'}}></div>
              </div>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper green-gradient">
                <span className="stat-icon">✅</span>
              </div>
              <div className="stat-trend up">
                <span>↑ 8%</span>
              </div>
            </div>
            <div className="stat-body">
              <h3 className="stat-value">{stats.activeEmployees}</h3>
              <p className="stat-label">Active Now</p>
            </div>
            <div className="stat-footer">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{width: `${(stats.activeEmployees / stats.totalEmployees) * 100}%`}}
                ></div>
              </div>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper purple-gradient">
                <span className="stat-icon">🏢</span>
              </div>
              <div className="stat-trend">
                <span>→ 0%</span>
              </div>
            </div>
            <div className="stat-body">
              <h3 className="stat-value">{stats.departments.length}</h3>
              <p className="stat-label">Departments</p>
            </div>
            <div className="stat-footer">
              <div className="dept-dots">
                {stats.departments.slice(0, 4).map((_, i) => (
                  <span key={i} className="dept-dot"></span>
                ))}
              </div>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper orange-gradient">
                <span className="stat-icon">📈</span>
              </div>
              <div className="stat-trend down">
                <span>↓ 3%</span>
              </div>
            </div>
            <div className="stat-body">
              <h3 className="stat-value">{((stats.activeEmployees / stats.totalEmployees) * 100).toFixed(0)}%</h3>
              <p className="stat-label">Attendance Rate</p>
            </div>
            <div className="stat-footer">
              <div className="circular-progress">
                <svg viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#444"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeDasharray={`${(stats.activeEmployees / stats.totalEmployees) * 100}, 100`}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions with Hover Effects */}
        <div className="action-section">
          <h2 className="section-title">
            <span className="title-icon">⚡</span>
            Quick Actions
          </h2>
          <div className="action-cards">
            <div className="action-card" onClick={() => navigate("/add-employee")}>
              <div className="action-icon-wrapper add-gradient">
                <span className="action-icon">➕</span>
              </div>
              <div className="action-content">
                <h3>Add Employee</h3>
                <p>Onboard new team member</p>
              </div>
              <div className="action-arrow">→</div>
            </div>

            <div className="action-card" onClick={() => navigate("/employees")}>
              <div className="action-icon-wrapper view-gradient">
                <span className="action-icon">👁️</span>
              </div>
              <div className="action-content">
                <h3>View Directory</h3>
                <p>Browse all employees</p>
              </div>
              <div className="action-arrow">→</div>
            </div>

            <div className="action-card">
              <div className="action-icon-wrapper report-gradient">
                <span className="action-icon">📊</span>
              </div>
              <div className="action-content">
                <h3>Reports</h3>
                <p>Generate insights</p>
              </div>
              <div className="action-arrow">→</div>
            </div>

            <div className="action-card">
              <div className="action-icon-wrapper settings-gradient">
                <span className="action-icon">⚙️</span>
              </div>
              <div className="action-content">
                <h3>Settings</h3>
                <p>Configure system</p>
              </div>
              <div className="action-arrow">→</div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Team Overview */}
        <div className="bottom-grid">
          {/* Recent Employees */}
          <div className="recent-section glass-card">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-icon">🆕</span>
                Recent Additions
              </h2>
              <button className="see-all-btn">See All →</button>
            </div>
            <div className="recent-employees-list">
              {stats.recentEmployees.length > 0 ? (
                stats.recentEmployees.map((employee, index) => (
                  <div key={employee._id} className="employee-item" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="employee-avatar">
                      <img
                        src={employee.profilePicture || `https://ui-avatars.com/api/?name=${employee.name}&background=random`}
                        alt={employee.name}
                      />
                      <span className={`status-indicator ${employee.status === 'Active' ? 'active' : 'inactive'}`}></span>
                    </div>
                    <div className="employee-details">
                      <h4>{employee.name}</h4>
                      <p>{employee.designation}</p>
                    </div>
                    <div className="employee-meta">
                      <span className="department-badge">{employee.department}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-data">
                  <span className="no-data-icon">📭</span>
                  <p>No employees yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Department Distribution */}
          <div className="department-section glass-card">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-icon">🏢</span>
                Department Overview
              </h2>
            </div>
            <div className="department-grid">
              {stats.departments.map((dept, index) => (
                <div key={dept} className="department-tile" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="dept-icon">{
                    dept === 'IT' ? '💻' :
                    dept === 'HR' ? '👥' :
                    dept === 'Sales' ? '💼' :
                    dept === 'Marketing' ? '📢' : '🏢'
                  }</div>
                  <h4>{dept}</h4>
                  <p className="dept-count">
                    {stats.totalEmployees > 0 ?
                      `${Math.floor(Math.random() * 10) + 1} members` :
                      '0 members'
                    }
                  </p>
                </div>
              ))}
              {stats.departments.length === 0 && (
                <div className="no-departments">
                  <p>No departments yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;