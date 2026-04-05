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
import serviceImage1 from "assets/img/services/service-1.jpg";
import serviceImage2 from "assets/img/services/service-2.jpg";
import serviceImage3 from "assets/img/services/service-3.jpg";

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

const serviceImages = [
  {
    src: serviceImage1,
    alt: "Creative AI art experience"
  },
  {
    src: serviceImage2,
    alt: "Immersive digital environment"
  },
  {
    src: serviceImage3,
    alt: "AI-powered creative workspace"
  }
];

const fitList = [
  "You know there is too much manual work but are not sure what to automate first",
  "Your team loses time searching for information across emails, folders, chats, and systems",
  "You want to use AI safely and practically without adding confusion or risk",
  "Your current software stack does not match the way the business actually operates",
  "You need a partner who can advise, build, and connect systems rather than hand off a slide deck"
];

const deliveryPackages = [
  {
    title: "Strategy and scoping",
    text: "A short engagement to define the right first move, useful for businesses that want clarity before building.",
    items: ["Discovery workshops", "Current-process review", "Priority use cases", "Recommended roadmap"]
  },
  {
    title: "Pilot and prove value",
    text: "A focused build for one practical use case so the team can test value quickly before broader rollout.",
    items: ["Pilot assistant or automation", "Small-scale integration", "User testing", "Measured next-step recommendations"]
  },
  {
    title: "Design, build, and rollout",
    text: "A broader delivery model for businesses that already know the direction and need help getting it into production.",
    items: ["Solution design", "Implementation", "Change support", "Ongoing optimisation"]
  }
];

const scenarios = [
  "Internal knowledge assistant for staff who need faster access to policies, SOPs, and answers",
  "Admin automation for repetitive tasks, handovers, and follow-up work",
  "Proposal and quote support using your templates, scope patterns, and approval rules",
  "Customer support assistant for repeat questions and better service consistency",
  "Team productivity assistant for summaries, document retrieval, and daily follow-through",
  "Operations workflow assistant connecting sales, delivery, admin, and support"
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
                {serviceGroups.map((group, index) => (
                  <React.Fragment key={group.title}>
                    <GridItem xs={12} sm={6} md={6}>
                      <div style={{ height: "100%", border: "1px solid #e7ecf3", borderRadius: 12, padding: 28, background: "#fff", boxShadow: "0 8px 24px rgba(28,49,88,0.04)" }}>
                        <h3 style={{ marginTop: 0 }}>{group.title}</h3>
                        <p style={{ color: "#516076", lineHeight: 1.8 }}>{group.summary}</p>
                        <ul style={{ paddingLeft: 18, marginBottom: 0, color: "#516076", lineHeight: 1.9 }}>
                          {group.bullets.map(item => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    </GridItem>
                    {[1, 3, 5].includes(index) ? (
                      <GridItem xs={12} sm={6} md={6}>
                        <div style={{ height: "100%", borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 28px rgba(28,49,88,0.08)", background: "#f7f9fc", position: "relative" }}>
                          <img
                            src={serviceImages[Math.floor(index / 2)].src}
                            alt={serviceImages[Math.floor(index / 2)].alt}
                            style={{ width: "100%", height: "100%", minHeight: 320, objectFit: "cover", display: "block" }}
                          />
                        </div>
                      </GridItem>
                    ) : null}
                  </React.Fragment>
                ))}
              </GridContainer>
            </div>

            <div style={{ padding: "0 0 45px" }}>
              <GridContainer spacing={24}>
                <GridItem xs={12} sm={12} md={7}>
                  <div style={{ background: "#fff", border: "1px solid #e7ecf3", borderRadius: 12, padding: 30, height: "100%" }}>
                    <h2 style={{ marginTop: 0 }}>Typical SME use cases</h2>
                    <p style={{ color: "#516076", lineHeight: 1.8 }}>
                      We usually start with a business situation the team already recognises, then design the right mix of AI, automation, integration, and custom tooling around it.
                    </p>
                    <ul style={{ paddingLeft: 18, marginBottom: 20, color: "#516076", lineHeight: 1.9 }}>
                      {scenarios.map(item => <li key={item}>{item}</li>)}
                    </ul>
                    <Button color="primary" component={Link} to="/use-cases">
                      Explore Use Cases
                    </Button>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <div style={{ background: "#f7f9fc", borderRadius: 12, padding: 30, height: "100%" }}>
                    <h2 style={{ marginTop: 0 }}>How engagements usually start</h2>
                    {deliveryPackages.map(item => (
                      <div key={item.title} style={{ marginBottom: 22 }}>
                        <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                        <div style={{ color: "#516076", lineHeight: 1.8, marginBottom: 8 }}>{item.text}</div>
                        <div style={{ color: "#516076", lineHeight: 1.8 }}>{item.items.join(" • ")}</div>
                      </div>
                    ))}
                  </div>
                </GridItem>
              </GridContainer>
            </div>

            <div style={{ padding: "0 0 45px" }}>
              <div style={{ background: "linear-gradient(135deg, #0d1f36 0%, #144f8f 100%)", borderRadius: 14, padding: "36px 32px", color: "#fff" }}>
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={12} md={8}>
                    <h2 style={{ marginTop: 0, color: "#fff" }}>What working together looks like</h2>
                    <p style={{ margin: "0 0 14px", lineHeight: 1.8, opacity: 0.92 }}>
                      Start with discovery, choose a sensible first project, build something useful, and keep improving once the team is using it. No inflated transformation language. Just practical progress.
                    </p>
                    <p style={{ margin: 0, lineHeight: 1.8, opacity: 0.92 }}>
                      We can support a one-off project, a pilot, or a broader delivery program depending on where the business is up to.
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
