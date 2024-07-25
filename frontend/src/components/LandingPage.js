import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Adel</h1>
      <p>Your one-stop solution for business ratings and reviews.</p>
      <Link to="/register" className="btn">Get Started</Link>
    </div>
  );
}

export default LandingPage;
