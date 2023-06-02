import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import logo from '../components/websitelogo.png'


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

  heading: {
    fontSize: '4rem', // Adjust the size as per your preference
    color: 'black', // Adjust the color as per your preference
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Brush Script MT',
    animation: `$fadeIn 1s ${theme.transitions.easing.easeInOut}`,
    marginTop:"100px",
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },

  overrides: {
        color:"white",
        backgroundColor:"black"
    },
  
  

  }));


function Navbar() {

  const styles = useSpring({
    from: { opacity: 0, transform: 'scale(0.5)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 1000 },
  });


  const classes = useStyles();


  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
  
    // Redirect to the login page
    window.location.href = '/'; 
  };
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.overrides}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
          <img src={logo} className="App-logo" alt="logo" style={{height:"35px", 
          width:"35px",overflow: 'hidden',  borderRadius: 150 / 2 ,marginTop:"5px"}} />
          </Typography>

          <IconButton
            color="inherit"
            aria-label="getalluser"
            component={Link}
            to="/getalluser"
            variant="h1" style={{ flexGrow: 0, textAlign: 'center' }}
          >
        All User
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="userProfilepage"
            component={Link}
            to="/userProfilepage"
            variant="h1" style={{ flexGrow: 0, textAlign: 'center' }}
          >
        Your Profile
          </IconButton>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="logout"
            style={{ color:"#EF6667" }}
            onClick={handleLogout}
          >
            <ExitToAppIcon />
          </IconButton>

        

        </Toolbar>
      </AppBar>
      <Typography variant="h1" component={animated.h1} style={styles} className={classes.heading}>
      Welcome to Home Page
    </Typography>
    </div>

  

  );
}
export default Navbar;
