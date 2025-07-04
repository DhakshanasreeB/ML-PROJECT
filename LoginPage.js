import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Please log in to continue</p>

        <form className="login-form">
          <input type="email" placeholder="Email" className="login-input" required />
          <input type="password" placeholder="Password" className="login-input" required />

          <button type="submit" className="login-button">Login</button>
        </form>

        <p className="signup-link">Don't have an account? <a href="/SignupPage">Sign up</a></p>
      </div>
    </div>
    
  );
};

export default LoginPage;
