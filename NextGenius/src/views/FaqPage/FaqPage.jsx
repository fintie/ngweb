import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import FaqSection from "components/FAQ/FaqSection.jsx";
import Seo from "components/Seo/Seo.jsx";
import { CtaBlock } from "components/Sections/ContentBlocks.jsx";
import servicePageStyle from "assets/jss/next-genius/views/servicePage.jsx";
import { coreFaqs } from "content/siteContent";
import { buildFaqSchema } from "components/Seo/schema";

class FaqPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;

    return (
      <div>
        <Seo
          title="AI Meetup Sydney FAQ | NextGenius"
          description="Frequently asked questions about AI meetups, AI events, learning AI in Sydney, workshops, and the NextGenius community."
          path="/faq"
          keywords={["AI meetup Sydney FAQ", "learn AI Sydney", "AI events Sydney", "NextGenius FAQ"]}
          schema={buildFaqSchema(coreFaqs)}
        />
        <Header color="transparent" rightLinks={<HeaderLinks />} fixed changeColorOnScroll={{ height: 100, color: "white" }} {...rest} />
        <Parallax small filter image={require("assets/img/city.jpg")}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(6, 18, 34, 0.58)" }} />
          <div className={classes.container} style={{ position: "relative", zIndex: 2 }}>
            <div className={classes.section}>
              <h1 className={classes.title} style={{ color: "#fff" }}>AI Meetup, Events and Learning FAQ</h1>
              <h4 className={classes.subtitle} style={{ color: "rgba(255,255,255,0.92)", maxWidth: 820 }}>
                Direct answers to common questions about AI meetups in Sydney, practical AI learning, networking events, workshops, and NextGenius.
              </h4>
            </div>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container} style={{ padding: "70px 0 45px" }}>
            <FaqSection title="Frequently asked questions" description="Clear answers for people searching for the best AI meetup in Sydney, local AI events, and practical ways to learn AI." items={coreFaqs} />
            <div style={{ paddingTop: 20 }}>
              <CtaBlock title="Want to learn with the community?" description="Explore upcoming events, read the blog, or talk to us about a workshop for your team." primaryLabel="View events" primaryTo="/events" secondaryLabel="Explore workshops" secondaryTo="/workshop" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(servicePageStyle)(FaqPage);
