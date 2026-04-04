import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { Link } from "react-router-dom";
import servicePageStyle from "assets/jss/next-genius/views/servicePage.jsx";

const serviceGroups = [
  {
    title: "AI consulting and planning",
    summary: "Work out where AI fits in your business, what should be prioritised first, and what results are realistic.",
    bullets: [
      "AI opportunity reviews for operations, sales, service, and admin teams",
      "Practical roadmap planning with business priorities, costs, and next steps",
      "Advice on where to use existing platforms versus custom solutions"
    ]
  },
  {
    title: "Knowledge systems and AI search",
    summary: "Make your internal know-how easier to access so staff spend less time chasing answers and repeating work.",
    bullets: [
      "RAG knowledge assistants trained on your policies, SOPs, templates, and documents",
      "Internal help desks for staff questions, onboarding support, and faster decision-making",
      "Customer-facing knowledge experiences where appropriate"
    ]
  },
  {
    title: "Connected tools and workflow automation",
    summary: "Connect business systems and remove manual handovers that slow down teams and create avoidable errors.",
    bullets: [
      "MCP-style connected tool setups for assistants and workflows across multiple systems",
      "Automation of repetitive tasks, follow-ups, notifications, and status updates",
      "Smarter movement of information between CRM, operations, finance, and support tools"
    ]
  },
  {
    title: "OpenClaw assistant setup",
    summary: "Set up a personal or business assistant that helps with information access, routine tasks, and operational follow-through.",
    bullets: [
      "Tailored assistant configuration for founders, managers, or teams",
      "Business assistant workflows linked to documents, systems, and daily processes",
      "Support for secure rollout, testing, and team adoption"
    ]
  },
  {
    title: "Custom software and internal platforms",
    summary: "Build software that fits your business instead of forcing the business to fit a generic tool.",
    bullets: [
      "Internal tools for service delivery, approvals, tracking, and reporting",
      "Web platforms, portals, dashboards, and admin systems",
      "Enhancements to existing digital products and operational systems"
    ]
  },
  {
    title: "Delivery support and ongoing improvement",
    summary: "Stay involved after launch so the solution keeps improving instead of becoming shelfware.",
    bullets: [
      "Pilot rollouts and staged implementation",
      "Refinement based on user feedback and business results",
      "Ongoing advisory support as your needs evolve"
    ]
  }
];

const fitList = [
  "You know there is too much manual work but are not sure what to automate first",
  "Your team loses time searching for information across emails, folders, chats, and systems",
  "You want to use AI safely and practically without adding confusion or risk",
  "Your current software stack does not match the way the business actually operates",
  "You need a partner who can advise, build, and connect systems rather than hand off a slide deck"
];

class ServicePage extends React.Component {
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
        <Parallax small filter image={require("assets/img/product.jpg")}>
          <div className={classes.container}>
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={10}>
                  <h2 className={classes.title}>Services built around business outcomes, not technical jargon.</h2>
                  <h4 className={classes.subtitle} style={{ maxWidth: 820 }}>
                    NextGenius helps SMEs turn AI, automation, integrations, and software improvements into practical changes the team can use.
                  </h4>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <div style={{ padding: "70px 0 25px" }}>
              <GridContainer spacing={24}>
                <GridItem xs={12} sm={12} md={4}>
                  <div style={{ background: "#f7f9fc", borderRadius: 12, padding: 28, height: "100%" }}>
                    <h3 style={{ marginTop: 0 }}>Where we add value</h3>
                    <p style={{ color: "#516076", lineHeight: 1.8 }}>
                      We sit between business strategy and technical delivery. That means you get advice, design, implementation, and practical rollout support in one place.
                    </p>
                    <ul style={{ paddingLeft: 18, lineHeight: 1.9, marginBottom: 0, color: "#516076" }}>
                      {fitList.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <div style={{ padding: "8px 0" }}>
                    <h2 style={{ marginTop: 0 }}>What we can help with</h2>
                    <p style={{ fontSize: 17, lineHeight: 1.8, color: "#516076" }}>
                      Some businesses come to us with a clear brief. Others simply know their systems are clunky, their team is overloaded, or they need a better plan for AI. Both are fine. We can start with strategy, or move straight into delivery where the need is already obvious.
                    </p>
                  </div>
                </GridItem>
              </GridContainer>
            </div>

            <div style={{ padding: "10px 0 45px" }}>
              <GridContainer spacing={24}>
                {serviceGroups.map(group => (
                  <GridItem xs={12} sm={6} md={6} key={group.title}>
                    <div style={{ height: "100%", border: "1px solid #e7ecf3", borderRadius: 12, padding: 28, background: "#fff", boxShadow: "0 8px 24px rgba(28,49,88,0.04)" }}>
                      <h3 style={{ marginTop: 0 }}>{group.title}</h3>
                      <p style={{ color: "#516076", lineHeight: 1.8 }}>{group.summary}</p>
                      <ul style={{ paddingLeft: 18, marginBottom: 0, color: "#516076", lineHeight: 1.9 }}>
                        {group.bullets.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  </GridItem>
                ))}
              </GridContainer>
            </div>

            <div style={{ padding: "5px 0 80px" }}>
              <div style={{ background: "linear-gradient(135deg, #0d1f36 0%, #144f8f 100%)", borderRadius: 14, padding: "36px 32px", color: "#fff" }}>
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={12} md={8}>
                    <h2 style={{ marginTop: 0, color: "#fff" }}>Not sure which service you need yet?</h2>
                    <p style={{ margin: 0, lineHeight: 1.8, opacity: 0.92 }}>
                      That is normal. We can start with a discovery call, map the problem, and recommend the right first project based on effort, value, and readiness.
                    </p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} style={{ textAlign: "right" }}>
                    <Button color="primary" size="lg" component={Link} to="/contact">
                      Speak with NextGenius
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

export default withStyles(servicePageStyle)(ServicePage);
