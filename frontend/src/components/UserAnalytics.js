import React, { useContext } from 'react';
import AnalyticsContext from '../context/AnalyticsContext';

const UserAnalytics = () => {
  const { userAnalytics } = useContext(AnalyticsContext);

  return (
    <div className="user-analytics">
      <h2>User Analytics</h2>
      <p>Total Users: {userAnalytics.totalUsers}</p>
      <p>Active Users: {userAnalytics.activeUsers}</p>
      <p>New Users (Last 30 Days): {userAnalytics.newUsers}</p>
    </div>
  );
};

export default UserAnalytics;
