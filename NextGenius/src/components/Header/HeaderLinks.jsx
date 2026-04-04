import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import Home from "@material-ui/icons/Home";
import ContactPhone from "@material-ui/icons/ContactPhone";
import Button from "components/CustomButtons/Button.jsx";
import headerLinksStyle from "assets/jss/next-genius/components/headerLinksStyle.jsx";

function HeaderLinks(props) {
  const { classes } = props;

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/service", label: "Services", icon: BusinessCenter },
    { to: "/contact", label: "Contact", icon: ContactPhone }
  ];

  return (
    <List className={classes.list}>
      {navItems.map(item => {
        const Icon = item.icon;
        return (
          <ListItem className={classes.listItem} key={item.to}>
            <Button component={Link} to={item.to} color="transparent" className={classes.navLink}>
              <Icon className={classes.icons} /> {item.label}
            </Button>
          </ListItem>
        );
      })}
      <ListItem className={classes.listItem}>
        <Button component={Link} to="/contact" color="primary" className={classes.navLink} round>
          Book a Discovery Call
        </Button>
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
