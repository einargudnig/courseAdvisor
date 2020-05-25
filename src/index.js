import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// courseAdvisor is a fun pet-project. The purpose is to help students pick their non mandatory courses.
serviceWorker.unregister();
