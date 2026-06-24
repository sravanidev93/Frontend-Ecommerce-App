import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useAuth } from '../firebase/Auth';
import { useNavigate } from 'react-router-dom';

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  // console.log(user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfile = () => {
    // console.log(user ? user.displayName : "user");
    navigate("/profile");
  };

  const handleClose=()=>{
        setAnchorEl(null);

  }

  const handleAccount = () => {
    console.log(user ? user.email : "user");
    navigate("/account");
  };

  const handleSignOut = async () => {
    console.log(user ? user.displayName : "user");

    await logOut();
  }

  return (
    <div>
      <Button
        variant='outlined'
        color='inherit'
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >{user ?`Hi,${ user.displayName}` :'Hi,user'}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleAccount}>My account</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
