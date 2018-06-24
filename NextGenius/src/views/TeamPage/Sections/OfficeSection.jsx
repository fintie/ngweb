import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import Fade from 'react-reveal/Fade';
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import officeStyle from "assets/jss/next-genius/views/teamPageSections/officeStyle.jsx";

import office1 from "assets/img/office/office1.jpg";
import meetup1 from "assets/img/office/meetup1.jpg";
import meetup2 from "assets/img/office/meetup2.jpg";
import meetup3 from "assets/img/office/meetup3.jpg";
import meetup4 from "assets/img/office/meetup4.jpg";

class OfficeSection extends React.Component {
  render() {
    const {classes, ...rest} = this.props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
        <div className={classes.section}>
          <Fade bottom>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h2 className={classes.title}>Our community is our second home</h2>
                <h5 className={classes.description}>
                  Here are some pictures from our office.
                  We host blockchain meetup regularly.
                </h5>
              </GridItem>
            </GridContainer>
          </Fade>

          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Fade bottom>
                <img
                    alt="..."
                    src={office1}
                    className={navImageClasses}
                />
              </Fade>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Fade bottom>
                <img
                    alt="..."
                    src={meetup3}
                    className={navImageClasses}
                />
              </Fade>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Fade bottom>
                <img
                    alt="..."
                    src={meetup4}
                    className={navImageClasses}
                />
              </Fade>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Fade bottom>
                <img
                    alt="..."
                    src={meetup1}
                    className={navImageClasses}
                />
              </Fade>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Fade bottom>
                <img
                    alt="..."
                    src={meetup2}
                    className={navImageClasses}
                />
              </Fade>
            </GridItem>
          </GridContainer>
        </div>
    );
  }
}

export default withStyles(officeStyle)(OfficeSection);
