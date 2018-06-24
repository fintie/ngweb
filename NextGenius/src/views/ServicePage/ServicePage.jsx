import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
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

import servicePage from "assets/jss/next-genius/views/servicePage.jsx";

// Sections for this page
import ProductSection from "./Sections/ProductSection.jsx";

const dashboardRoutes = [];

class ServicePage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 100,
            color: "white"
          }}
          {...rest}
        />
        <Parallax small filter image={require("assets/img/product.jpg")} className={classes.parallax}>
          <div className={classes.container}>
            <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <h2 className={classes.title}>Provide the best Quality, Value and Service</h2>
              </GridItem>
            </GridContainer>
            </div>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection/>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(servicePage)(ServicePage);
