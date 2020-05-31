import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { TweenMax } from 'gsap/all';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    paddingTop: theme.spacing(10),
  },
  caption: {
    textAlign: "center",
    width: "90%",
  },
});



const About = props => {
  const { classes } = props;

  return (
    <React.Fragment>
      <Grid container justify="center" alignItems="center" direction="row" className={classes.root}>
          <Grid className={classes.caption}>
            <Typography component="h2" variant="h6" gutterBottom>
            <b>What is CourseAdvisor?</b>
            <br/>
            <br/>
            <b>CourseAdvisor</b> can help you to make a decision on what courses you decide to choose.<br />
            Right now this does only apply for non mandatory courses in Computer Science at the University of Iceland.<br />
            You can find more information on these courses on the <Link href="https://ugla.hi.is/kennsluskra/index.php?tab=nam&chapter=namsleid&id=080713_20206&kennsluar=2020" className="underline" color="inherit">University website</Link> <br />
            Most of us who are or have completed studying Computer Science know that you have to choose between a lot of<br /> 
            non mandatory classes to fill in with the mandatory classes. This can be a tricky selection because there are a lot of courses to choose from. 
            <br />
            <br />
            The idea is to get people who have already completed these courses to grade them and review them, so that the students <br />
            that are in the process at selecting their classes will get outside opinion from other students.
            
            
            I recommend that you grade and review every class that you have already been a part of, so that students that are <br />
            not sure on what courses to choose will have reviews from former students to help them choose their non mandatory courses.<br />
            
            <br />
            <br />
            You can click on each course to see more details, such as, reviews and ratings. <br />
            You will also find a link that has more detailed information on the University's website.
            <br />
            <br />
            It is important to know that each grade/review can be from different years, courses do change over the years, new teachers arrives and more. So please keep that in mind.
            <br />
            <br />
            <br />
            <br />
            <small>If you do have any questions, ideas on how to make this better or anything else. Don't hesitate to send me an email: einargudnig@gmail.com</small>
          </Typography>
          </Grid>
      </Grid>
      
    </React.Fragment>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
