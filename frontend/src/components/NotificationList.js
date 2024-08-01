import React, { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';

const NotificationList = () => {
  const { notifications, markAsRead } = useContext(NotificationContext);

  return (
    <div className="notification-list">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id} style={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
            <p>{notification.message}</p>
            <p>{new Date(notification.createdAt).toLocaleString()}</p>
            {!notification.read && (
              <button onClick={() => markAsRead(notification._id)}>Mark as Read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;