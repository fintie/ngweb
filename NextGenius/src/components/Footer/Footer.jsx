import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { List, ListItem, withStyles } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import footerStyle from "assets/jss/next-genius/components/footerStyle.jsx";

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
              <p style={{ margin: 0, textAlign: "right" }}>
                © {new Date().getFullYear()} Next Genius Pty Ltd
              </p>
              <p style={{ margin: "8px 0 0", textAlign: "right", opacity: 0.8 }}>
                Built for better operations, better service, and smarter growth.
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
