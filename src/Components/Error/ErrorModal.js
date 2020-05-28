import React from 'react';
import Modal from '../Modal/Modal'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  modalWindow: {
    padding: "15px",
  },
  modalHeader: {
    marginTop: 0,
    fontSize: "1.25rem",
    fontWeight: 500,
    textAlign: "left",
  },
  modalBody: {
    textAlign: "left",
    paddingTop: "10px",
  },
  modalFooter: {
    textAlign: "right",
  },
  modal: {
    alignItems: "start",
  }
});

function ErrorModal(props) {
  const { classes , errorType, toggle, config } = props;

  const message = ((_type) => {
    if (_type === "app.config") {
      return (<span>You must make sure you have set up src/config.js to connect to firebase</span>)
    } else if (_type === "app.anonymouse") {
      const url = "https://console.firebase.google.com/u/0/project/" + config.projectId + "/authentication/providers";
      return (<div>
              <span>Enable Anonymous Auth <br/></span>
              <a href={url}>Click here for settings</a>
              </div>)
    } else if (_type === "home.importError") {
      return (<span>There is an error with importing data from firebase database.</span>)
    } else if (_type === "home.noFilter") {
      return (<span>There is an error with the Search</span>)
    } else if (_type === "restaurant.addMockRating") {
      return (<span>There is an error with the mock rating(for testing only)</span>)
    }
  })(errorType);
  return (<Modal {...props}>
          <div className={classes.modalHeader}> Error </div>
          <div className={classes.modalBody}>{message}</div>
          <div className={classes.modalFooter}><Button onClick={toggle}>close</Button></div>
          </Modal>)
  
}

export default withStyles(styles)(ErrorModal);

