import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/next-genius/views/landingPage.jsx";

// Sections for this page
import ServiceSection from "./Sections/ServiceSection.jsx";
// import FeedbackSection from "./Sections/FeedbackSection.jsx";

const dashboardRoutes = [];

class LandingPage extends React.Component {
  render() {
    const {classes, ...rest} = this.props;
    return (
        <div>
          <Header
              color="transparent"
              routes={dashboardRoutes}
              rightLinks={<HeaderLinks/>}
              fixed
              changeColorOnScroll={{
                height: 200,
                color: "white"
              }}
              {...rest}
          />
          <Parallax filter image={require("assets/img/home.jpg")}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <h1 className={classes.title}>Technology Raises Our Next Genius</h1>
                    <h5>
                      Technology enables brilliant young minds to shine through multiplier effects.
                      At Next Genius, we enable you to build something different.
                      We change people’s perspective of what their potentials really are,
                      what problems they can really solve, and what lifestyle they can really create for the local and global community.
                    </h5>
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <div className={classNames(classes.main, classes.mainRaised)}>

            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12} className={classes.arrowGrid}>
                  <ArrowDropDown className={classes.icons}/>
                </GridItem>
              </GridContainer>
              <ServiceSection/>
              {/*<FeedbackSection/>*/}
            </div>
          </div>
          <Footer/>
        </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
