import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import meetup0621 from "assets/img/news/meetup0621.jpg";
import meetup0615 from "assets/img/news/meetup0615.jpg";
import meetup0516 from "assets/img/news/meetup0516.jpg";
import meetup0503 from "assets/img/news/meetup0503.jpg";
import meetup from "assets/img/news/meetup.jpg";

import blogStyle from "assets/jss/next-genius/views/newsPageSections/blogStyle.jsx";

class AllSection extends React.Component {
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
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10}>
                <h5 className={classes.description}>
                  This Next Genius meetup for professionals to discuss Blockchain and other digital emergent technologies.
                  Whether you're new, or have an existing interest,
                  Blockchain professionals will put you in touch with others in the field.
                </h5>
              </GridItem>
            </GridContainer>

          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
                <img
                    alt="..."
                    src={meetup0621}
                    className={navImageClasses}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <img
                    alt="..."
                    src={meetup0615}
                    className={navImageClasses}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <img
                    alt="..."
                    src={meetup0516}
                    className={navImageClasses}
                />
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
                <img
                    alt="..."
                    src={meetup0503}
                    className={navImageClasses}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <img
                    alt="..."
                    src={meetup}
                    className={navImageClasses}
                />
            </GridItem>
          </GridContainer>
        </div>
    );
  }
}

export default withStyles(blogStyle)(AllSection);