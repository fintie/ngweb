import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import Fade from 'react-reveal/Fade';
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import workStyle from "assets/jss/next-genius/views/teamPageSections/workStyle.jsx";

class WorkSection extends React.Component {
  state = {
    open: false,
    variant: null,
    message: null
  };

  sendMessage = async () => {
    const {jobInquiry} = this.props;
    await jobInquiry('jobInquiryBtn', {name: 'Test', email: 'test@gmail.com', message: 'Test'});
    // Send message to server
    this.setState({open: true, variant: "success", message: "Thanks for contacting us, we will contact you shortly"});
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open: false});
  };

  render() {
    const {classes, fetch} = this.props;
    return (
        <div className={classes.section}>
          <Fade bottom>
            <GridContainer justify="center">
              <GridItem cs={12} sm={12} md={8}>
                <h2 className={classes.title}>Want to work with us</h2>
                <h4 className={classes.description}>
                  We're always looking for talented people to join our team.
                  If you have the drive – the desire to succeed – and want to have a positive impact on the people and
                  communities around you, we want you at Next Genius.
                  We will responde get back to you in a couple of
                  hours.
                </h4>
                <form>
                  <GridContainer>
                    {/*<GridItem xs={12} sm={12} md={6}>*/}
                      {/*<CustomInput*/}
                          {/*labelText="Your Name"*/}
                          {/*id="name"*/}
                          {/*formControlProps={{*/}
                            {/*fullWidth: true*/}
                          {/*}}*/}
                      {/*/>*/}
                    {/*</GridItem>*/}
                    {/*<GridItem xs={12} sm={12} md={6}>*/}
                      {/*<CustomInput*/}
                          {/*labelText="Your Email"*/}
                          {/*id="email"*/}
                          {/*formControlProps={{*/}
                            {/*fullWidth: true*/}
                          {/*}}*/}
                      {/*/>*/}
                    {/*</GridItem>*/}
                    {/*<CustomInput*/}
                        {/*labelText="Your Message"*/}
                        {/*id="message"*/}
                        {/*formControlProps={{*/}
                          {/*fullWidth: true,*/}
                          {/*className: classes.textArea*/}
                        {/*}}*/}
                        {/*inputProps={{*/}
                          {/*multiline: true,*/}
                          {/*rows: 3*/}
                        {/*}}*/}
                    {/*/>*/}
                    <GridContainer justify="center" className={classes.sendBtnGrid}>
                      <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          className={classes.textCenter}
                      >
                        <Button round color="primary" className={classes.sendBtn} component={Link} to='/contact'>{'Let\'s Talk'} </Button>
                      </GridItem>
                    </GridContainer>
                  </GridContainer>
                </form>
              </GridItem>
            </GridContainer>
          </Fade>
        </div>
    );
  }
}

export default withStyles(workStyle)(WorkSection);
