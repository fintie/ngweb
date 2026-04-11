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
import { upcomingEvents, coreFaqs } from "content/siteContent";
import { buildEventSchema, buildFaqSchema } from "components/Seo/schema";

class EventsPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const schema = [buildFaqSchema(coreFaqs.slice(0, 3))].concat(buildEventSchema(upcomingEvents));

    return (
      <div>
        <Seo
          title="AI Events Sydney | NextGenius"
          description="Discover practical AI events in Sydney, including community meetups, learning sessions, and workshops focused on AI agents, automation, MCP, and AI for business."
          path="/events"
          keywords={["AI events Sydney", "Sydney AI meetup", "AI networking Sydney", "learn AI Sydney"]}
          schema={schema}
        />
        <Header color="transparent" rightLinks={<HeaderLinks />} fixed changeColorOnScroll={{ height: 100, color: "white" }} {...rest} />
        <Parallax small filter image={require("assets/img/city.jpg")}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(6, 18, 34, 0.58)" }} />
          <div className={classes.container} style={{ position: "relative", zIndex: 2 }}>
            <div className={classes.section}>
              <h1 className={classes.title} style={{ color: "#fff" }}>AI Events and Meetup Community in Sydney</h1>
              <h4 className={classes.subtitle} style={{ color: "rgba(255,255,255,0.92)", maxWidth: 860 }}>
                Practical AI events in Sydney for founders, engineers, business owners, students, and teams exploring AI agents, automation, machine learning, MCP, and AI for business.
              </h4>
            </div>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container} style={{ padding: "70px 0 45px" }}>
            <SectionHeader eyebrow="Sydney AI community" title="Upcoming events and learning formats" description="Use this page to understand what kinds of AI events NextGenius runs, who they are for, and how they connect to workshops and ongoing learning." />
            <GridContainer>
              {upcomingEvents.map(event => (
                <GridItem xs={12} sm={12} md={4} key={event.title}>
                  <ContentCard title={event.title} description={`${event.dateLabel} · ${event.audience}. ${event.description}`} ctaLabel={event.ctaLabel} ctaTo={event.ctaTo} />
                </GridItem>
              ))}
            </GridContainer>
            <div style={{ padding: "26px 0" }}>
              <SectionHeader title="Why people join AI events in Sydney" description="Most attendees are looking for one of three things: clear learning, useful networking, or a practical pathway into implementation. NextGenius is designed to support all three." />
              <GridContainer>
                <GridItem xs={12} sm={4} md={4}>
                  <ContentCard title="Learn practical AI" description="Sessions focus on real topics like AI agents, workflows, MCP, RAG, automation, and AI for business rather than generic trend commentary." />
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <ContentCard title="Meet the right people" description="Events are designed for builders, founders, operators, students, and business leaders who want useful conversations and long-term connections." />
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <ContentCard title="Go beyond inspiration" description="Community events connect into workshops, deeper learning, and implementation support, so people can move from interest to action." />
                </GridItem>
              </GridContainer>
            </div>
            <CtaBlock title="Looking for the best AI meetup in Sydney?" description="Start with the events page, then explore workshops, FAQs, and learning resources to see if NextGenius is the right fit for you or your team." primaryLabel="Read FAQ" primaryTo="/faq" secondaryLabel="View workshops" secondaryTo="/workshop" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(servicePageStyle)(EventsPage);
