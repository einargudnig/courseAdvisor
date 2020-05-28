import React, {useState, useEffect, useReducer }  from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Header from './Header';
import AboutIndex from '../About/AboutIndex';
import config from '../../config';

import * as Data from '../../Courses/Data';
// import * as FriendlyEatsMock from './FriendlyEats/FriendlyEats.Mock';
import * as Search from '../../Courses/Search';

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
  },
  guy: {
    maxWidth: "200px",
    marginBottom: "20px",
  },
  button: {
    margin: "auto",
    width: "100%",
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
  const getPrice = (price) => {
    const ret = [];
    for (let r = 0; r < price; r += 1) {
      ret.push("$");
    }
    return ret;
  }
  const semesterOptions = ['Autumn', 'Spring'].map((name) => {
    return {value: name, label: name, type: "semester" }
  })
  // semesterOptions.unshift({value: "Any", label: "semester", type: "semester" });

  
  const categoryOptions = Search.data.category.map((name) => {
    return {value: name, label: name, type: 'city' }
  }); 
  categoryOptions.unshift({value: "Any", label: "category", type: "category" });

  const priceOptions = [ "$", "$$", "$$$", "$$$$"].map((name) => {
    return {value: name, label: name, type: 'price' }
  });
  priceOptions.unshift({value: "Any", label: "全て", type: "price" });

  /*
  const sortOrderOptions = ['Rating', 'Reviews'].map((name) => {
    return {value: name, label: name, type: "sort" }
  }); */

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
      //city: getStateValue("city"),
      semester: getStateValue("semester"),
      // price: getStateValue("price"),
      // sortOrder: getStateValue("sort"),
    }
    setSearchState(filters);
  }
  const { /*city,*/ semester , /*price, sort*/ } = state;

  return (
    <React.Fragment>
      <Grid container justify="center" direction="row" className={classes.root}>
      <AboutIndex />
      <Grid item xs={2}>
      </Grid>
      {/*<Grid item xs={2}>
      <Select options={citiesOptions} value={city} onChange={handleChange} placeholder="都道府県"/>
      </Grid>*/}
      <Grid item xs={3}>
      <Select options={semesterOptions} value={semester} onChange={handleChange} placeholder="Semester"/>
      </Grid>
      {/*<Grid item xs={2}>
      <Select options={priceOptions} value={price} onChange={handleChange} placeholder="金額"/>
      </Grid>
      <Grid item xs={2}>
      <Select options={sortOrderOptions} value={sort} onChange={handleChange} placeholder="Order"/>
      </Grid>*/}
      <Grid item xs={3}>
      <Button onClick={submitButton} color="primary" className={classes.button} >Sort</Button>
      </Grid>
      <Grid item xs={1}>
      </Grid>
        {courses.length > 0 ?
          courses.map((course) => {
            return (<Grid item xs={4} onClick={() => {goCourse(course.id)}} key={course.id}>
                    <div style={{marginLeft: "auto", marginRight: "auto", marginBottom: "20px", width: "80%"}}>
                    {/*<img src={course.photo} alt={course.name} style={{width: "100%", objectFit: "cover"}}/> <br/>*/}
                    <span style={{ position: 'relative', float: 'right'}}>{getPrice(course.price)}</span>
                    <h2 style={{ marginTop: '2px', marginBottom: '5px'}}>{course.name}</h2>
                    {getStar(course.avgRating).map((star) => (<Icon style={{color: '#feb22c'}} key={star.id}>{star.value}</Icon>) )}<br/>
                    {course.semester}
                    </div>
                    </Grid>)
          })
          :
          <div className={classes.guyContainer}>
            {/*<img className={classes.guy} src="/img/guy_fireats.png" alt="guy fireats" />*/}
            <CircularProgress />
            <div className="text">
              This app is connected to the Firebase project "<b>{config.projectId}</b>".<br />
              <br />
              Your Cloud Firestore has no documents in <b>/courses/</b>.
            </div>
            <br />
          {/* <Button onClick={() => importData()} color="primary" className={classes.button} >Import Data</Button> */}


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
