import React, { useState } from 'react';
import { IconButton, TextField ,Typography} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const UpdateUserForm = ({ user, updateUser }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="name" label="Name" value={updatedUser.name} onChange={handleChange} sx={{ margin: '16px' }} />
      <TextField name="email" label="Email" value={updatedUser.email} onChange={handleChange} sx={{ margin: '16px' }} />
      <TextField name="tp" label="Telephone" value={updatedUser.tp} onChange={handleChange} sx={{ margin: '16px' }} />
      <TextField name="username" label="Username" value={updatedUser.username} onChange={handleChange} sx={{ margin: '16px' }} />
      <TextField name="password" label="Password" value={updatedUser.password} onChange={handleChange} sx={{ margin: '16px' }} />
      <IconButton 
  type="submit" 
  aria-label="update" 
  onClick={handleSubmit} 
  sx={{
    margin: '16px',
    backgroundColor: '#3E7DF9', // Light blue background color
    borderRadius: '10px', // Rounded corners
    padding: '10px', // Padding around the button
    '&:hover': {
      backgroundColor: '#81D4FA', // Light blue background color on hover
    },
  }}
>
  <SaveIcon />
  <Typography 
    variant="button" 
    sx={{
      color:'white',
      marginLeft: '4px', // Spacing between the icon and text
      fontWeight: 'bold', // Bold font weight for text
    }}
  >
    Save
  </Typography>
</IconButton>

    </form>
  );
};

export default UpdateUserForm;
