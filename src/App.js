import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
// import { useTheme } from '@material-ui/core/styles';
import theme from './theme';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import ErrorModal from './Components/Error/ErrorModal';
import Course from './Components/Course/Course';
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import config from './config';

// import { Switch, FormControlLabel } from '@material-ui/core';

try {
  firebase.initializeApp(config);
} catch (e) {
  // console.log(firebase init error)
}

/*
Gera styles css skra, sem yfirskrifar material theme?
breytir i dark mode?

TODO:::

Föstudagur:
tRansitions/Animations
- Láta /urls hafa transitions
- Accept takki með animations?
- info um review

Laugardagur/Sunnudagur
Mobile-View !important
Heroku.



*/



function App() {
  // const theme = useTheme();
  const [errorModalOpen, setErrorModalOpen ] = useState(false);
  const [errorType, setErrorType ] = useState("");

  
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
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header/>
        <Route exact path="/" render={(props) => <Home {...props} errorToggle={errorToggle} setErrorType={setErrorType} setErrorModalOpen={setErrorModalOpen} />} />
        <Route exact path="/courses/:id" render={(props) => <Course {...props} errorToggle={errorToggle} />} />
        <Route exact path="/about" render={(props) => <About {...props} />} />
      </Router>
      <ErrorModal modalOpen={errorModalOpen} toggle={() => {setErrorModalOpen(!errorModalOpen)}} errorType={errorType} config={config} />
    </MuiThemeProvider>
  );
}

export default App;
