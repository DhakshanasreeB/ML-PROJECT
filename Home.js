import React, { useState, useRef } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/48');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 2000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-text" aria-label="Budget Optimizer Logo">💰 Budget Optimizer</div>
        <div className="nav-actions">
          <Button color="inherit" onClick={() => navigate('/login')} aria-label="Login Button">Login</Button>
          <Button color="inherit" onClick={() => navigate('/SignupPage')} aria-label="Signup Button">Signup</Button>

          {/* Profile Image */}
          <div
            className="profile-wrapper"
            tabIndex={0}
            role="button"
            aria-label="Upload profile image"
            onClick={() => fileInputRef.current.click()}
            onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current.click()}
          >
            <img src={profileImage} alt="Profile" className="profile-icon" />
          </div>

          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="home-container" role="main">
        <header className="header">
          <h1 tabIndex={-1}>Welcome back, User 👋</h1>
          <p className="subtitle">Here's a snapshot of your budget today.</p>

          <p className="title">💰 Budget Optimizer</p>
          <p className="description">
            Your AI-powered financial planner to track, predict, and optimize your budgets.
          </p>
        </header>

        <section className="budget-summary card" aria-label="Budget Overview Summary">
          <h2>📊 Budget Overview</h2>
          <p className="budget-text">Spent ₹12,000 of ₹20,000 this month</p>
          <div className="progress-bar" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-bar-fill" style={{ width: '60%' }} />
          </div>
          <p className="tip-text">💡 You are on track! Keep it up or check insights for tips.</p>
        </section>

        <section className="ai-tips card" aria-label="AI Smart Tips">
          <h2>💡 Smart Tips</h2>
          <ul className="tips-list">
            <li>You're spending 15% more on dining out than last month.</li>
            <li>Try reducing your subscription plans to save ₹500/month.</li>
          </ul>
          <Button variant="text" onClick={() => navigate('/dashboard')} className="insights-button" aria-label="View all insights">
            View all insights
          </Button>
        </section>

        {/* Action Cards */}
        <section className="action-cards" aria-label="Budget Action Cards">
          <div className="card action-card" tabIndex={0} aria-describedby="desc-track-expenses">
            <h2>📝 Track Expenses</h2>
            <p id="desc-track-expenses">Analyze your monthly expenses quickly and easily</p>
            <Button variant="contained" onClick={() => navigate('/add-expenses')}>
              Analyze Your Expenses
            </Button>
          </div>

          <div className="card action-card" tabIndex={0} aria-describedby="desc-budget-dashboard">
            <h2>📊 Budget Dashboard</h2>
            <p id="desc-budget-dashboard">AI-driven analysis of your spending habits and smart tips to save more.</p>
            <Button variant="contained" onClick={() => navigate('/dashboard')}>
              Show Dashboard
            </Button>
          </div>

          <div className="card action-card" tabIndex={0} aria-describedby="desc-spending-forecast">
            <h2>📈 Spending Forecast</h2>
            <p id="desc-spending-forecast">Predict your next month’s expenses using intelligent ML models.</p>
            <Button variant="contained" onClick={() => navigate('/predict')}>
              Predict Now
            </Button>
          </div>
        </section>

        <div className="get-started-container">
          <Button
            variant="contained"
            className="get-started-button"
            disabled={loading}
            onClick={handleGetStarted}
            aria-label="Get Started Button"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Started'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
