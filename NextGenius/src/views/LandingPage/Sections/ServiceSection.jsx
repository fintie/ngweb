import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import { Power, VerifiedUser, AddToQueue } from "@material-ui/icons";

// import ArrowDownward from "@material-ui/icons/ArrowDownward";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import serviceStyle from "assets/jss/next-genius/views/landingPageSections/serviceStyle.jsx";

class ServiceSection extends React.Component {
  render() {
    const {classes} = this.props;
    return (
        <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
                <h2 className={classes.title}>Who We Are</h2>
                <h5 className={classes.description}>
                  We are the largest community of Blockchain enthusiasts, enablers, and entrepreneurs in the Southern Hemisphere.
                  As passionate believers and practitioners of decentralized Blockchain values,
                  we believe in lifelong learning through helping each other,
                  helping communities to develop and businesses to succeed.
                </h5>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <InfoArea
                    title="Connect"
                    description="We connect different dots to form a network of blockchain ecosystem where chemical reactions happen between interesting people.
                    Come to Next Genius with ideas and questions and participate in open and intriguing discussions,
                    and find out how blockchain may change your daily life."
                    icon={Power}
                    iconColor="info"
                    vertical
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <InfoArea
                    title="Empower"
                    description="If you already have a product, a project whitepaper, or a sound idea,
                    come to Next Genius to get connected to those who can help you build your dream into reality.
                    We have a full stack of developers, architects, designers, advisors, token economists, lawyers, financial and tax experts, and more importantly,
                    the consumer/investor community that can make your project a verifiable success.  ."
                    icon={VerifiedUser}
                    iconColor="success"
                    vertical
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <InfoArea
                    title="Create"
                    description="If you are an industry expert with deep expertise, experiences, and network, we would like to talk to you.
                    We will proactively seek those who can bring blockchain into their own industries,
                    and build a pipeline of projects that will eventually reform the business landscape.
                    Come to Next Genius for your next career turning point."
                    icon={AddToQueue}
                    iconColor="warning"
                    vertical
                />
            </GridItem>
          </GridContainer>
        </div>
    );
  }
}

export default withStyles(serviceStyle)(ServiceSection);
