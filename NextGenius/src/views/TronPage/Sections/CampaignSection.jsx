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
                  To show appreciation for everyone's support in the past few months,
                  we have decided to give back everything in form of an Airdrop in the first month, to be distributed on July 31st.
                  When elected, successfully creating blocks and running TRON’s network we will receive rewards. For the month of July,
                  we have decided to Airdrop 100% of all successful validated reward profits back to the community.
                </h5>
              </Fade>
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <Fade bottom>
                <div className={classes.note} xs={12} sm={12} md={8}>
                  <ul><li>50% (TRX) will be airdropped directly to voters who vote for Next Genius. </li>
                    <li> While the remaining 50% (TRX) goes towards voters who keep their votes locked from June 26th, to July 31st.</li>
                  </ul>
                </div>
              </Fade>
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Fade bottom>
                <Card plain>
                  <GridItem className={classes.itemGrid}>
                    <img src={srelection} alt="Tron" className={navImageClasses}/>
                  </GridItem>
                </Card>
              </Fade>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Fade bottom>
                <h3 className={classes.title}>Initial Airdrop: 50% (TRX)</h3>
                <h5 className={classes.subTitle}>(Distributed to all Voters on July 31st)</h5>
                <div className={classes.description}>
                  Voters who freeze their votes part-time will be eligible for airdrop,
                  however, the amount will be dependent on the number of votes frozen and the amount of time voted.
                </div>
              </Fade>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Fade bottom>
                <h3 className={classes.title}>Bonus Airdrop: 50% (TRX)</h3>
                <h5 className={classes.subTitle}>(Full-Time Voters, with their entire frozen TRON wallet.)
                </h5>
                <div className={classes.description}>
                  Voters must lock in their vote from June 26th until July 31st.
                  Voters must vote on June 26th with their entire frozen TRON wallet.
                </div>
              </Fade>
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
              <Fade bottom>
                <h3 className={classes.title}>Total Airdrop</h3>
                <h5 className={classes.subTitle}>100% TRX of 1st months reward profits*
                </h5>
                <div className={classes.description}>
                  <p>How much do you get?</p>
                  <p>100%!! We are not in the position to make any guarantees or commitments that we might not be able to keep.
                  For now we will be giving back 100% of rewards to the community in the first month.
                  But our main targets will be the university and bringing knowledge to people
                  about the Tron ecosystem and a #WeAreTron Charitable donation every month, let the world know,
                    that we will be by the community, for the community.</p>
                </div>
              </Fade>
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
              <Fade bottom>
                <h3 className={classes.title}>About Tron</h3>
                <h5 className={classes.subTitle}>Tron is one of the largest blockchain based operating systems in the world.
                </h5>
                <div className={classes.description} >
                  <p>Tron strives to construct a global free content entertainment system, utilizing blockchain technology.
                  This protocol allows each user to freely publish, store, and own data.
                  The issuance, circulation, and trading of digital assets, through decentralized self governance,
                  lay the foundation for the distribution and subscription of content,
                  thereby empowering content creators as well as forming a decentralized content entertainment ecosystem.
                  </p>
                  <p>The app partners of Tron protocol include Peiwo, Obike, Gifto, Uplive, with a total of 4 million users,
                  making Tron a blockchain protocol with the most DAPP users in the world.
                  </p>
                  <p>More information can be found <a href="https://tron.network" target="_blank">here</a>.</p>
                </div>
              </Fade>
            </GridItem>
          </GridContainer>
        </div>
    );
  }
}

export default withStyles(campaignStyle)(CampaignSection);
