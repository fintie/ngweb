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

const scenarios = [
  {
    title: "Internal knowledge assistant",
    problem: "Staff waste time digging through folders, emails, old quotes, and PDFs to answer routine questions.",
    solution: "Create a secure AI assistant that uses your policies, SOPs, service notes, and templates to provide fast, traceable answers.",
    outcome: "Faster onboarding, fewer interruptions to senior staff, and more consistent answers across the team."
  },
  {
    title: "Admin automation",
    problem: "Too much time disappears into data entry, follow-ups, status chasing, and repetitive back-office work.",
    solution: "Automate common admin steps between forms, email, CRM, job systems, finance tools, and internal approvals.",
    outcome: "Less manual handling, fewer missed steps, and more time for work that actually needs a person."
  },
  {
    title: "Proposal and quote support",
    problem: "Sales and service teams rebuild similar proposals, scopes, and pricing notes from scratch too often.",
    solution: "Use AI-assisted drafting with your past proposals, pricing logic, service inclusions, and approval rules.",
    outcome: "Quicker turnaround, stronger consistency, and less bottleneck around key staff."
  },
  {
    title: "Customer support assistant",
    problem: "Customers and support staff ask the same questions repeatedly, but answers vary depending on who replies.",
    solution: "Deploy an assistant for internal support teams or customer self-service using approved business knowledge and workflows.",
    outcome: "Better response speed, clearer answers, and less repetitive support load."
  },
  {
    title: "Team productivity assistant",
    problem: "Managers and teams juggle tasks, documents, follow-ups, and disconnected tools with too much context switching.",
    solution: "Set up role-based assistants that help retrieve information, draft updates, summarise work, and trigger next actions.",
    outcome: "More follow-through, better visibility, and less time lost between systems."
  },
  {
    title: "Operations workflow assistant",
    problem: "Operations depends on manual handovers between sales, delivery, service, and admin, which creates delays and errors.",
    solution: "Connect systems and embed AI support into workflows so information moves cleanly and teams know the next step.",
    outcome: "Smoother delivery, better accountability, and fewer operational gaps."
  }
];

const industries = [
  "Professional services firms that need better internal knowledge access and proposal support",
  "Trades, field service, and maintenance businesses managing quotes, jobs, and admin handovers",
  "Healthcare, allied health, and specialist service providers improving internal coordination and information flow",
  "Manufacturing and distribution teams looking to reduce repetitive admin and improve process visibility",
  "Property, construction, and project-based businesses coordinating documents, approvals, and client communication"
];

const packages = [
  {
    title: "Discovery and roadmap",
    text: "Best for SMEs that know there is opportunity but need clarity on priorities, risks, and the right first project.",
    includes: ["Stakeholder discovery", "Current-state review", "Use-case shortlist", "Recommended roadmap"]
  },
  {
    title: "Pilot project",
    text: "Best for businesses ready to prove one practical use case such as knowledge search, admin automation, or proposal support.",
    includes: ["Focused solution design", "Pilot build or setup", "Testing with your team", "Refinement before wider rollout"]
  },
  {
    title: "Connected delivery",
    text: "Best for businesses that need a broader solution involving integrations, assistant setup, custom tools, and process redesign.",
    includes: ["Multi-step implementation", "System integration", "Change support", "Ongoing improvement plan"]
  }
];

class UseCasesPage extends React.Component {
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
                  <h2 className={classes.title}>SME use cases that solve everyday business friction.</h2>
                  <h4 className={classes.subtitle} style={{ maxWidth: 820 }}>
                    We focus on practical scenarios where AI, automation, connected tools, and custom internal systems can save time and improve service.
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
                    <h3 style={{ marginTop: 0 }}>How to use this page</h3>
                    <p style={{ color: "#516076", lineHeight: 1.8, marginBottom: 0 }}>
                      If one of these scenarios sounds familiar, it is usually a good sign that the business is ready for a discovery session or pilot project. You do not need a perfect brief up front.
                    </p>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <div style={{ padding: "8px 0" }}>
                    <h2 style={{ marginTop: 0 }}>Common scenarios we can help with</h2>
                    <p style={{ fontSize: 17, lineHeight: 1.8, color: "#516076" }}>
                      Most SMEs do not need a moonshot AI program. They need a sensible way to remove friction, improve consistency, and help the team do better work with the systems they already rely on.
                    </p>
                  </div>
                </GridItem>
              </GridContainer>
            </div>

            <div style={{ padding: "10px 0 45px" }}>
              <GridContainer spacing={24}>
                {scenarios.map(item => (
                  <GridItem xs={12} sm={6} md={6} key={item.title}>
                    <div style={{ height: "100%", border: "1px solid #e7ecf3", borderRadius: 12, padding: 28, background: "#fff" }}>
                      <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                      <div style={{ color: "#2e3b4e", fontWeight: 700, marginBottom: 8 }}>Typical problem</div>
                      <p style={{ color: "#516076", lineHeight: 1.8 }}>{item.problem}</p>
                      <div style={{ color: "#2e3b4e", fontWeight: 700, marginBottom: 8 }}>Possible solution</div>
                      <p style={{ color: "#516076", lineHeight: 1.8 }}>{item.solution}</p>
                      <div style={{ color: "#2e3b4e", fontWeight: 700, marginBottom: 8 }}>Business outcome</div>
                      <p style={{ color: "#516076", lineHeight: 1.8, marginBottom: 0 }}>{item.outcome}</p>
                    </div>
                  </GridItem>
                ))}
              </GridContainer>
            </div>

            <div style={{ padding: "0 0 40px" }}>
              <GridContainer spacing={24}>
                <GridItem xs={12} sm={12} md={5}>
                  <div style={{ background: "linear-gradient(135deg, #09366b 0%, #01acc8 100%)", color: "#fff", borderRadius: 12, padding: 30, height: "100%" }}>
                    <h3 style={{ marginTop: 0, color: "#fff" }}>Industries and situations</h3>
                    <ul style={{ paddingLeft: 18, lineHeight: 1.9, marginBottom: 0 }}>
                      {industries.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                  <div style={{ background: "#f7f9fc", borderRadius: 12, padding: 30, height: "100%" }}>
                    <h3 style={{ marginTop: 0 }}>Typical ways we package the work</h3>
                    {packages.map(item => (
                      <div key={item.title} style={{ marginBottom: 22 }}>
                        <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                        <div style={{ color: "#516076", lineHeight: 1.8, marginBottom: 8 }}>{item.text}</div>
                        <div style={{ color: "#516076", lineHeight: 1.8 }}>{item.includes.join(" • ")}</div>
                      </div>
                    ))}
                  </div>
                </GridItem>
              </GridContainer>
            </div>

            <div style={{ padding: "5px 0 80px" }}>
              <div style={{ background: "#10233f", borderRadius: 14, padding: "36px 32px", color: "#fff" }}>
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={12} md={8}>
                    <h2 style={{ marginTop: 0, color: "#fff" }}>Want to test one use case first?</h2>
                    <p style={{ margin: 0, lineHeight: 1.8, opacity: 0.92 }}>
                      We can help you choose a realistic pilot that is small enough to move quickly and useful enough to prove value.
                    </p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} style={{ textAlign: "right" }}>
                    <Button color="primary" size="lg" component={Link} to="/contact">
                      Discuss a Use Case
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

export default withStyles(servicePageStyle)(UseCasesPage);
