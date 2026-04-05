import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Timeline from "@material-ui/icons/Timeline";
import SettingsEthernet from "@material-ui/icons/SettingsEthernet";
import Build from "@material-ui/icons/Build";
import Memory from "@material-ui/icons/Memory";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { Link } from "react-router-dom";
import landingPageStyle from "assets/jss/next-genius/views/landingPage.jsx";

const services = [
  {
    icon: Timeline,
    title: "AI strategy for real business priorities",
    text: "We help you work out where AI fits, what to do first, and how to avoid wasting money on tools that do not solve the actual problem."
  },
  {
    icon: Memory,
    title: "Business knowledge systems your team can actually use",
    text: "Turn manuals, SOPs, quotes, policies, and customer information into a searchable AI assistant so staff can find answers faster and stay consistent."
  },
  {
    icon: SettingsEthernet,
    title: "Connected systems and smarter handovers",
    text: "We connect your tools so information moves between sales, operations, service, and admin with less rework, less copying, and fewer missed steps."
  },
  {
    icon: Build,
    title: "Custom software, portals, and internal tools",
    text: "When off-the-shelf software does not fit your process, we build practical internal systems, customer portals, and web platforms around the way you already work."
  }
];

const outcomes = [
  "Reduce repetitive admin work and manual data handling",
  "Give staff faster access to business knowledge and standard answers",
  "Improve follow-up, service consistency, and internal accountability",
  "Create a clearer path from idea to rollout without technical confusion"
];

const process = [
  {
    title: "1. Discovery",
    text: "We learn how your business runs today, where the bottlenecks are, and what an improved future state should look like."
  },
  {
    title: "2. Roadmap",
    text: "We recommend the right mix of AI, automation, integration, and software work based on business value, not hype."
  },
  {
    title: "3. Delivery",
    text: "We design, configure, build, and connect the solution with practical milestones and clear communication."
  },
  {
    title: "4. Support",
    text: "We help with adoption, refinement, training, and the next stage once the first improvements are working."
  }
];

const useCases = [
  "Internal knowledge assistants for team policies, SOPs, and business documents",
  "Admin automation for repetitive tasks, follow-ups, and routine coordination",
  "Proposal and quote support using your existing templates and service patterns",
  "Customer support assistants for repeat enquiries and more consistent responses"
];

class LandingPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;

    return (
      <div>
        <Header
          color="transparent"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 100,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("assets/img/home.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <div style={{ padding: "180px 0 110px" }}>
                  <div style={{ letterSpacing: 1.5, fontSize: 13, fontWeight: 600, textTransform: "uppercase", opacity: 0.9 }}>
                    AI Consulting & Digital Solutions for SMEs
                  </div>
                  <h1 className={classes.title} style={{ marginBottom: 12 }}>
                    Practical AI and software solutions for growing Australian businesses.
                  </h1>
                  <h4 className={classes.subtitle} style={{ maxWidth: 760, margin: 0 }}>
                    NextGenius helps small and medium businesses improve operations, reduce repetitive work, connect systems, and roll out AI in a way that makes sense for the team.
                  </h4>
                  <div style={{ marginTop: 30, display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <Button color="primary" size="lg" component={Link} to="/contact">
                      Book a Discovery Call
                    </Button>
                    <Button color="white" size="lg" component={Link} to="/service">
                      Explore Services
                    </Button>
                  </div>
                  <div style={{ marginTop: 28, display: "flex", gap: 24, flexWrap: "wrap", fontSize: 15 }}>
                    <span>AI strategy</span>
                    <span>Workflow automation</span>
                    <span>Knowledge assistants</span>
                    <span>Custom internal tools</span>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <div style={{ padding: "70px 0 30px" }}>
              <GridContainer spacing={24}>
                <GridItem xs={12} sm={12} md={5}>
                  <h2 style={{ marginTop: 0 }}>Technology should make the business easier to run.</h2>
                  <p style={{ fontSize: 17, lineHeight: 1.8, color: "#516076" }}>
                    Many SME owners know there is room to improve, but they do not need a long list of buzzwords. They need a practical plan. We translate AI, automation, integrations, and custom software into clear steps that save time, improve service, and support growth.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.8, color: "#516076" }}>
                    Whether you need better internal systems, a smarter way to use your business information, or help connecting your tools, we focus on useful outcomes your staff can adopt.
                  </p>
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                  <div style={{ background: "#f7f9fc", borderRadius: 10, padding: 28, boxShadow: "0 10px 30px rgba(28,49,88,0.08)" }}>
                    <h3 style={{ marginTop: 0 }}>What clients usually want fixed</h3>
                    {outcomes.map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", marginBottom: 18 }}>
                        <CheckCircle style={{ color: "#4caf50", marginRight: 12, marginTop: 2 }} />
                        <span style={{ color: "#3c4858", fontSize: 16, lineHeight: 1.7 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </GridItem>
              </GridContainer>
            </div>

            <div style={{ padding: "30px 0 40px" }}>
              <div style={{ textAlign: "center", marginBottom: 35 }}>
                <h2 style={{ marginBottom: 12 }}>Core services</h2>
                <p style={{ maxWidth: 780, margin: "0 auto", color: "#516076", fontSize: 17, lineHeight: 1.8 }}>
                  We combine consulting, delivery, and support so your business gets practical improvement rather than isolated technical work.
                </p>
              </div>
              <GridContainer spacing={24}>
                {services.map(service => {
                  const Icon = service.icon;
                  return (
                    <GridItem xs={12} sm={6} md={6} key={service.title}>
                      <div style={{ height: "100%", padding: 28, border: "1px solid #e7ecf3", borderRadius: 10, background: "#fff" }}>
                        <Icon style={{ fontSize: 42, color: "#01acc8", marginBottom: 16 }} />
                        <h3 style={{ marginTop: 0 }}>{service.title}</h3>
                        <p style={{ marginBottom: 0, color: "#516076", fontSize: 16, lineHeight: 1.8 }}>{service.text}</p>
                      </div>
                    </GridItem>
                  );
                })}
              </GridContainer>
            </div>

            <div style={{ padding: "20px 0 40px" }}>
              <GridContainer spacing={24}>
                <GridItem xs={12} sm={12} md={6}>
                  <div style={{ background: "linear-gradient(135deg, #09366b 0%, #01acc8 100%)", color: "#fff", borderRadius: 12, padding: 30, height: "100%" }}>
                    <h3 style={{ marginTop: 0, color: "#fff" }}>Special focus areas</h3>
                    <p style={{ fontSize: 16, lineHeight: 1.8, opacity: 0.95 }}>
                      We help businesses adopt newer AI capabilities in plain language and tie them to everyday work.
                    </p>
                    <ul style={{ paddingLeft: 18, lineHeight: 1.9, marginBottom: 0 }}>
                      <li>RAG knowledge systems that answer questions using your own documents and business information</li>
                      <li>MCP-style integrations that let systems and assistants work across multiple business tools</li>
                      <li>AI skills and workflow automation that reduce repetitive tasks and handover delays</li>
                      <li>OpenClaw personal or business assistant setup for operational support, follow-up, and information access</li>
                    </ul>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <div style={{ background: "#f7f9fc", borderRadius: 12, padding: 30, height: "100%" }}>
                    <h3 style={{ marginTop: 0 }}>A straightforward delivery approach</h3>
                    {process.map(step => (
                      <div key={step.title} style={{ marginBottom: 22 }}>
                        <div style={{ fontWeight: 700, marginBottom: 6 }}>{step.title}</div>
                        <div style={{ color: "#516076", lineHeight: 1.8 }}>{step.text}</div>
                      </div>
                    ))}
                  </div>
                </GridItem>
              </GridContainer>
            </div>

            <div style={{ padding: "0 0 40px" }}>
              <GridContainer spacing={24}>
                <GridItem xs={12} sm={12} md={7}>
                  <div style={{ background: "#fff", border: "1px solid #e7ecf3", borderRadius: 12, padding: 30, height: "100%" }}>
                    <h3 style={{ marginTop: 0 }}>Popular SME scenarios</h3>
                    <p style={{ color: "#516076", lineHeight: 1.8 }}>
                      Many projects begin with a use case the business already feels every week. Start with one scenario, prove the value, then build from there.
                    </p>
                    <ul style={{ paddingLeft: 18, lineHeight: 1.9, marginBottom: 24, color: "#516076" }}>
                      {useCases.map(item => <li key={item}>{item}</li>)}
                    </ul>
                    <Button color="primary" component={Link} to="/use-cases">
                      See Use Cases
                    </Button>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <div style={{ background: "#f7f9fc", borderRadius: 12, padding: 30, height: "100%" }}>
                    <h3 style={{ marginTop: 0 }}>Best suited for</h3>
                    <p style={{ color: "#516076", lineHeight: 1.8 }}>
                      Australian SMEs that want practical gains in service, operations, admin, and knowledge management without overcomplicating the rollout.
                    </p>
                    <p style={{ color: "#516076", lineHeight: 1.8, marginBottom: 0 }}>
                      That might mean a pilot assistant, a connected workflow, a custom internal portal, or a clearer AI roadmap before investing further.
                    </p>
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

export default withStyles(landingPageStyle)(LandingPage);
