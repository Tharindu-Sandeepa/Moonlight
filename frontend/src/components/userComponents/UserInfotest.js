import React from 'react';
import { useAuth } from '../../Auth/AuthContext';

const UserInfo = () => {
  // Using the useAuth hook to access user data
  const { user } = useAuth();

  return (
    <div>
      <h2>User Details</h2>
      {user ? ( // Check if user data exists before rendering
        <div>
            <p>UserID: {user._id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Name: {user.name}</p>
          <p>TP: {user.tp}</p>
          <p>Type: {user.type}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserInfo;
