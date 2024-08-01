import React, { useContext } from 'react';
import AnalyticsContext from '../context/AnalyticsContext';

const ServiceAnalytics = () => {
  const { serviceAnalytics } = useContext(AnalyticsContext);

  return (
    <div className="service-analytics">
      <h2>Service Analytics</h2>
      <p>Total Services: {serviceAnalytics.totalServices}</p>
      <p>Active Services: {serviceAnalytics.activeServices}</p>
      <p>New Services (Last 30 Days): {serviceAnalytics.newServices}</p>
    </div>
  );
};

export default ServiceAnalytics;
