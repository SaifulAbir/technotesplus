import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom'
import Button from "../Controls/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Header(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = (history) => {
    setAnchorEl(null);
    localStorage.removeItem("access_token");
    history.push("/");
  };

  const profile = (history) => {
    setAnchorEl(null);
    history.push("/profile");
  };

  const changePassword = (history) => {
    setAnchorEl(null);
    history.push("/change-password");
  };



  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              <Link to="/notes" style={{ textDecoration: 'none', color: 'unset' }}>
                Tech Notes Plus
              </Link>
            </Typography>

            <div>
              <Link to="/shared-note" style={{ textDecoration: 'none', color: 'unset' }}>
                <Button variant="contained" color="secondary" size="medium" text='Shared Note' />
              </Link>
              <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
              >
                <MenuItem onClick={() => profile(props.history)}>Profile</MenuItem>
                <MenuItem onClick={() => changePassword(props.history)}>Change Password</MenuItem>
                <MenuItem onClick={() => signOut(props.history)}>
                  <Typography
                      className={classes.profileMenuLink}
                      color="primary"
                  >
                    Sign Out
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
  );
}
