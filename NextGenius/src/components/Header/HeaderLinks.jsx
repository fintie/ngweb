/* eslint-disable */
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, Home, AccountCircle, Language, RssFeed, List as ListIcon, Group, Phone, Loyalty, Place} from "@material-ui/icons";

// core components
// import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";
// import IconButton from "components/CustomButtons/IconButton.jsx";

import headerLinksStyle from "assets/jss/next-genius/components/headerLinksStyle.jsx";
import blackLogo from "assets/img/tron/logo-black.png";
import whiteLogo from "assets/img/tron/logo.svg";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>

      <ListItem className={classes.listItem}>
        <Button
          component={Link}
          to="/"
          color="transparent"
          className={classes.navLink}
        >
          <Home className={classes.icons} /> Home
        </Button>
      </ListItem>
        <ListItem className={classes.listItem}>
            <Button
                component={Link}
                to="/service"
                color="transparent"
                className={classes.navLink}
            >
                <Language className={classes.icons} /> Services
            </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
            <Button
                component={Link}
                to="/news"
                color="transparent"
                className={classes.navLink}
            >
                <RssFeed className={classes.icons} /> News
            </Button>
        </ListItem>

        {/* <ListItem className={classes.listItem}>
            <Button
                component={Link}
                to="/team"
                color="transparent"
                className={classes.navLink}
            >
                <Group className={classes.icons} /> Team
            </Button>
        </ListItem> */}

      <ListItem className={classes.listItem}>
        <Button
            component={Link}
            to="/tron"
            color="transparent"
            className={classes.navLink}
        >
          <Hidden smDown implementation="css">
            <img src={whiteLogo} id="tronLogo" alt="Tron" className={classes.tronLogo}/>Tron
          </Hidden>
          <Hidden mdUp implementation="css">
            <img src={blackLogo} alt="Tron" className={classes.tronLogo}/>Tron
          </Hidden>

        </Button>
      </ListItem>

        <ListItem className={classes.listItem}>
            <Button
                component={Link}
                to="/contact"
                color="transparent"
                className={classes.navLink}
            >
                <Place className={classes.icons} /> Contact Us
            </Button>
        </ListItem>

    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
