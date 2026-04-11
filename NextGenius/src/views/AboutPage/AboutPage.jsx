import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Seo from "components/Seo/Seo.jsx";
import { ContentCard, CtaBlock, SectionHeader } from "components/Sections/ContentBlocks.jsx";
import servicePageStyle from "assets/jss/next-genius/views/servicePage.jsx";
import { buildOrganizationSchema } from "components/Seo/schema";

class AboutPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;

    return (
      <div>
        <Seo
          title="About NextGenius | Sydney AI Meetup and Learning Community"
          description="Learn about NextGenius, a Sydney-based AI meetup and learning community focused on practical AI education, networking, workshops, and applied AI for business."
          path="/about"
          keywords={["About NextGenius", "Sydney AI community", "AI meetup Sydney", "AI learning community Australia"]}
          schema={buildOrganizationSchema()}
        />
        <Header color="transparent" rightLinks={<HeaderLinks />} fixed changeColorOnScroll={{ height: 100, color: "white" }} {...rest} />
        <Parallax small filter image={require("assets/img/city.jpg")}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(6, 18, 34, 0.58)" }} />
          <div className={classes.container} style={{ position: "relative", zIndex: 2 }}>
            <div className={classes.section}>
              <h1 className={classes.title} style={{ color: "#fff" }}>About NextGenius</h1>
              <h4 className={classes.subtitle} style={{ color: "rgba(255,255,255,0.92)", maxWidth: 860 }}>
                NextGenius is a Sydney-based AI meetup and learning community built for people who want practical AI education, useful networking, and real implementation pathways.
              </h4>
            </div>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container} style={{ padding: "70px 0 45px" }}>
            <SectionHeader eyebrow="Who we are" title="A practical AI community for Sydney and Australia" description="NextGenius connects meetups, workshops, applied learning, and business-focused AI conversations so people can move from curiosity to capability." />
            <GridContainer>
              <GridItem xs={12} sm={4} md={4}>
                <ContentCard title="What we do" description="We run and support AI meetups, workshops, practical education sessions, and applied AI conversations focused on real use cases." />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <ContentCard title="Who it is for" description="Founders, engineers, students, operators, consultants, and business teams who want to learn AI, meet practitioners, and explore implementation." />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <ContentCard title="Why it matters" description="Sydney needs more practical AI spaces that are grounded, community-driven, and focused on what works in the real world." />
              </GridItem>
            </GridContainer>
            <div style={{ padding: "26px 0" }}>
              <SectionHeader title="Core focus areas" description="NextGenius content and events focus on the topics people are actively trying to learn and implement." />
              <GridContainer>
                <GridItem xs={12} sm={6} md={3}><ContentCard title="AI agents" description="Design, orchestration, tool use, memory, and evaluation for practical agent systems." /></GridItem>
                <GridItem xs={12} sm={6} md={3}><ContentCard title="Automation" description="Workflow automation, integrations, and operational efficiency using AI-enabled systems." /></GridItem>
                <GridItem xs={12} sm={6} md={3}><ContentCard title="MCP and RAG" description="Connected tools, context systems, and information retrieval patterns that support useful assistants." /></GridItem>
                <GridItem xs={12} sm={6} md={3}><ContentCard title="AI for business" description="How organisations can adopt AI in a realistic way with lower risk and clearer outcomes." /></GridItem>
              </GridContainer>
            </div>
            <CtaBlock title="Want to join, partner, or host a workshop?" description="Explore upcoming events, read the FAQ, or contact NextGenius if you want to collaborate, learn, or run a session for your team." primaryLabel="View events" primaryTo="/events" secondaryLabel="Contact us" secondaryTo="/contact" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(servicePageStyle)(AboutPage);
