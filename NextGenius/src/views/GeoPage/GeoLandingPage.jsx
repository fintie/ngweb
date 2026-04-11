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
import { buildFaqSchema, buildOrganizationSchema } from "components/Seo/schema";
import { geoPages, siteConfig } from "content/siteContent";
import { Link } from "react-router-dom";
import servicePageStyle from "assets/jss/next-genius/views/servicePage.jsx";

const geoPageList = Object.keys(geoPages).map(key => geoPages[key]);

class GeoLandingPage extends React.Component {
  render() {
    const { classes, match, ...rest } = this.props;
    const slug = match && match.params ? match.params.slug : "";
    const page = geoPageList.find(item => item.slug === slug);

    if (!page) {
      return (
        <div>
          <Header color="transparent" rightLinks={<HeaderLinks />} fixed changeColorOnScroll={{ height: 100, color: "white" }} {...rest} />
          <Parallax small filter image={require("assets/img/city.jpg")}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8} className={classes.mlAuto + " " + classes.mrAuto}>
                  <div className={classes.brand}>
                    <h1 className={classes.title}>Page not found</h1>
                  </div>
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container} style={{ padding: "50px 0" }}>
              <Button color="primary" component={Link} to="/">
                Back home
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div>
        <Seo
          title={page.title}
          description={page.description}
          canonicalUrl={`/${page.slug}`}
          schema={[buildOrganizationSchema(), buildFaqSchema(page.faqs || [])]}
        />
        <Header color="transparent" rightLinks={<HeaderLinks />} fixed changeColorOnScroll={{ height: 100, color: "white" }} {...rest} />
        <Parallax small filter image={require("assets/img/city.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={10} className={classes.mlAuto + " " + classes.mrAuto}>
                <div className={classes.brand}>
                  <div style={{ letterSpacing: 1.2, fontSize: 13, fontWeight: 700, textTransform: "uppercase" }}>
                    Sydney / Australia GEO Page
                  </div>
                  <h1 className={classes.title}>{page.heroTitle || page.title}</h1>
                  <h4>{page.description}</h4>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container} style={{ padding: "60px 0" }}>
            <GridContainer spacing={24}>
              <GridItem xs={12} sm={12} md={8}>
                {(page.sections || []).map(section => (
                  <div key={section.title} style={{ marginBottom: 34 }}>
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

                {page.faqs && page.faqs.length > 0 && (
                  <div style={{ background: "#f7f9fc", borderRadius: 12, padding: 28, marginTop: 30 }}>
                    <h3 style={{ marginTop: 0 }}>FAQ</h3>
                    {page.faqs.map(item => (
                      <div key={item.question} style={{ marginBottom: 20 }}>
                        <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.question}</div>
                        <div style={{ color: "#516076", lineHeight: 1.8 }}>{item.answer}</div>
                      </div>
                    ))}
                  </div>
                )}
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <div style={{ background: "linear-gradient(135deg, #09366b 0%, #01acc8 100%)", color: "#fff", borderRadius: 12, padding: 24, marginBottom: 24 }}>
                  <h3 style={{ marginTop: 0, color: "#fff" }}>Why NextGenius</h3>
                  <p style={{ lineHeight: 1.8, opacity: 0.95 }}>
                    {siteConfig.siteName} is a Sydney AI meetup and learning community focused on practical events, workshops, and applied AI education.
                  </p>
                  <Button color="white" component={Link} to="/events">
                    See events
                  </Button>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid #e7ecf3", borderRadius: 12, padding: 24 }}>
                  <h3 style={{ marginTop: 0 }}>Explore more</h3>
                  {geoPageList.filter(item => item.slug !== page.slug).map(item => (
                    <div key={item.slug} style={{ marginBottom: 16 }}>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                      <Button color="primary" simple component={Link} to={`/${item.slug}`}>
                        Open page
                      </Button>
                    </div>
                  ))}
                  <Button color="primary" component={Link} to="/contact">
                    Contact NextGenius
                  </Button>
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

export default withStyles(servicePageStyle)(GeoLandingPage);
