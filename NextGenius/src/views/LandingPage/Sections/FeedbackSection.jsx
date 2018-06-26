import React from "react";
// material-ui components
import Carousel from "react-slick";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Star from "@material-ui/icons/Star";

// @material-ui/icons

// import ArrowDownward from "@material-ui/icons/ArrowDownward";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";

import feedbackStyle from "assets/jss/next-genius/views/landingPageSections/feedbackStyle.jsx";
import CardBody from "components/Card/CardBody.jsx";

class FeedbackSection extends React.Component {
  render() {
    const { classes } = this.props;
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false
    };

    return (
        <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
                <h2 className={classes.title}>Our Clients Love Us</h2>
                <h5 className={classes.titleDescription}>
                  You need more information? Check what other persons are saying about our product.
                  They are very happy with their purchase.
                </h5>
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.containImage}>
            <GridItem xs={12} sm={12} md={12} className={classes.marginAuto}>
              <Card carousel className={classes.cardCarousel}>
                <Carousel {...settings} className="feedbackCarousel">
                  <div>
                    <Card plain>
                      <CardBody className={classes.cardBody}>
                        <p className={classes.description}>
                          "Your products, all the kits that
                          I have downloaded from your site and worked with are sooo cool!
                          I love the color mixtures, cards... everything. Keep up the great work!"
                        </p>
                        <br/>
                        <h3 className={classes.cardTitle}>
                          Alec Thompson
                          <br/>
                          <small className={classes.smallTitle}>DESIGNER @ GINAANDREW & CO.</small>
                        </h3>
                        <Star className={classes.star}/>
                        <Star className={classes.star}/>
                        <Star className={classes.star}/>
                        <Star className={classes.star}/>
                        <Star className={classes.star}/>
                      </CardBody>
                    </Card>
                  </div>
                  <div>
                    <Card plain>
                      <CardBody className={classes.cardBody}>
                        <p className={classes.description}>
                          "Don't be scared of the truth because we need to restart the human foundation in truth.
                          That's why I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is not so attractive"
                        </p>
                        <br/>
                        <h3 className={classes.cardTitle}>
                          Christian Louboutin
                          <br/>
                          <small className={classes.smallTitle}>DESIGNER @ LOUBOUTIN & CO.</small>
                        </h3>
                        <Star className={classes.star}/>
                        <Star className={classes.star}/>
                        <Star className={classes.star}/>
                        <Star className={classes.star}/>
                        <Star className={classes.star}/>
                      </CardBody>
                    </Card>
                  </div>
                  <div>
                    <Card plain>
                      <CardBody className={classes.cardBody}>
                        <p className={classes.description}>
                          "Thank you Anna for the invite thank you to the whole Vogue team Called I Miss the Old Kanye
                          At the God's last game Chop up the soul Kanye. I promise I will never let the people down.
                          I want a better life for all!!! Pablo Pablo Pablo Pablo!
                          Thank you Anna for the invite thank you to the whole Vogue team."
                        </p>
                        <br/>
                        <h3 className={classes.cardTitle}>
                          Kendall Thompson
                          <br/>
                          <small className={classes.smallTitle}>CEO @ MARKETING DIGITAL LTD.
                          </small>
                        </h3>
                        <Star className={classes.star}/>
                        <Star className={classes.star}/>
                        <Star className={classes.star}/>
                        <Star className={classes.star}/>
                        <Star className={classes.star}/>
                      </CardBody>
                    </Card>
                  </div>
                </Carousel>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
    );
  }
}

export default withStyles(feedbackStyle)(FeedbackSection);
