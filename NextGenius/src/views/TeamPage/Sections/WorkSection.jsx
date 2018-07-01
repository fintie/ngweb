import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import workStyle from "assets/jss/next-genius/views/teamPageSections/workStyle.jsx";

class WorkSection extends React.Component {
  state = {
    open: false,
    variant: null
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
                </form>
              </GridItem>
            </GridContainer>
        </div>
    );
  }
}

export default withStyles(workStyle)(WorkSection);
