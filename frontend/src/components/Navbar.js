import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">Adel</Link>
        <div className="navbar-nav">
          <Link to="/register" className="nav-item">Register</Link>
          <Link to="/login" className="nav-item">Login</Link>
          <Link to="/dashboard" className="nav-item">Dashboard</Link>
          <Link to="/profile" className="nav-item">Profile</Link>
          <Link to="/tasks-list" className="nav-item">Tasks</Link>
          <Link to="/top-businesses" className="nav-item">Top Businesses</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
