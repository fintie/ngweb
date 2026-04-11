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

import workshopImage1 from "assets/img/workshop-01.jpg";
import workshopImage2 from "assets/img/workshop-02.jpg";
import workshopImage3 from "assets/img/workshop-03.jpg";
import workshopImage4 from "assets/img/workshop-04.jpg";
import workshopImage5 from "assets/img/workshop-05.jpg";
import workshopImage6 from "assets/img/workshop-06.jpg";
import workshopImage7 from "assets/img/workshop-07.jpg";
import workshopImage8 from "assets/img/workshop-08.jpg";

const workshopImages = [
  workshopImage1,
  workshopImage2,
  workshopImage3,
  workshopImage4,
  workshopImage5,
  workshopImage6,
  workshopImage7,
  workshopImage8
];

const workshopTopics = [
  {
    title: "AI Agent Design & Development",
    description: "Learn how to design, build, and deploy AI agents that automate workflows, interact with business systems, and support real operational tasks. We cover agent architecture, prompt engineering, tool use, and integration patterns that produce reliable, outcome-driven assistants.",
    highlights: [
      "Agent architectures and decision flows",
      "Task planning and multi-agent coordination",
      "Tool calling and external-system integration",
      "Evaluation, safety, and guardrails"
    ]
  },
  {
    title: "Machine Learning for Business",
    description: "A practical introduction to machine learning concepts focused on business use cases. Understand when ML is the right approach, how to prepare data, and how to move from experiments to production-ready models that deliver measurable value.",
    highlights: [
      "Supervised and unsupervised learning basics",
      "Feature engineering and data preparation",
      "Model training, validation, and deployment",
      "Monitoring and model lifecycle management"
    ]
  },
  {
    title: "MCP (Model Context Protocol)",
    description: "Explore the Model Context Protocol that enables AI assistants to connect with external tools, APIs, and data sources. Learn how MCP standardises the way agents interact with business systems, databases, and third-party services.",
    highlights: [
      "MCP architecture and server setup",
      "Building custom tools and resources",
      "Security, authentication, and access control",
      "Real-world integration patterns"
    ]
  },
  {
    title: "Agent Skills & Capability Design",
    description: "Define what your AI agent can actually do. This session covers skill identification, capability scoping, and designing reliable agent behaviours so the assistant performs consistently across different business contexts.",
    highlights: [
      "Skill mapping and capability matrices",
      "Prompt patterns for reliable execution",
      "Memory, context management, and state",
      "Testing and iterative improvement"
    ]
  },
  {
    title: "Harness Engineering",
    description: "Harness Engineering covers the scaffolding, testing frameworks, and orchestration layers that keep AI agents reliable in production. Learn how to build evaluation harnesses, monitoring systems, and feedback loops that maintain quality as your agent scales.",
    highlights: [
      "Evaluation frameworks and benchmarking",
      "Observability, logging, and tracing",
      "Feedback loops and continuous improvement",
      "Production deployment and rollback strategies"
    ]
  }
];

