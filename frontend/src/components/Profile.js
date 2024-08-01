import React, { useContext, useEffect } from 'react';
import ProfileContext from '../context/ProfileContext';

const Profile = () => {
  const { profile, updateProfile } = useContext(ProfileContext);

  useEffect(() => {
    // Any additional logic if needed when the component mounts
  }, []);

  return (
    <div className="profile">
      <h2>Profile</h2>
      {profile ? (
        <div>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
          <p>User Type: {profile.userType}</p>
          {profile.userType === 'business' && (
            <>
              <p>Business Bio: {profile.businessBio}</p>
              <p>Business Fields: {profile.businessFields.join(', ')}</p>
            </>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
