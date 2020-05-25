// Replace this section with the config file of your own Firebase project. 
require('dotenv').config()



const firebaseConfig = {


    
    apiKey: "AIzaSyCkmg-V5ojIWYr1Sz8QE0E-9E2WZqVz1yk",
    authDomain: "course-grader.firebaseapp.com",
    databaseURL: "https://course-grader.firebaseio.com",
    projectId: "course-grader",
    storageBucket: "course-grader.appspot.com",
    messagingSenderId: "273724702567",
    appId: "1:273724702567:web:0f65ef72eb84297de1f9c2",
    measurementId: "G-ZTN7S6RSSD"
    
/*
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASURE
    */
};



export default firebaseConfig;