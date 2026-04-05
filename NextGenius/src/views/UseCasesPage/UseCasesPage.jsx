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
import caseScreenshot from "assets/img/use-cases/case-screenshot.jpg";
import processFlow from "assets/img/use-cases/process-flow.jpg";
import videoCollage from "assets/img/use-cases/video-collage.jpg";

const signals = [
  "Repeating the same answers across email, phone, and chat",
  "Too many handovers between admin, sales, and delivery",
  "Quotes, proposals, or reports taking longer than they should",
  "Knowledge trapped in inboxes, folders, and a few key staff"
];

const scenarios = [
  {
    title: "Internal knowledge assistant",
    summary: "Help staff find the right answer fast.",
    problem: "Policies, SOPs, service notes, and templates are hard to search when the team is busy.",
    outcome: "Faster onboarding and fewer interruptions to senior staff.",
    accent: "#0b4b8c"
  },
  {
    title: "Admin automation",
    summary: "Reduce repetitive back-office work.",
    problem: "Data entry, follow-ups, status chasing, and routine updates keep stealing time.",
    outcome: "Less manual handling and more time for higher-value work.",
    accent: "#01acc8"
  },
  {
    title: "Proposal and quote support",
    summary: "Draft common documents with more consistency.",
    problem: "Teams keep rebuilding similar proposals, scopes, and pricing notes from scratch.",
    outcome: "Quicker turnaround and less bottleneck around key people.",
    accent: "#4f46e5"
  },
  {
    title: "Customer support assistant",
    summary: "Give staff and customers clearer answers.",
    problem: "Common questions repeat often, but the quality of answers varies.",
    outcome: "Better response speed and a lighter support load.",
    accent: "#0f766e"
  }
];

const visualExamples = [
  {
    title: "Case screenshot",
    label: "Screenshot / UI preview",
    caption: "A real interface example helps show the quality and style of the product experience clients can expect.",
    type: "image",
    image: caseScreenshot,
    imageAlt: "NextGenius case screenshot"
  },
  {
    title: "Process flow",
    label: "Process / flow preview",
    caption: "A visual systems flow makes it easier to explain how users, channels, AI, and backend services connect.",
    type: "flow",
    image: processFlow,
    imageAlt: "NextGenius process flow"
  },
  {
    title: "Video examples",
    label: "Visual showcase",
    caption: "This gallery-style screenshot gives a stronger visual sense of the kinds of demos, walkthroughs, and immersive experiences that can be presented.",
    type: "image",
    image: videoCollage,
    imageAlt: "NextGenius video examples collage"
  }
];

const packages = [
  {
    title: "Discovery",
    text: "Clarify the best first use case, risks, and roadmap.",
    includes: ["Current-state review", "Priority shortlist", "Delivery plan"]
  },
  {
    title: "Pilot",
    text: "Test one practical workflow or assistant with your team.",
    includes: ["Focused build", "Real user testing", "Refinement"]
  },
  {
    title: "Connected delivery",
    text: "Roll out a broader solution with integrations and process change.",
    includes: ["Multi-step implementation", "System integration", "Improvement plan"]
  }
];

class UseCasesPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;

    return (
      <div>
        <Header color="white" rightLinks={<HeaderLinks />} fixed {...rest} />
        <Parallax small filter image={require("assets/img/city.jpg")}>
          <div className={classes.container}>
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={10}>
                  <h2 className={classes.title}>Use cases for SMEs that want practical AI, not hype.</h2>
                  <h4 className={classes.subtitle} style={{ maxWidth: 780 }}>
                    We focus on simple, useful improvements: better knowledge access, less admin friction, and more consistent delivery.
                  </h4>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <div style={{ padding: "12px 0 0" }}>
              <GridContainer spacing={24} alignItems="stretch">
                <GridItem xs={12} sm={12} md={7}>
                  <div style={{ paddingRight: 8, marginTop: 0 }}>
                    <div style={{ letterSpacing: 1.2, fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#0b4b8c", marginBottom: 4 }}>
                      Where we usually start
                    </div>
                    <div style={{ marginTop: 0, marginBottom: 10, fontSize: 17, lineHeight: 1.7, color: "#516076", fontWeight: 400 }}>
                      Most good projects begin with one frustrating, repeatable problem.
                    </div>
                    <p style={{ fontSize: 17, lineHeight: 1.7, color: "#516076", marginBottom: 0 }}>
                      If your team is repeating answers, re-entering data, or rebuilding common documents every week, there is usually a sensible pilot worth testing.
                    </p>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <div style={{ background: "#f7f9fc", borderRadius: 14, padding: 28, height: "100%", border: "1px solid #e7ecf3" }}>
                    <h3 style={{ marginTop: 0, marginBottom: 12, color: "#111827" }}>Good fit signals</h3>
                    <ul style={{ margin: 0, paddingLeft: 18, color: "#111827", lineHeight: 1.8 }}>
                      {signals.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </GridItem>
              </GridContainer>
            </div>

            <div style={{ padding: "0" }}>
              <GridContainer spacing={24}>
                {visualExamples.map((item, index) => (
                  <GridItem xs={12} sm={6} md={4} key={item.title}>
                    <div style={{ height: "100%", border: "1px solid #e7ecf3", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
                      <div style={{ minHeight: 220, padding: 20, background: index === 0 ? "linear-gradient(135deg, #0b4b8c 0%, #01acc8 100%)" : index === 1 ? "linear-gradient(135deg, #10233f 0%, #365f9c 100%)" : "linear-gradient(135deg, #1f2937 0%, #4f46e5 100%)", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", opacity: 0.85 }}>{item.label}</div>
                        <div style={{ border: "1px solid rgba(255,255,255,0.28)", borderRadius: 12, background: "rgba(255,255,255,0.1)", padding: 10, backdropFilter: "blur(2px)" }}>
                          <img
                            src={item.image}
                            alt={item.imageAlt}
                            style={{ width: "100%", height: index === 0 ? 250 : 150, objectFit: index === 0 ? "contain" : "cover", borderRadius: 10, display: "block", background: "rgba(255,255,255,0.12)" }}
                          />
                        </div>
                      </div>
                      <div style={{ padding: 22 }}>
                        <h3 style={{ marginTop: 0, marginBottom: 8 }}>{item.title}</h3>
                        <p style={{ margin: 0, color: "#516076", lineHeight: 1.7 }}>{item.caption}</p>
                      </div>
                    </div>
                  </GridItem>
                ))}
              </GridContainer>
            </div>

            <div style={{ padding: "6px 0 40px" }}>
              <GridContainer spacing={24}>
                {scenarios.map(item => (
                  <GridItem xs={12} sm={6} md={6} key={item.title}>
                    <div style={{ height: "100%", border: "1px solid #e7ecf3", borderRadius: 14, padding: 26, background: "#fff" }}>
                      <div style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: 0.3, color: item.accent, background: "#f4f8fc", borderRadius: 999, padding: "7px 12px", marginBottom: 14 }}>
                        {item.title}
                      </div>
                      <h3 style={{ marginTop: 0, marginBottom: 8 }}>{item.title}</h3>
                      <p style={{ color: "#2e3b4e", fontWeight: 600, marginTop: 0, marginBottom: 14 }}>{item.summary}</p>
                      <p style={{ color: "#516076", lineHeight: 1.7, marginTop: 0, marginBottom: 12 }}><strong>The problem:</strong> {item.problem}</p>
                      <p style={{ color: "#516076", lineHeight: 1.7, margin: 0 }}><strong>Likely result:</strong> {item.outcome}</p>
                    </div>
                  </GridItem>
                ))}
              </GridContainer>
            </div>

            <div style={{ padding: "0 0 32px" }}>
              <GridContainer spacing={24} alignItems="stretch">
                <GridItem xs={12} sm={12} md={5}>
                  <div style={{ background: "linear-gradient(135deg, #09366b 0%, #01acc8 100%)", color: "#fff", borderRadius: 14, padding: 30, height: "100%" }}>
                    <h3 style={{ marginTop: 0, color: "#fff" }}>How we usually package the work</h3>
                    <p style={{ lineHeight: 1.75, opacity: 0.92, marginBottom: 0 }}>
                      We normally start small, prove value quickly, then scale only if it makes commercial sense.
                    </p>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                  <div style={{ background: "#f7f9fc", borderRadius: 14, padding: 30, height: "100%", border: "1px solid #e7ecf3" }}>
                    {packages.map((item, index) => (
                      <div key={item.title} style={{ marginBottom: index === packages.length - 1 ? 0 : 22 }}>
                        <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                        <div style={{ color: "#516076", lineHeight: 1.7, marginBottom: 8 }}>{item.text}</div>
                        <div style={{ color: "#516076", lineHeight: 1.7 }}>{item.includes.join(" • ")}</div>
                      </div>
                    ))}
                  </div>
                </GridItem>
              </GridContainer>
            </div>

            <div style={{ padding: "14px 0 84px" }}>
              <div style={{ background: "#10233f", borderRadius: 16, padding: "38px 32px", color: "#fff", boxShadow: "0 18px 40px rgba(16,35,63,0.18)" }}>
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={12} md={8}>
                    <h2 style={{ marginTop: 0, color: "#fff" }}>Want to test one use case first?</h2>
                    <p style={{ margin: 0, lineHeight: 1.75, opacity: 0.92 }}>
                      We can help you choose a realistic pilot that is quick to validate and useful enough to prove value.
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
