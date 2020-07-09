import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    about: {
        paddingTop: "30px",
        paddingBottom: "30px",
        width: "90%"
    }
})


function AboutIndex(styles, props) {
    const { classes } = styles;

    return(
        <React.Fragment>
            <Grid container justify="center" alignItems="center" direction="row" className={classes.about}>
                <Typography>
                    <b>Welcome to CourseAdvisor.</b> <br />
                    The purpose of this website is to help students studying Computer Science at the University of Iceland to choose their non mandatory courses.<br/>
                    The aim is to get former students to grade and review their non mandatory courses with the hope that it could give current students some feedbacks on these courses. <br />
                    Please take a look at the about page under the menu to get more details.
                    <br />
                    <br />
                    You can sort the courses by semesters: <i>Autumn</i> or <i>Spring</i>, by selecting either in the drop-down selection and clicking the sort button.
                </Typography>
            </Grid>
        </React.Fragment>
    );
}

AboutIndex.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutIndex);