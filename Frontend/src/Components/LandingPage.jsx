import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="landing-container">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-bg"></div>
        <div className="floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>
        </div>
        <div className="grid-overlay"></div>
      </div>

      {/* Navigation Header */}
      <header className={`modern-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo-section">
            <div className="logo-icon">
              <span>S</span>
            </div>
            <h1 className="logo-text">Staffly</h1>
            <span className="logo-tagline">HR Excellence</span>
          </div>

          <nav className="nav-menu">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <div className="auth-buttons">
            <Link to="/login" className="btn-login">Sign In</Link>
            <Link to="/signup" className="btn-get-started">
              Get Started
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="badge-container">
              <span className="badge">New</span>
              <span className="badge-text">AI-Powered HR Management</span>
            </div>

            <h1 className="hero-title">
              <span className="gradient-text">Transform Your</span>
              <br />
              <span className="highlight">Workforce Management</span>
              <br />
              <span className="gradient-text">Experience</span>
            </h1>

            <p className="hero-description">
              Staffly revolutionizes HR management with intelligent automation,
              seamless employee experiences, and data-driven insights.
              Manage your global workforce with unprecedented efficiency.
            </p>

            <div className="hero-stats">
              <div className="stat">
                <h3>10K+</h3>
                <p>Active Companies</p>
              </div>
              <div className="stat">
                <h3>2M+</h3>
                <p>Employees Managed</p>
              </div>
              <div className="stat">
                <h3>99.9%</h3>
                <p>Uptime</p>
              </div>
            </div>

            <div className="hero-cta">
              <Link to="/signup" className="primary-btn">
                <span>Start Free Trial</span>
                <div className="btn-glow"></div>
              </Link>
              <Link to="/login" className="secondary-btn">
                <span className="play-icon">▶</span>
                Watch Demo
              </Link>
            </div>

            <div className="trust-section">
              <p>Trusted by industry leaders</p>
              <div className="company-logos">
                <span className="company">Microsoft</span>
                <span className="company">Google</span>
                <span className="company">Amazon</span>
                <span className="company">Meta</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-container">
              <div className="dashboard-preview">
                <div className="preview-header">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="preview-content">
                  <div className="preview-sidebar">
                    <div className="sidebar-item"></div>
                    <div className="sidebar-item active"></div>
                    <div className="sidebar-item"></div>
                    <div className="sidebar-item"></div>
                  </div>
                  <div className="preview-main">
                    <div className="stat-cards">
                      <div className="mini-card">
                        <div className="card-icon"></div>
                        <div className="card-text"></div>
                      </div>
                      <div className="mini-card">
                        <div className="card-icon"></div>
                        <div className="card-text"></div>
                      </div>
                      <div className="mini-card">
                        <div className="card-icon"></div>
                        <div className="card-text"></div>
                      </div>
                    </div>
                    <div className="chart-preview">
                      <div className="bar" style={{height: '60%'}}></div>
                      <div className="bar" style={{height: '80%'}}></div>
                      <div className="bar" style={{height: '45%'}}></div>
                      <div className="bar" style={{height: '90%'}}></div>
                      <div className="bar" style={{height: '70%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="floating-cards">
                <div className="float-card card-1">
                  <span className="card-emoji">📊</span>
                  <p>Real-time Analytics</p>
                </div>
                <div className="float-card card-2">
                  <span className="card-emoji">🚀</span>
                  <p>Fast Onboarding</p>
                </div>
                <div className="float-card card-3">
                  <span className="card-emoji">🔒</span>
                  <p>Bank-level Security</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features-container">
          <h2 className="section-title">Why Choose Staffly?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Process HR tasks 10x faster with intelligent automation</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Data-Driven</h3>
              <p>Make informed decisions with powerful analytics</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Global Ready</h3>
              <p>Support for multiple currencies and languages</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure & Compliant</h3>
              <p>GDPR, SOC2, and ISO certified platform</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;