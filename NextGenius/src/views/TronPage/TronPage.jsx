import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Fade from 'react-reveal/Fade';
// nodejs library that concatenates classes
import classNames from "classnames";
import Parallax from "components/Parallax/Parallax.jsx";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components

import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import HeaderLinks from "components/Header/HeaderLinks.jsx";
import CampaignSection from "./Sections/CampaignSection.jsx";
import ApplySection from "./Sections/ApplySection.jsx";
import Card from "components/Card/Card.jsx";
import tronStyle from "assets/jss/next-genius/views/tronPage.jsx";

import {handleSubmit} from 'actions/voteAction';

class TronPage extends React.Component {
  render() {
    const { classes, contactUs, fetch, ...rest } = this.props;
    // const imageClasses = classNames(
    //     classes.imgRaised,
    //     // classes.imgRoundedCircle,
    //     classes.imgFluid
    // );
    return (
        <div>
          <Header
              color="transparent"
              rightLinks={<HeaderLinks/>}
              fixed
              changeColorOnScroll={{
                height: 100,
                color: "white"
              }}
              {...rest}
          />
          <Parallax small filter className={classes.parallax} image={require("assets/img/tron/bg.jpeg")}>
            <div className={classes.container}>
              <div className={classes.section}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <h2 className={classes.title}>Let's Join Together</h2>
                    <h4 className={classes.description}>Prepare for Election of TRON Super Representative</h4>
                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </Parallax>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <CampaignSection />
              <ApplySection fetch={fetch} handleSubmit={handleSubmit}/>
            </div>
          </div>
          <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetch: state.fetch
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: bindActionCreators(handleSubmit, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(tronStyle)(TronPage));
