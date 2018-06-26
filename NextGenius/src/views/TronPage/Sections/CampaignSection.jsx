import React from "react";
// material-ui components
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Fade from 'react-reveal/Fade';

// @material-ui/icons
import { Power, VerifiedUser, AddToQueue } from "@material-ui/icons";

// import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Card from "components/Card/Card.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import campaignStyle from "assets/jss/next-genius/views/tronPageSections/campaignStyle.jsx";

import srelection from "assets/img/tron/srelection.jpg";

class CampaignSection extends React.Component {
  render() {
    const {classes} = this.props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgElection, classes.imgGallery);
    return (
        <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
              <Fade bottom>
                <h2 className={classes.title}>Our Rewards Plans</h2>
                <h5 className={classes.description}>
                  To show appreciation for everyone's support and give back to the community,
                  we have decided to return 100% of the profit from operating the super node to our voters if we were elected.
                </h5>
              </Fade>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Fade bottom>
                <div className={classes.note} xs={12} sm={12} md={6}>
                  <ul><strong>All you need to do:</strong>
                    <li>Vote for over 100,000 TRX. </li>
                    <li>Keep your votes locked from June 26th, to July 31st.</li>
                    <li>Register your wallet address and email below.</li>
                  </ul>
                </div>
              </Fade>
            </GridItem>
          </GridContainer>
        </div>
    );
  }
}

export default withStyles(campaignStyle)(CampaignSection);
