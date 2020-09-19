import React, {useState, useEffect, useReducer }  from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Loader from '../Loader/Loader';
// import Header from './Header';
import AboutIndex from '../About/AboutIndex';
import config from '../../config';

import * as Data from '../../Courses/Data';
// import * as FriendlyEatsMock from './FriendlyEats/FriendlyEats.Mock';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  caption: {
    textAlign: "center",
    width: "100%",
  },
  guyContainer: {
    paddingTop: "100px",
    textAlign: "center",
    alignItems: 'center'
  },
  guy: {
    maxWidth: "200px",
    marginBottom: "20px",
  },
  button: {
    margin: "auto",
    width: "100%",
    // backgroundColor: "blue"
    borderStyle: "solid"
  },
  mainPart: {
    marginLeft: "auto", 
    marginRight: "auto", 
    marginBottom: "20px", 
    marginTop: "20px", 
    width: "80%", 
    cursor: "pointer",
    backgroundColor: grey[0],
    '&:hover': {
      backgroundColor: grey[500],
    }
  },
});

const reducer = (state, action) => {
  switch (action.type) {
  case 'change':
    const newState = state.slice();
    const index = newState.findIndex((element) => { return element.id === action.data.id });
    if (index !== -1) {
      newState[index] = action.data;
    } else {
      newState.push(action.data);
    }
    return newState;
  case 'remove':
    return state.filter(n => n.id !== action.data.id);
  case 'empty':
    return [];
  default:
    throw new Error();
  }  
}

function Home(props) {
  const { classes, /*errorToggle,*/ setErrorType, setErrorModalOpen } = props;

  const [courses, setCourses] = useReducer(reducer, []); 
  const [state, setState] = useState({}); 
  const [searchState, setSearchState] = useState(null);

  useEffect(() => {
    const renderer = {
      remove: (doc) => {
        const data = doc.data();
        data.id = doc.id;
        setCourses({type: 'remove', data})
      },
      display: (doc) => {
        const data = doc.data();
        data.id = doc.id;
        setCourses({type: 'change', data})
      },
      empty: () => {
        setCourses({type: 'empty'});
      },
    }


    /* Filter function */
    try {
      const query = searchState ?
        Data.getFilteredCourses(searchState) :
        Data.getAllCourses();
      if (query) {
        setCourses({type: 'empty'});
        const detacher = Data.getDocumentsInQuery(query, renderer);
        return () => detacher();
      } else {
        if(searchState) {
          setErrorType("home.noFilter");
          setErrorModalOpen(true);
        }
      }
    } catch (e) {
      console.log("db unknown error");
    }
  }, [searchState, setErrorModalOpen, setErrorType]);

  /* const importData = async () => {
    try {
      await FriendlyEatsMock.addMockCourse();
    } catch (e) {
      errorToggle("home.importError");
    }
  } */

  const goCourse= (courseId) => {
    props.history.push(`/courses/${courseId}`);
  }
  const getStar = (rating) => {
    const ret = [];
    for (let r = 0; r < 5; r += 1) {
      if (r < Math.floor(rating)) {
        ret.push({id: r, value: "star"});
      } else {
        ret.push({id: r, value: "star_border"});
      }
    }
    return ret;
  };


  /* Choose between Autumn or Spring semester */
  const semesterOptions = ['Autumn', 'Spring'].map((name) => {
    return {value: name, label: name, type: "semester" }
  })

  const handleChange =(e) => {
    const newState = Object.assign({}, state);
    newState[e.type] = e
    setState(newState)
  }
  const getStateValue = (key) => {
    if (state[key]) {
      return state[key]['value'];
    }
    return 'Any';
  }
  const submitButton = () => { 
    const filters = {
      semester: getStateValue("semester"),
    }
    setSearchState(filters);
  }
  const { semester  } = state;

  return (
    <React.Fragment>
      <Grid container justify="center" direction="row" className={classes.root}>
      <AboutIndex />
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={3}>
      <Select options={semesterOptions} value={semester} onChange={handleChange} placeholder="Semester"/>
      </Grid>
      <Grid item xs={3}>
      <Button variant="contained" onClick={submitButton} color="primary" className={classes.button} >Sort</Button>
      </Grid>
      <Grid item xs={1}>
      </Grid>
        {courses.length > 0 ?
          courses.map((course) => {
            return (<Grid item xs={4} onClick={() => {goCourse(course.id)}} key={course.id}>
                    <div className={classes.mainPart} >
                    <h3 style={{ marginTop: '2px', marginBottom: '5px', wordBreak: 'break-word'}}>{course.name}</h3>
                    {getStar(course.avgRating).map((star) => (<Icon style={{color: '#feb22c'}} key={star.id}>{star.value}</Icon>) )}<br/>
                    {course.semester}
                    </div>
                    </Grid>)
          })
          :
          <div className={classes.guyContainer}>
            <Grid container justify="center">
              <Loader />
            </Grid>
            <div className="text">
              This app is connected to the Firebase project "<b>{config.projectId}</b>".<br />
              <br />
              Your Cloud Firestore has no documents in <b>/courses/</b>. Try to refresh !!
            </div>
            <br />



          </div>
        }
      </Grid>
    </React.Fragment>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
