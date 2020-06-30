import React, { /* useState, useContext */ } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
// import MenuIcon from '@material-ui/icons/Menu';
//import { Link } from 'react-router-dom';
import LinkHome from '@material-ui/core/Link';
// import Drawer from '@material-ui/core/Drawer';
//import List from '@material-ui/core/List';
//import Divider from '@material-ui/core/Divider';
//import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
//import ListItemText from '@material-ui/core/ListItemText';
// import HomeIcon from '@material-ui/icons/Home';
//import InfoIcon from '@material-ui/icons/Info';
//import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
//import primary from '@material-ui/core/colors/blue';
//import secondary from '@material-ui/core/colors/deepPurple';
//import { Switch, FormControlLabel } from '@material-ui/core';

/*
const themeObject = {
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: primary,
    secondary: secondary,
    // primary: { main: '#053f5b'},
    //secondary: { main: '#fe3c6f'},
    type: 'light'
    
  }
}

// Dark mode magic
const useDarkMode = () => {
  const [theme, setTheme] = useState(themeObject);

  const { palette: {  type }} = theme;
  const toggleDarkMode = () => {
    const updatedTheme = {
      theme,
      palette: {
        ...theme.palette,
        type: type === 'light' ? 'dark' : 'light'
      }
    }
    setTheme(updatedTheme);
  }
  return [theme, toggleDarkMode]
}*/


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  aboutLink: {
    marginLeft: 20
  }
};

function MyAppBar(props) {
  const { classes } = props;

  


  return (
    <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {/*<IconButton className={classes.menuButton} onClick={handleMenu} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Icon>assignmentturnedin</Icon>
          <Typography variant="h6" color="inherit" className={classes.grow}>
              <LinkHome href="/" color="inherit" underline="none">
                Course-Advisor
              </LinkHome>
              <LinkHome href="/about" color="inherit" underline="none" className={classes.aboutLink}>
                About
              </LinkHome>
            </Typography>

          </Toolbar>
        </AppBar>

    </div>
  );
}

MyAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyAppBar);