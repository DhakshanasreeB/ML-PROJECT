import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Home';
import LoginPage from './LoginPage'; // Make sure this file exists
import SignupPage from './SignupPage'; 
import AddExpenses from'./AddExpenses';

import Dashboard from './Dashboard';
import Predict from './Predict';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/SignupPage" element={<SignupPage />} />
      <Route path="/add-expenses" element={<AddExpenses />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/predict" element={<Predict />} />

      

    </Routes>
  );
}

export default App;
