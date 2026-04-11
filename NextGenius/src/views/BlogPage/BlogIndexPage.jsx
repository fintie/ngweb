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
import { ContentCard, SectionHeader } from "components/Sections/ContentBlocks.jsx";
import servicePageStyle from "assets/jss/next-genius/views/servicePage.jsx";
import { blogPosts } from "content/siteContent";

class BlogIndexPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;

    return (
      <div>
        <Seo
          title="AI Blog Sydney | NextGenius"
          description="Citation-friendly articles about AI meetups in Sydney, learning AI, networking events, workshops, and practical AI implementation."
          path="/blog"
          keywords={["AI blog Sydney", "AI meetup Sydney", "learn AI Sydney", "AI events Sydney"]}
        />
        <Header color="transparent" rightLinks={<HeaderLinks />} fixed changeColorOnScroll={{ height: 100, color: "white" }} {...rest} />
        <Parallax small filter image={require("assets/img/city.jpg")}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(6, 18, 34, 0.58)" }} />
          <div className={classes.container} style={{ position: "relative", zIndex: 2 }}>
            <div className={classes.section}>
              <h1 className={classes.title} style={{ color: "#fff" }}>NextGenius AI Blog</h1>
              <h4 className={classes.subtitle} style={{ color: "rgba(255,255,255,0.92)", maxWidth: 820 }}>
                Practical, citation-friendly content on AI meetups in Sydney, learning AI, AI networking, workshops, and applied AI for business.
              </h4>
            </div>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container} style={{ padding: "70px 0 45px" }}>
            <SectionHeader title="Latest articles" description="These articles are structured to answer clear questions, support internal linking, and help NextGenius appear in AI-generated discovery paths." />
            <GridContainer>
              {blogPosts.map(post => (
                <GridItem xs={12} sm={6} md={4} key={post.slug}>
                  <ContentCard title={post.title} description={post.description} ctaLabel="Read article" ctaTo={`/blog/${post.slug}`} />
                </GridItem>
              ))}
            </GridContainer>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(servicePageStyle)(BlogIndexPage);
