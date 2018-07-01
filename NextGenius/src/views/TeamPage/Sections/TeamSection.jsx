import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import IconButton from "components/CustomButtons/IconButton.jsx";

import teamStyle from "assets/jss/next-genius/views/teamPageSections/teamStyle.jsx";

class TeamSection extends React.Component {
  render() {
    const {classes, teamList} = this.props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid,
        classes.avatar
    );
    return (
        <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
              <h2 className={classes.titleBlack}>We are nerd rockstars</h2>
              <h4 className={classes.subTitleBlack}>
                The world needs challengers who can have amazing achievements if led to the right direction.
                We have gathered a group of passionate and capable individuals with a bold and achievable plan,
                and with the right fulcrum we can move the world.
              </h4>
            </GridItem>
          </GridContainer>
          <GridContainer>
            {
              teamList.map((member, idx) =>

                  <GridItem xs={12} sm={6} md={3} xl={2} key={idx.toString()}>
                      <Card plain>
                        <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                          <img src={require("assets/img/avatar/" + member.avatar)} alt={member.name}
                               className={imageClasses}/>
                        </GridItem>
                        <h4 className={classes.cardTitle}>
                          {member.name}
                          <br/>
                          <small className={classes.smallTitle}>{member.title}</small>
                        </h4>
                        <div className={classNames(classes.justifyCenter, classes.socialGroup)}>
                          {member.twitter &&
                          <IconButton color="transparent" className={classes.margin5} href={member.twitter}
                                      target="_blank">
                            <i className={classes.socials + " fab fa-twitter " + classes.twitter}/>
                          </IconButton>}
                          {member.linkedIn &&
                          <IconButton color="transparent" className={classes.margin5} href={member.linkedIn}
                                      target="_blank">
                            <i className={classes.socials + " fab fa-linkedin " + classes.linkedIn}/>
                          </IconButton>}
                          {member.instagram &&
                          <IconButton color="transparent" className={classes.margin5} href={member.instagram}
                                      target="_blank">
                            <i className={classes.socials + " fab fa-instagram " + classes.instagram}/>
                          </IconButton>}
                          {member.facebook &&
                          <IconButton color="transparent" className={classes.margin5} href={member.facebook}
                                      target="_blank">
                            <i className={classes.socials + " fab fa-facebook " + classes.facebook}/>
                          </IconButton>}
                        </div>
                        <CardBody className={classes.cardBody}>
                          <p className={classes.description}>
                            {member.description}
                          </p>
                        </CardBody>

                      </Card>
                  </GridItem>
              )
            }
          </GridContainer>
        </div>
    );
  }
}

export default withStyles(teamStyle)(TeamSection);
