import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AccountBalance from "@material-ui/icons/AccountBalance";
import ImportantDevices from "@material-ui/icons/ImportantDevices";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import EventNote from "@material-ui/icons/EventNote";
// import ArrowDownward from "@material-ui/icons/ArrowDownward";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import productStyle from "assets/jss/next-genius/views/servicePageSections/productStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";


class ProductSection extends React.Component {
  render() {
    const {classes} = this.props;
    return (
        <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
                <h2 className={classes.title}>Let's talk service</h2>
                <h5 className={classes.description}>
                  Our business principles are rooted in our personal faith and beliefs.
                  We strive to show humility, respect and fairness toward all.
                  We are grateful for our successes and learn from our failures.
                  We are called to use our gifts and talents to serve others.
                  It is through this service that we are truly blessed each and every day.
                </h5>
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.cardContainer}>
            <GridItem xs={12} sm={6} md={4} xl={3}>
                <Card>
                  <CardHeader color="primary">
                    <div className={classes.socialLine}>
                      <SupervisorAccount className={classes.iconVertical}/>
                    </div>
                    <h4 className={classes.cardTitle}>For Community</h4>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <ul className={classes.descriptionItems}>
                        <li>Knowledge sharing</li>
                        <li>Industry Insights</li>
                        <li>User Case Analysis</li>
                        <li>Legal & Regulatory Updates</li>
                        <li>Meetup, Event, Networking, Resource Bridging</li>
                        <li>Legal & Policy Analysis</li>
                        <li>Technology Consulting</li>
                      </ul>
                    </div>
                  </CardBody>
                  {/*<CardFooter className={classes.cardFooter}>*/}
                    {/*<Button simple color="primary" size="lg">*/}
                      {/*Read more...*/}
                    {/*</Button>*/}
                  {/*</CardFooter>*/}
                </Card>
            </GridItem>

            <GridItem xs={12} sm={6} md={4} xl={3}>
                <Card>
                  <CardHeader color="success">
                    <div className={classes.socialLine}>
                      <EventNote className={classes.iconVertical}/>
                    </div>
                    <h4 className={classes.cardTitle}>For Startup Projects</h4>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <ul className={classes.descriptionItems}>
                        <li>Talent Sourcing</li>
                        <li>Market Analysis</li>
                        <li>POC Design & Implementation</li>
                        <li>Project Development & Delivery</li>
                        <li>MVP and Prototype</li>
                        <li>System Architect Consulting</li>
                        <li>Community & Consumer engagement</li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>
            </GridItem>

            <GridItem xs={12} sm={6} md={4} xl={3}>
                <Card>
                  <CardHeader color="danger">
                    <div className={classes.socialLine}>
                      <ImportantDevices className={classes.iconVertical}/>
                    </div>
                    <h4 className={classes.cardTitle}>For Developers & Service Providers</h4>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <ul className={classes.descriptionItems}>
                        <li>Practical Projects</li>
                        <li>Business Strategy</li>
                        <li>Localization Policy Advisory</li>
                        <li>Branding & Marketing</li>
                        <li>Interactive Learning & Training</li>
                        <li>Professional Coaching & Development</li>
                        <li>Asian Market Landing Pad</li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>
            </GridItem>

            <GridItem xs={12} sm={6} md={4} xl={3}>
                <Card>
                  <CardHeader color="warning">
                    <div className={classes.socialLine}>
                      <AccountBalance className={classes.iconVertical}/>
                    </div>
                    <h4 className={classes.cardTitle}>For Investor</h4>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <ul className={classes.descriptionItems}>
                        <li>Project Auditing and Due Diligence</li>
                        <li>Exclusive Project Investment Opportunities</li>
                        <li>Investor Community Networking</li>
                      </ul>
                    </div>
                  </CardBody>
                  {/*<CardFooter className={classes.cardFooter}>*/}
                    {/*<Button simple color="primary" size="lg">*/}
                      {/*Read more...*/}
                    {/*</Button>*/}
                  {/*</CardFooter>*/}
                </Card>
            </GridItem>

          </GridContainer>
        </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
