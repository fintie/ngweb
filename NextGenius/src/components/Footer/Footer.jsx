import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes

import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";

import classNames from "classnames";
import {List, ListItem, Tooltip, withStyles, Hidden} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";

// @material-ui/icons
// import Favorite from "@material-ui/icons/Favorite";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import footerStyle from "assets/jss/next-genius/components/footerStyle.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privacy: false,
      termsofuse: false
    };
  }
  handleClickOpen(modal) {
    // const x = [];
    // x[modal] = true;
    // this.setState(x);
  }

  handleClose(modal) {
    // const x = [];
    // x[modal] = false;
    // this.setState(x);
  }

  render() {
    const {classes, whiteFont} = this.props;
    const footerClasses = classNames({
      [classes.footer]: true,
      [classes.footerWhiteFont]: whiteFont
    });
    // const aClasses = classNames({
    //   [classes.a]: true,
    //   [classes.footerWhiteFont]: whiteFont
    // });
    return (
        <footer className={footerClasses}>
          <div className={classes.container}>
            <GridContainer className={classes.gridContainer}>
              <Hidden xsDown>
                <GridItem xs={12} sm={6} md={4} lg={4}>
                  <div className={classes.left}>
                    <List className={classes.list}>
                      <ListItem className={classes.inlineBlock}>
                        <a onClick={() => this.handleClickOpen("privacy")} className={classes.block}>
                          Privacy Policy
                        </a>
                        <Dialog
                            classes={{
                              root: classes.center,
                              paper: classes.modal
                            }}
                            open={this.state.privacy}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => this.handleClose("privacy")}
                            aria-labelledby="classic-modal-slide-title"
                            aria-describedby="classic-modal-slide-description"
                        >
                          <DialogTitle
                              id="classic-modal-slide-title"
                              disableTypography
                              className={classes.modalHeader}
                          >
                            <IconButton
                                className={classes.modalCloseButton}
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={() => this.handleClose("privacy")}
                            >
                              <Close className={classes.modalClose}/>
                            </IconButton>
                            <h4 className={classes.modalTitle}>Modal title</h4>
                          </DialogTitle>
                          <DialogContent
                              id="classic-modal-slide-description"
                              className={classes.modalBody}
                          >
                            <p>
                              Far far away, behind the word mountains, far from the
                              countries Vokalia and Consonantia, there live the blind
                              texts. Separated they live in Bookmarksgrove right at
                              the coast of the Semantics, a large language ocean. A
                              small river named Duden flows by their place and
                              supplies it with the necessary regelialia. It is a
                              paradisematic country, in which roasted parts of
                              sentences fly into your mouth. Even the all-powerful
                              Pointing has no control about the blind texts it is an
                              almost unorthographic life One day however a small line
                              of blind text by the name of Lorem Ipsum decided to
                              leave for the far World of Grammar.
                            </p>
                          </DialogContent>
                          <DialogActions className={classes.modalFooter}>
                            <Button color="transparent" simple>
                              Nice Button
                            </Button>
                            <Button
                                onClick={() => this.handleClose("termsofuse")}
                                color="danger"
                                simple
                            >
                              Close
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </ListItem>
                      <ListItem className={classes.inlineBlock}>
                        <a
                            onClick={() => this.handleClickOpen("termsofuse")}
                            className={classes.block}
                        >
                          Terms of Use
                        </a>
                        <Dialog
                            classes={{
                              root: classes.center,
                              paper: classes.modal
                            }}
                            open={this.state.termsofuse}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => this.handleClose("termsofuse")}
                            aria-labelledby="classic-modal-slide-title"
                            aria-describedby="classic-modal-slide-description"
                        >
                          <DialogTitle
                              id="classic-modal-slide-title"
                              disableTypography
                              className={classes.modalHeader}
                          >
                            <IconButton
                                className={classes.modalCloseButton}
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={() => this.handleClose("termsofuse")}
                            >
                              <Close className={classes.modalClose}/>
                            </IconButton>
                            <h4 className={classes.modalTitle}>Modal title</h4>
                          </DialogTitle>
                          <DialogContent
                              id="classic-modal-slide-description"
                              className={classes.modalBody}
                          >
                            <p>
                              Far far away, behind the word mountains, far from the
                              countries Vokalia and Consonantia, there live the blind
                              texts. Separated they live in Bookmarksgrove right at
                              the coast of the Semantics, a large language ocean. A
                              small river named Duden flows by their place and
                              supplies it with the necessary regelialia. It is a
                              paradisematic country, in which roasted parts of
                              sentences fly into your mouth. Even the all-powerful
                              Pointing has no control about the blind texts it is an
                              almost unorthographic life One day however a small line
                              of blind text by the name of Lorem Ipsum decided to
                              leave for the far World of Grammar.
                            </p>
                          </DialogContent>
                          <DialogActions className={classes.modalFooter}>
                            <Button color="transparent" simple>
                              Nice Button
                            </Button>
                            <Button
                                onClick={() => this.handleClose("termsofuse")}
                                color="danger"
                                simple
                            >
                              Close
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </ListItem>
                    </List>
                  </div>
                </GridItem>
              </Hidden>

              <GridItem xs={12} sm={6} md={4} lg={4}>
                <div className={classes.center}>
                  <List className={classes.list}>
                    <ListItem className={classes.inlineBlock}>
                      Copyright &copy; {1900 + new Date().getYear()} Next Genius Pty Ltd
                    </ListItem>
                  </List>
                </div>
              </GridItem>
              <Hidden smDown>
                <GridItem xs={12} sm={6} md={4} lg={4}>
                  <div className={classes.right}>
                    <List className={classes.list}>
                      <ListItem className={classes.inlineBlock}>
                        <Tooltip
                            id="instagram-twitter"
                            title="Follow us on twitter"
                            placement={window.innerWidth > 959 ? "top" : "left"}
                            classes={{tooltip: classes.tooltip}}
                        >
                          <IconButton
                              href="https://twitter.com/nextgeniusau"
                              target="_blank"
                              color="primary"
                              className={classes.navLink + " " + classes.socialIconsButton}
                          >
                            <i className={classes.socialIcons + " fab fa-twitter " + classes.twitter}/>
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={classes.inlineBlock}>
                        <Tooltip
                            id="instagram-facebook"
                            title="Follow us on facebook"
                            placement={window.innerWidth > 959 ? "top" : "left"}
                            classes={{tooltip: classes.tooltip}}
                        >
                          <IconButton
                              color="primary"
                              href="https://www.facebook.com/nextgeniusofficial/"
                              target="_blank"
                              className={classes.navLink + " " + classes.socialIconsButton}
                          >
                            <i className={classes.socialIcons + " fab fa-facebook " + classes.facebook}/>
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                      {/*<ListItem className={classes.inlineBlock}>*/}
                      {/*<Tooltip*/}
                      {/*id="instagram-tooltip"*/}
                      {/*title="Follow us on instagram"*/}
                      {/*placement={window.innerWidth > 959 ? "top" : "left"}*/}
                      {/*classes={{ tooltip: classes.tooltip }}*/}
                      {/*>*/}
                      {/*<IconButton*/}
                      {/*color="transparent"*/}
                      {/*href="https://www.instagram.com/"*/}
                      {/*target="_blank"*/}
                      {/*className={classes.navLink + " " + classes.socialIconsButton}*/}
                      {/*>*/}
                      {/*<i className={classes.socialIcons + " fab fa-instagram"} />*/}
                      {/*</IconButton>*/}
                      {/*</Tooltip>*/}
                      {/*</ListItem>*/}
                      <ListItem className={classes.inlineBlock}>
                        <Tooltip
                            id="medium-tooltip"
                            title="Follow us on medium"
                            placement={window.innerWidth > 959 ? "top" : "left"}
                            classes={{tooltip: classes.tooltip}}
                        >
                          <IconButton
                              color="primary"
                              href="https://medium.com/@nextgenius"
                              target="_blank"
                              className={classes.navLink + " " + classes.socialIconsButton}
                          >
                            <i className={classes.socialIcons + " fab fa-medium " + classes.medium}/>
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                      <ListItem className={classes.inlineBlock}>
                        <Tooltip
                            id="telegram-tooltip"
                            title="Join our telegram"
                            placement={window.innerWidth > 959 ? "top" : "left"}
                            classes={{tooltip: classes.tooltip}}
                        >
                          <IconButton
                              color="primary"
                              href="https://t.me/joinchat/FCLgrkujZmJ2Rmp7F13btA"
                              target="_blank"
                              className={classes.navLink + " " + classes.socialIconsButton}
                          >
                            <i className={classes.socialIcons + " fab fa-telegram " + classes.telegram}/>
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </div>
                </GridItem>
              </Hidden>
            </GridContainer>

          </div>
        </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
