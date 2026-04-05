import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Email from "@material-ui/icons/Email";

import Schedule from "@material-ui/icons/Schedule";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { Link } from "react-router-dom";
import contactPageStyle from "assets/jss/next-genius/views/contactPage.jsx";

const discussionPoints = [
  "Where your team is losing time in admin or operations",
  "Which processes are hard to scale or hard to keep consistent",
  "Whether AI, automation, integration, or custom software is the right fit",
  "What a sensible first project could look like"
];

const goodFitPoints = [
  "You want practical advice, not generic AI hype",
  "You need help bridging business operations and technical delivery",
  "You would rather start with one useful pilot than a large unclear program",
  "You want solutions your team can actually adopt and maintain"
];

const engagementOptions = [
  {
    title: "Discovery call",
    text: "A 30–45 minute conversation to understand the business situation, systems involved, and likely next step."
  },
  {
    title: "Scoping engagement",
    text: "A short consulting engagement to map priorities, define the use case, and recommend the best delivery path."
  },
  {
    title: "Pilot or project delivery",
    text: "A practical build covering an assistant, automation, integration, or custom internal tool."
  }
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
                  <h2 className={classes.title} style={{ color: "#FFFFFF", textShadow: "0 8px 24px rgba(0,0,0,0.28)" }}>Let’s talk about what is slowing the business down.</h2>
                  <h4 className={classes.subtitle} style={{ color: "#FFFFFF", textShadow: "0 6px 18px rgba(0,0,0,0.24)" }}>
                    If you need a practical view on AI, automation, system integration, or a custom internal platform, we can start with a focused discovery conversation.
                  </h4>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <div style={{ padding: "0", marginTop: 0 }}>
              <GridContainer spacing={24}>
                <GridItem xs={12} sm={12} md={7}>
                  <div style={{ paddingRight: 20 }}>
                    <p style={{ fontSize: 17, lineHeight: 1.8, color: "#2f3d4f", marginTop: 0 }}>
                      We work best with business owners and leadership teams who want a practical partner — someone who can understand the operational issue, recommend the right approach, and help deliver it properly.
                    </p>
                    <p style={{ fontSize: 17, lineHeight: 1.8, color: "#2f3d4f" }}>
                      A first conversation can cover:
                    </p>
                    <ul style={{ paddingLeft: 18, lineHeight: 2, color: "#1f2d3d", fontSize: 16 }}>
                      {discussionPoints.map(item => <li key={item}>{item}</li>)}
                    </ul>
                    <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <Button color="primary" href="mailto:info@nextgenius.com.au">
                        Email NextGenius
                      </Button>
                      <Button color="transparent" component={Link} to="/use-cases">
                        View SME Use Cases
                      </Button>
                    </div>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <div style={{ background: "#f7f9fc", borderRadius: 12, padding: 28, boxShadow: "0 10px 30px rgba(28,49,88,0.08)" }}>
                    <h3 style={{ marginTop: 0, color: "#1f2d3d" }}>Contact details</h3>
                    <div style={{ display: "flex", marginBottom: 18 }}>
                      <Email style={{ marginRight: 12, color: "#01acc8" }} />
                      <div>
                        <div style={{ fontWeight: 700 }}>Email</div>
                        <div style={{ color: "#2f3d4f" }}>info@nextgenius.com.au</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", marginBottom: 18 }}>
                      <Schedule style={{ marginRight: 12, color: "#01acc8" }} />
                      <div>
                        <div style={{ fontWeight: 700 }}>Address</div>
                        <div style={{ color: "#2f3d4f" }}>15 Broadway, Ultimo NSW 2007, Australia</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", marginBottom: 0 }}>
                      <Schedule style={{ marginRight: 12, color: "#01acc8" }} />
                      <div>
                        <div style={{ fontWeight: 700 }}>Typical first step</div>
                        <div style={{ color: "#2f3d4f" }}>30–45 minute discussion about priorities, systems, and next steps</div>
                      </div>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
            </div>

            <div style={{ padding: "0 0 40px" }}>
              <GridContainer spacing={24}>
                <GridItem xs={12} sm={12} md={5}>
                  <div style={{ background: "#fff", border: "1px solid #e7ecf3", borderRadius: 12, padding: 28, height: "100%" }}>
                    <h3 style={{ marginTop: 0, color: "#111827" }}>Good fit if</h3>
                    <ul style={{ paddingLeft: 18, lineHeight: 1.9, marginBottom: 0, color: "#111827" }}>
                      {goodFitPoints.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                  <div style={{ background: "#f7f9fc", borderRadius: 12, padding: 28, height: "100%" }}>
                    <h3 style={{ marginTop: 0, color: "#1f2d3d" }}>Ways we can engage</h3>
                    {engagementOptions.map(item => (
                      <div key={item.title} style={{ marginBottom: 18 }}>
                        <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                        <div style={{ color: "#2f3d4f", lineHeight: 1.8 }}>{item.text}</div>
                      </div>
                    ))}
                  </div>
                </GridItem>
              </GridContainer>
            </div>

            <div style={{ padding: "0 0 80px" }}>
              <div style={{ background: "linear-gradient(135deg, #0d1f36 0%, #144f8f 100%)", borderRadius: 14, padding: "36px 32px", color: "#fff" }}>
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={12} md={8}>
                    <h2 style={{ marginTop: 0, color: "#fff" }}>Prefer to start with a clear scenario?</h2>
                    <p style={{ margin: 0, lineHeight: 1.8, opacity: 0.92 }}>
                      If it helps, send a short note about the use case you are considering — for example internal knowledge search, admin automation, proposal support, or a customer support assistant.
                    </p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} style={{ textAlign: "right", marginTop: 16 }}>
                    <Button color="primary" size="lg" href="mailto:info@nextgenius.com.au?subject=Discovery%20Call%20Enquiry">
                      Request a Conversation
                    </Button>
                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(contactPageStyle)(ContactPage);
