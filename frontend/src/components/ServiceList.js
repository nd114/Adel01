//Components for listing, creating, updating, and deleting services with createservice.js

import React, { useContext } from 'react';
import ServiceContext from '../context/ServiceContext';

const ServiceList = () => {
  const { services, deleteService } = useContext(ServiceContext);

  return (
    <div className="service-list">
      <h2>Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <p>Category: {service.category}</p>
            <p>Location: {service.location}</p>
            <p>Price: ${service.price}</p>
            <button onClick={() => deleteService(service._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
