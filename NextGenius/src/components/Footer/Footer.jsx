import React from "react";
import Group from "@material-ui/icons/Group";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { List, ListItem, withStyles } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import footerStyle from "assets/jss/next-genius/components/footerStyle.jsx";

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3C4.14 3 3.25 3.89 3.25 5s.89 2 2 2 2-.89 2-2-.89-2-2-2ZM20.75 13.01c0-3.03-.65-5.36-4.19-5.36-1.7 0-2.84.93-3.31 1.82h-.05V8.5H9.94V20h3.38v-5.69c0-1.5.28-2.95 2.14-2.95 1.83 0 1.86 1.71 1.86 3.04V20h3.43v-6.99Z" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2H21l-6.02 6.878L22 22h-5.53l-4.33-5.985L6.9 22H4.14l6.44-7.36L2 2h5.67l3.91 5.46L18.244 2Zm-.97 18h1.53L6.85 3.89H5.21L17.274 20Z" />
  </svg>
);

function Footer(props) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <GridContainer className={classes.gridContainer} alignItems="center">
          <GridItem xs={12} sm={12} md={5}>
            <div className={classes.left}>
              <h4 style={{ margin: 0 }}>NextGenius</h4>
              <p style={{ margin: "10px 0 0", opacity: 0.8 }}>
                Practical AI consulting and digital solutions for Australian small and medium businesses.
              </p>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <div className={classes.center}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <Button component={Link} to="/" color="transparent" simple>
                    Home
                  </Button>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <Button component={Link} to="/service" color="transparent" simple>
                    Services
                  </Button>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <Button component={Link} to="/use-cases" color="transparent" simple>
                    Use Cases
                  </Button>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <Button component={Link} to="/contact" color="transparent" simple>
                    Contact
                  </Button>
                </ListItem>
              </List>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <div className={classes.right}>
              <div className={classes.socialRow}>
                <Button className={classes.socialIconsButton} color="transparent" simple href="https://www.linkedin.com/company/nextgen14" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedInIcon />
                </Button>
                <Button className={classes.socialIconsButton} color="transparent" simple href="https://meetup.com/nextgenius" target="_blank" rel="noopener noreferrer" aria-label="Meetup">
                  <Group />
                </Button>
                <Button className={classes.socialIconsButton} color="transparent" simple href="https://x.com/nextgeniusau" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <XIcon />
                </Button>
              </div>
              <p className={classes.rightText} style={{ margin: 0 }}>
                © {new Date().getFullYear()} Next Genius Pty Ltd
              </p>
              <p className={classes.rightText} style={{ margin: "8px 0 0", opacity: 0.8 }}>
                15 Broadway, Ultimo NSW 2007, Australia
              </p>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
