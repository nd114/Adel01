import React, { useContext } from 'react';
import AdminContext from '../context/AdminContext';

const UserList = () => {
  const { users, deleteUser } = useContext(AdminContext);

  return (
    <div className="user-list">
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
