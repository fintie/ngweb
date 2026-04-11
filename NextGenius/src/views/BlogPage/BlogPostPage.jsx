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
import Seo from "components/Seo/Seo.jsx";
import { buildArticleSchema } from "components/Seo/schema";
import { blogPosts, coreFaqs } from "content/siteContent";
import { Link } from "react-router-dom";
import servicePageStyle from "assets/jss/next-genius/views/servicePage.jsx";

class BlogPostPage extends React.Component {
  render() {
    const { classes, match, ...rest } = this.props;
    const slug = match && match.params ? match.params.slug : "";
    const post = blogPosts.find(item => item.slug === slug);

    if (!post) {
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
          <Parallax small filter image={require("assets/img/city.jpg")}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8} className={classes.mlAuto + " " + classes.mrAuto}>
                  <div className={classes.brand}>
                    <h1 className={classes.title}>Article not found</h1>
                    <h4>The requested blog article could not be found.</h4>
                  </div>
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container} style={{ padding: "50px 0" }}>
              <Button color="primary" component={Link} to="/blog">
                Back to blog
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    const relatedPosts = blogPosts.filter(item => item.slug !== post.slug).slice(0, 2);
    const faqs = post.faqs || coreFaqs.slice(0, 3);

    return (
      <div>
        <Seo
          title={post.title}
          description={post.description}
          canonicalUrl={`/blog/${post.slug}`}
          schema={[buildArticleSchema(post)]}
        />
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
        <Parallax small filter image={require("assets/img/city.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={10} className={classes.mlAuto + " " + classes.mrAuto}>
                <div className={classes.brand}>
                  <div style={{ letterSpacing: 1.2, fontSize: 13, fontWeight: 700, textTransform: "uppercase" }}>
                    Sydney AI Blog
                  </div>
                  <h1 className={classes.title}>{post.headline || post.title}</h1>
                  <h4>{post.description}</h4>
                  <div style={{ marginTop: 20, fontSize: 15 }}>
                    {post.dateLabel}
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container} style={{ padding: "60px 0" }}>
            <GridContainer spacing={24}>
              <GridItem xs={12} sm={12} md={8}>
                {(post.sections || []).map(section => (
                  <div key={section.title} style={{ marginBottom: 36 }}>
                    <h2 style={{ marginTop: 0 }}>{section.title}</h2>
                    {(section.paragraphs || []).map(paragraph => (
                      <p key={paragraph} style={{ color: "#516076", fontSize: 16, lineHeight: 1.85 }}>
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets && section.bullets.length > 0 && (
                      <ul style={{ paddingLeft: 20, color: "#516076", lineHeight: 1.9 }}>
                        {section.bullets.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    )}
                  </div>
                ))}

                <div style={{ background: "#f7f9fc", borderRadius: 12, padding: 28, marginTop: 30 }}>
                  <h3 style={{ marginTop: 0 }}>Quick answers</h3>
                  {faqs.map(item => (
                    <div key={item.question} style={{ marginBottom: 20 }}>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.question}</div>
                      <div style={{ color: "#516076", lineHeight: 1.8 }}>{item.answer}</div>
                    </div>
                  ))}
                </div>
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <div style={{ background: "#ffffff", border: "1px solid #e7ecf3", borderRadius: 12, padding: 24, marginBottom: 24 }}>
                  <h3 style={{ marginTop: 0 }}>Next step</h3>
                  <p style={{ color: "#516076", lineHeight: 1.8 }}>
                    Want to join a Sydney AI meetup, workshop, or practical session on agents, MCP, RAG, and automation?
                  </p>
                  <Button color="primary" component={Link} to="/events">
                    View upcoming events
                  </Button>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid #e7ecf3", borderRadius: 12, padding: 24 }}>
                  <h3 style={{ marginTop: 0 }}>Related articles</h3>
                  {relatedPosts.map(item => (
                    <div key={item.slug} style={{ marginBottom: 18 }}>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                      <div style={{ color: "#516076", lineHeight: 1.7, marginBottom: 10 }}>{item.description}</div>
                      <Button color="primary" simple component={Link} to={`/blog/${item.slug}`}>
                        Read article
                      </Button>
                    </div>
                  ))}
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(servicePageStyle)(BlogPostPage);