class WorkshopPage extends React.Component {
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
          <div style={{ position: "absolute", inset: 0, background: "rgba(6, 18, 34, 0.58)" }} />
          <div className={classes.container} style={{ position: "relative", zIndex: 2 }}>
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={10}>
                  <h2 className={classes.title} style={{ color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.28)" }}>AI Agent, Machine Learning & Automation Workshops</h2>
                  <h4 className={classes.subtitle} style={{ maxWidth: 820, color: "rgba(255,255,255,0.92)", textShadow: "0 2px 10px rgba(0,0,0,0.24)" }}>
                    Practical, hands-on workshops that help teams understand and implement AI agents, MCP integrations, machine learning, and harness engineering for real business outcomes.
                  </h4>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <div style={{ padding: "70px 0 45px" }}>
              <GridContainer spacing={24}>
                <GridItem xs={12} sm={12} md={12}>
                  <div style={{ background: "#fff", border: "1px solid #e7ecf3", borderRadius: 12, padding: 22 }}>
                    <h2 style={{ marginTop: 0, marginBottom: 6, color: "#111827" }}>What you will learn</h2>
                    <p style={{ color: "#516076", lineHeight: 1.7, marginTop: 0, marginBottom: 0 }}>
                      Our workshops are designed for teams that want practical experience with AI agents, automation, and connected systems. Each session combines theory, live demos, and hands-on activities tailored to your business context.
                    </p>
                  </div>
                </GridItem>

                {/* Row: Topic 1 + Image */}
                <GridItem xs={12} sm={6} md={6}>
                  <div style={{ height: "100%", border: "1px solid #e7ecf3", borderRadius: 12, padding: 18, background: "#fff", boxShadow: "0 8px 24px rgba(28,49,88,0.04)" }}>
                    <h3 style={{ marginTop: 0, marginBottom: 6, color: "#111827" }}>{workshopTopics[0].title}</h3>
                    <p style={{ color: "#516076", lineHeight: 1.7, marginTop: 0, marginBottom: 4 }}>{workshopTopics[0].description}</p>
                    <ul style={{ paddingLeft: 18, marginBottom: 0, color: "#516076", lineHeight: 1.8 }}>
                      {workshopTopics[0].highlights.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                  <div style={{ height: "100%", borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 28px rgba(28,49,88,0.08)", background: "#f7f9fc" }}>
                    <img src={workshopImages[0]} alt="Workshop session 1" style={{ width: "100%", height: "100%", minHeight: 280, objectFit: "cover", display: "block" }} />
                  </div>
                </GridItem>

                {/* Image row */}
                <GridItem xs={12} sm={3} md={3}>
                  <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 28px rgba(28,49,88,0.08)", background: "#f7f9fc" }}>
                    <img src={workshopImages[1]} alt="Workshop session 2" style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
                  </div>
                </GridItem>
                <GridItem xs={12} sm={3} md={3}>
                  <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 28px rgba(28,49,88,0.08)", background: "#f7f9fc" }}>
                    <img src={workshopImages[2]} alt="Workshop session 3" style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
                  </div>
                </GridItem>
                <GridItem xs={12} sm={3} md={3}>
                  <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 28px rgba(28,49,88,0.08)", background: "#f7f9fc" }}>
                    <img src={workshopImages[3]} alt="Workshop session 4" style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
                  </div>
                </GridItem>
                <GridItem xs={12} sm={3} md={3}>
                  <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 28px rgba(28,49,88,0.08)", background: "#f7f9fc" }}>
                    <img src={workshopImages[4]} alt="Workshop session 5" style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
                  </div>
                </GridItem>

                {/* Row: Topic 2 + Image */}
                <GridItem xs={12} sm={6} md={6}>
                  <div style={{ height: "100%", border: "1px solid #e7ecf3", borderRadius: 12, padding: 18, background: "#fff", boxShadow: "0 8px 24px rgba(28,49,88,0.04)" }}>
                    <h3 style={{ marginTop: 0, marginBottom: 6, color: "#111827" }}>{workshopTopics[1].title}</h3>
                    <p style={{ color: "#516076", lineHeight: 1.7, marginTop: 0, marginBottom: 4 }}>{workshopTopics[1].description}</p>
                    <ul style={{ paddingLeft: 18, marginBottom: 0, color: "#516076", lineHeight: 1.8 }}>
                      {workshopTopics[1].highlights.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                  <div style={{ height: "100%", borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 28px rgba(28,49,88,0.08)", background: "#f7f9fc" }}>
                    <img src={workshopImages[5]} alt="Workshop session 6" style={{ width: "100%", height: "100%", minHeight: 280, objectFit: "cover", display: "block" }} />
                  </div>
                </GridItem>

                {/* Row: Topic 3 + Image */}
                <GridItem xs={12} sm={6} md={6}>
                  <div style={{ height: "100%", border: "1px solid #e7ecf3", borderRadius: 12, padding: 18, background: "#fff", boxShadow: "0 8px 24px rgba(28,49,88,0.04)" }}>
                    <h3 style={{ marginTop: 0, marginBottom: 6, color: "#111827" }}>{workshopTopics[2].title}</h3>
                    <p style={{ color: "#516076", lineHeight: 1.7, marginTop: 0, marginBottom: 4 }}>{workshopTopics[2].description}</p>
                    <ul style={{ paddingLeft: 18, marginBottom: 0, color: "#516076", lineHeight: 1.8 }}>
                      {workshopTopics[2].highlights.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                  <div style={{ height: "100%", borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 28px rgba(28,49,88,0.08)", background: "#f7f9fc" }}>
                    <img src={workshopImages[6]} alt="Workshop session 7" style={{ width: "100%", height: "100%", minHeight: 280, objectFit: "cover", display: "block" }} />
                  </div>
                </GridItem>

                {/* Row: Topic 4 + Image */}
                <GridItem xs={12} sm={6} md={6}>
                  <div style={{ height: "100%", border: "1px solid #e7ecf3", borderRadius: 12, padding: 18, background: "#fff", boxShadow: "0 8px 24px rgba(28,49,88,0.04)" }}>
                    <h3 style={{ marginTop: 0, marginBottom: 6, color: "#111827" }}>{workshopTopics[3].title}</h3>
                    <p style={{ color: "#516076", lineHeight: 1.7, marginTop: 0, marginBottom: 4 }}>{workshopTopics[3].description}</p>
                    <ul style={{ paddingLeft: 18, marginBottom: 0, color: "#516076", lineHeight: 1.8 }}>
                      {workshopTopics[3].highlights.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                  <div style={{ height: "100%", borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 28px rgba(28,49,88,0.08)", background: "#f7f9fc" }}>
                    <img src={workshopImages[7]} alt="Workshop session 8" style={{ width: "100%", height: "100%", minHeight: 280, objectFit: "cover", display: "block" }} />
                  </div>
                </GridItem>

                <GridItem xs={12} sm={6} md={6}>
                  <div style={{ height: "100%", border: "1px solid #e7ecf3", borderRadius: 12, padding: 18, background: "#fff", boxShadow: "0 8px 24px rgba(28,49,88,0.04)" }}>
                    <h3 style={{ marginTop: 0, marginBottom: 6, color: "#111827" }}>{workshopTopics[4].title}</h3>
                    <p style={{ color: "#516076", lineHeight: 1.7, marginTop: 0, marginBottom: 4 }}>{workshopTopics[4].description}</p>
                    <ul style={{ paddingLeft: 18, marginBottom: 0, color: "#516076", lineHeight: 1.8 }}>
                      {workshopTopics[4].highlights.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </GridItem>
              </GridContainer>
            </div>

            <div style={{ padding: "0 0 45px" }}>
              <div style={{ background: "linear-gradient(135deg, #0d1f36 0%, #144f8f 100%)", borderRadius: 14, padding: "36px 32px", color: "#fff" }}>
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={12} md={8}>
                    <h2 style={{ marginTop: 0, color: "#fff" }}>Ready to upskill your team?</h2>
                    <p style={{ margin: "0 0 14px", lineHeight: 1.8, opacity: 0.92 }}>
                      Book a discovery call and we will design a workshop that fits your team's goals, experience level, and business priorities.
                    </p>
                    <p style={{ margin: 0, lineHeight: 1.8, opacity: 0.92 }}>
                      Whether you are exploring AI for the first time or scaling an existing agent program, we will help you make practical progress fast.
                    </p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} style={{ textAlign: "right" }}>
                    <Button color="primary" size="lg" component={Link} to="/contact">
                      Book a Workshop
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

export default withStyles(servicePageStyle)(WorkshopPage);
