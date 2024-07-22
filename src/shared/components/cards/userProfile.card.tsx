import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const UserProfile = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops... {error.message}</div>;

  return (
    <div className="text-center">
      {user ? (
        <div className="flex flex-col items-center">
          <Avatar 
            src={user.picture ?? ''} 
            alt={user.name ?? 'User Avatar'} 
            className="m-auto w-24 h-24"
          />
          <Typography variant="h5" className="mt-4">{user.nickname ?? 'Anonymous'}</Typography>
          <Typography variant="body1" className="mt-2">{user.email ?? 'No email provided'}</Typography>
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
};

export default UserProfile;
