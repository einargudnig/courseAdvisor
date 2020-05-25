import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from './Header';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    paddingTop: theme.spacing(10),
  },
  caption: {
    textAlign: "center",
    width: "100%",
  },
});

const About = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Header />
      <Grid container justify="center" alignItems="center" direction="row" className={classes.root}>
          <Grid className={classes.caption}>
            <Typography component="h2" variant="h5" gutterBottom>
            <b>What is CourseAdvisor?</b><br/>
            <b>CourseAdvisor</b> can help you to make a decision on what courses you can choose to take.<br />
            Right now this does only apply for non mandatory courses in Computer Science at the University of Iceland.<br />
            Here you can find more information on these course. <br />
            I recommend that you grade and review every class that you have already been a part of, so that students that are <br />
            not sure on what courses to choose will have reviews from former students to help them choose their non mandatory courses.
            <br />
            <br />
            You can click on each course to see more details, such as, reviews and every rating. <br />
            You will also find a link that has more detailed information on the University's website.
            <br />
            <br />
            It is important to know that each grade/review can be from different years, courses do change over the years, new teachers arrives and more. So please keep that in mind.
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
