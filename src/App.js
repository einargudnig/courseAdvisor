import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import LinkHome from '@material-ui/core/Link';
// import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import ErrorModal from './Components/Error/ErrorModal';
import Course from './Components/Course/Course';
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import config from './config';

import { Switch, FormControlLabel } from '@material-ui/core';

try {
  firebase.initializeApp(config);
} catch (e) {
  // console.log(firebase init error)
}

const themeObject = {
  typography: {
    useNextVariants: true,
  },
  palette: {
    // primary: primary,
    //secondary: secondary,
    primary: { main: '#053f5b'},
    secondary: { main: '#fe3c6f'},
    type: 'light'
  }
}


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

/* Old dark mode experiment
const useDarkMode = () => {
  const [theme, setTheme] = useState(themeObject)

  const { palette: { type }} = theme;
  
  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === 'light' ? 'dark' : 'light' 
      }
    }
    setTheme(updatedTheme)
  }
  return [theme, toggleDarkMode]
}*/

function App(props) {
  const { classes } = props;
  //const [theme, toggleDarkMode] = useDarkMode();

  //const themeConfig = createMuiTheme(theme)

  const [errorModalOpen, setErrorModalOpen ] = useState(false);
  const [errorType, setErrorType ] = useState("");


  /* *************** */
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[400] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });

  useEffect(() => {
    const existingPreference = localStorage.getItem("darkState");
    if (existingPreference) {
      ( existingPreference === "light")
        ? setDarkState("light")
        : setDarkState("dark");
    } else {
      setDarkState("light");
      localStorage.setItem("darkState", "light");
    }
  }, []);


  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  /* *************** */

  useEffect(()=>{
    const init = async () => {
      if (!config || Object.keys(config).length === 0) {
        setErrorType("app.config");
        setErrorModalOpen(true);
      } else {
        try {
          await firebase.auth().signInAnonymously();
        } catch (e) {
          setErrorType("app.anonymouse");
          setErrorModalOpen(true); 
        }
      }
    };
    init();
  }, []);
    
  const errorToggle = (type) => {
    if (type) {
      setErrorType(type);
    }
    setErrorModalOpen(!errorModalOpen);
  };



  return (
    <div className={classes.root}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        {/*<Header/> */}

        <AppBar position="static">
          <Toolbar>
            <Icon>assignmentturnedin</Icon>
          <Typography variant="h6" color="inherit" className={classes.grow}>
              <LinkHome href="/" color="inherit" underline="none">
                Course-Advisor
              </LinkHome>
              <LinkHome href="/about" color="inherit" underline="none" className={classes.aboutLink}>
                About
              </LinkHome>
            </Typography>
            {/*<FormControlLabel
              control={<Switch onClick={toggleDarkMode} />}
            />*/}
            <BrightnessLowIcon />
            <Switch 
              checked={darkState} onChange={handleThemeChange}
            />
            <Brightness2Icon />
          </Toolbar>
        </AppBar>
      


        <Route exact path="/" render={(props) => <Home {...props} errorToggle={errorToggle} setErrorType={setErrorType} setErrorModalOpen={setErrorModalOpen} />} />
        <Route exact path="/courses/:id" render={(props) => <Course {...props} errorToggle={errorToggle} />} />
        <Route exact path="/about" render={(props) => <About {...props} />} />
      </Router>
      <ErrorModal modalOpen={errorModalOpen} toggle={() => {setErrorModalOpen(!errorModalOpen)}} errorType={errorType} config={config} />
    </ThemeProvider>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(App);
