import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// import Chat from "@material-ui/icons/Chat";
// import Fingerprint from "@material-ui/icons/Fingerprint";
// import VerifiedUser from "@material-ui/icons/VerifiedUser";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import AllSection from "./Sections/AllSection.jsx";

import newsPage from "assets/jss/next-genius/views/newsPage.jsx";


class NewsPage extends React.Component {
  render() {
    const {classes, ...rest} = this.props;
    // const imageClasses = classNames(
    //   classes.imgRaised,
    //   classes.imgRoundedCircle,
    //   classes.imgFluid
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
          <Parallax small filter image={require("assets/img/news.jpg")}>
            <div className={classes.container}>
              <div className={classes.section}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <h2 className={classes.title}>Share and Discovery New Stories</h2>
                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </Parallax>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              {/*<div className={classes.section}>*/}
                  <AllSection/>
            </div>
            {/*</div>*/}
          </div>
          <Footer/>
        </div>
    );
  }
}

export default withStyles(newsPage)(NewsPage);
