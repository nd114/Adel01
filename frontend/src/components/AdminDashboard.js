import React from 'react';
import UserList from './UserList';
import ServiceList from './ServiceList';
import UserAnalytics from './UserAnalytics';
import ServiceAnalytics from './ServiceAnalytics';
import BookingAnalytics from './BookingAnalytics';

const AdminDashboard = () => {
  return (
    <div className="admi-ndashboard">
      <h2>Admin Dashboard</h2>
      <UserList />
      <ServiceList />
      <UserAnalytics />
      <ServiceAnalytics />
      <BookingAnalytics />
    </div>
  );
};

export default AdminDashboard;
