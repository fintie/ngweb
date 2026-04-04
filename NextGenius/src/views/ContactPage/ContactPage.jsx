import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import Schedule from "@material-ui/icons/Schedule";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Button from "components/CustomButtons/Button.jsx";
import contactPageStyle from "assets/jss/next-genius/views/contactPage.jsx";

const discussionPoints = [
  "Where your team is losing time in admin or operations",
  "Which processes are hard to scale or hard to keep consistent",
  "Whether AI, automation, integration, or custom software is the right fit",
  "What a sensible first project could look like"
];

class ContactPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;

    return (
      <div>
        <Header
          color="transparent"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{ height: 100, color: "white" }}
          {...rest}
        />
        <Parallax small filter image={require("assets/img/city.jpg")}>
          <div className={classes.container}>
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={10}>
                  <h2 className={classes.title}>Let’s talk about what is slowing the business down.</h2>
                  <h4 className={classes.subtitle}>
                    If you need a practical view on AI, automation, system integration, or a custom internal platform, we can start with a focused discovery conversation.
                  </h4>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <div style={{ padding: "70px 0 80px" }}>
              <GridContainer spacing={24}>
                <GridItem xs={12} sm={12} md={7}>
                  <div style={{ paddingRight: 20 }}>
                    <h2 style={{ marginTop: 0 }}>Start with a discovery call</h2>
                    <p style={{ fontSize: 17, lineHeight: 1.8, color: "#516076" }}>
                      We work best with business owners and leadership teams who want a practical partner — someone who can understand the operational issue, recommend the right approach, and help deliver it properly.
                    </p>
                    <p style={{ fontSize: 17, lineHeight: 1.8, color: "#516076" }}>
                      A first conversation can cover:</p>
                    <ul style={{ paddingLeft: 18, lineHeight: 2, color: "#516076", fontSize: 16 }}>
                      {discussionPoints.map(item => <li key={item}>{item}</li>)}
                    </ul>
                    <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <Button color="primary" href="mailto:hello@nextgenius.com.au">
                        Email NextGenius
                      </Button>
                    </div>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <div style={{ background: "#f7f9fc", borderRadius: 12, padding: 28, boxShadow: "0 10px 30px rgba(28,49,88,0.08)" }}>
                    <h3 style={{ marginTop: 0 }}>Contact details</h3>
                    <div style={{ display: "flex", marginBottom: 18 }}>
                      <Email style={{ marginRight: 12, color: "#01acc8" }} />
                      <div>
                        <div style={{ fontWeight: 700 }}>Email</div>
                        <div style={{ color: "#516076" }}>hello@nextgenius.com.au</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", marginBottom: 18 }}>
                      <Phone style={{ marginRight: 12, color: "#01acc8" }} />
                      <div>
                        <div style={{ fontWeight: 700 }}>Phone</div>
                        <div style={{ color: "#516076" }}>Available on request during discovery booking</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", marginBottom: 0 }}>
                      <Schedule style={{ marginRight: 12, color: "#01acc8" }} />
                      <div>
                        <div style={{ fontWeight: 700 }}>Typical first step</div>
                        <div style={{ color: "#516076" }}>30–45 minute discussion about priorities, systems, and next steps</div>
                      </div>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(contactPageStyle)(ContactPage);
