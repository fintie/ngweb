import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { BusinessCenter } from "@material-ui/icons";
import { Home } from "@material-ui/icons";
import { ContactPhone } from "@material-ui/icons";
import { AssignmentTurnedIn } from "@material-ui/icons";
import { School } from "@material-ui/icons";
import { Event } from "@material-ui/icons";
import { Description } from "@material-ui/icons";
import { LiveHelp } from "@material-ui/icons";
import { Group } from "@material-ui/icons";
import Button from "components/CustomButtons/Button.jsx";
import headerLinksStyle from "assets/jss/next-genius/components/headerLinksStyle.jsx";

function HeaderLinks(props) {
  const { classes } = props;

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/service", label: "Services", icon: BusinessCenter },
    { to: "/use-cases", label: "Use Cases", icon: AssignmentTurnedIn },
    { to: "/workshop", label: "Workshop", icon: School },
    { to: "/events", label: "Events", icon: Event },
    { to: "/blog", label: "Blog", icon: Description },
    { to: "/faq", label: "FAQ", icon: LiveHelp },
    { to: "/about", label: "About", icon: Group },
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
