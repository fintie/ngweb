import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import { Power, VerifiedUser, AddToQueue } from "@material-ui/icons";

// import ArrowDownward from "@material-ui/icons/ArrowDownward";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import serviceStyle from "assets/jss/next-genius/views/landingPageSections/serviceStyle.jsx";

class ServiceSection extends React.Component {
  render() {
    const {classes} = this.props;
    return (
        <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
                <h2 className={classes.title}>Who We Are</h2>
                <h5 className={classes.description}>
                  We build AI Agents, MCP integrations, AI Skills, and OpenClaw‑powered automation for teams in Australia and beyond.<br></br>
                  We believe in practical innovation that ships fast, scales responsibly, and delivers measurable outcomes for people and businesses.
                </h5>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <InfoArea
                    title="Connect"
                    description="We connect teams, tools, and data into a cohesive AI ecosystem. Bring your ideas and workflows, and we’ll map the right agents and skills to make them real."
                    icon={Power}
                    iconColor="info"
                    vertical
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <InfoArea
                    title="Empower"
                    description="If you already have a product or a solid concept, we help you ship AI‑powered features quickly. Our team brings AI engineering, product architecture, design, and compliance experience to turn ideas into production systems."
                    icon={VerifiedUser}
                    iconColor="success"
                    vertical
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <InfoArea
                    title="Create"
                    description="If you’re a domain expert, we partner to create AI skills and agent workflows tailored to your industry. Together we build repeatable solutions that transform operations and customer experience."
                    icon={AddToQueue}
                    iconColor="warning"
                    vertical
                />
            </GridItem>
          </GridContainer>
        </div>
    );
  }
}

export default withStyles(serviceStyle)(ServiceSection);
