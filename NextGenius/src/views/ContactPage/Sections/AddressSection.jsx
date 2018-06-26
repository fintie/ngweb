import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from '@material-ui/core/Snackbar';

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import NewSnackbarContent from "components/Snackbar/NewSnackbarContent.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { Phone, PinDrop, BusinessCenter} from "@material-ui/icons";

import addressStyle from "assets/jss/next-genius/views/contactPageSections/addressStyle.jsx";
// import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

class AddressSection extends React.Component {

  state = {
    open: false,
    variant: null,
    message: null
  };

  contactUs = async () => {
    const {contactUs} = this.props;
    await contactUs('contactUsBtn', {name: 'Test', email: 'test@gmail.com', message: 'Test'});
    // Send message to server
    this.setState({ open: true, variant: "success", message: "Thanks for contacting us, we will contact you shortly" });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes, fetch } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    return (
        <div className={classes.section}>
            <GridContainer className={classes.container}>
              <GridItem xs={12} sm={12} md={6}>
                <h2 className={classNames(classes.title, classes.formTitle)}>Send us a message</h2>
                <h4 className={classes.description}>
                  You can contact us with anything related to our services. We'll get in touch with you as soon as possible.
                  <div className={classes.note}>(<span className={classes.mandatory}>*</span> indicates required field)</div>
                </h4>
                <form>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                          labelText="Your Name"
                          mandatory={true}
                          id="name"
                          formControlProps={{
                            fullWidth: true
                          }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                          labelText="Email address"
                          mandatory={true}
                          id="email"
                          formControlProps={{
                            fullWidth: true
                          }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                          labelText="Phone"
                          id="phone"
                          formControlProps={{
                            fullWidth: true
                          }}
                      />
                    </GridItem>
                    {/*<GridItem xs={12} sm={12} md={6}>*/}
                      {/*<CustomDropdown*/}
                          {/*buttonText="Select"*/}
                          {/*// dropdownHeader="Dropdown Header"*/}
                          {/*buttonProps={{*/}
                            {/*className: classes.navLink,*/}
                            {/*// color: "transparent"*/}
                          {/*}}*/}
                          {/*dropdownList={[*/}
                            {/*"Blockchain Enthusiast",*/}
                            {/*{ divider: true },*/}
                            {/*"Blockchain Project",*/}
                            {/*{ divider: true },*/}
                            {/*"Blockchain Developer & Service Provider",*/}
                            {/*{ divider: true },*/}
                              {/*"Investor"*/}
                          {/*]}*/}
                      {/*/>*/}
                    {/*</GridItem>*/}
                    <GridItem>
                    <CustomInput
                        labelText="Your Message"
                        id="message"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.textArea
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 3
                        }}
                    />
                    </GridItem>
                    <GridItem>
                      <div
                          className={
                            classes.checkboxAndRadio
                          }
                      >
                      <FormControlLabel
                          control={
                            <Checkbox id="checkTerms"
                                tabIndex={-1}
                                // onClick={() => this.handleToggle(21)}
                                checkedIcon={<Check className={classes.checkedIcon} />}
                                icon={<Check className={classes.uncheckedIcon} />}
                                classes={{ checked: classes.checked }}
                            />
                          }
                          label={(<label htmlFor="checkTerms" className={classes.label}>I have read and agreed on the Terms & Conditions.</label>)}
                      />
                      </div>
                    </GridItem>
                    <GridItem>
                    <GridContainer justify="center" className={classes.sendBtnGrid}>
                      <GridItem className={classes.textCenter}
                      >
                        <Button round id='contactUsBtn' color="primary" onClick={this.contactUs} disabled={fetch.contactUsBtn}>{fetch.contactUsBtn? 'Please wait...' : 'Contact Us'} </Button>
                      </GridItem>
                    </GridContainer>
                    </GridItem>
                  </GridContainer>
                </form>
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <Card plain>
                  <br />
                  <GridContainer justify="center">
                    <GridItem xs={4} className={classes.contactType}>
                      <PinDrop className={classes.icons} />
                    </GridItem>
                    <GridItem xs={8} className={classes.contactDetail}>
                      <h4 className={classes.title}>Find us at the office</h4>
                      <p className={classes.description}>
                        Level 2, 63 Dixon St, Haymarket NSW, Australia
                      </p>
                    </GridItem>
                  </GridContainer>
                  <GridContainer justify="center">
                    <GridItem xs={4} className={classes.contactType}>
                      <Phone className={classes.icons} />
                    </GridItem>
                    <GridItem xs={8} className={classes.contactDetail}>
                      <h4 className={classes.title}>Give us a ring</h4>
                      <p className={classes.description}>
                        <strong>Australia</strong><br/>
                        Nick Qi <br/>
                        +61 433440419<br/>
                        Mon - Fri, 9:00 - 17:00<br/>
                        info@nextgenius.com.au<br/>
                        <br/>
                        <strong>Greater China</strong><br/>
                        Jianfeng Zhou<br/>
                        +86 18803601433<br/>
                        Mon - Fri, 9:00 - 17:00
                      </p>
                    </GridItem>
                  </GridContainer>
                  <GridContainer justify="center">
                    <GridItem xs={4} className={classes.contactType}>
                      <BusinessCenter className={classes.icons} />
                    </GridItem>
                    <GridItem xs={8} className={classes.contactDetail}>
                      <h4 className={classes.title}>Legal Information</h4>
                      <p className={classes.description}>
                        Next Genius Pty Ltd.<br/>
                        ABN · 24 604 440 066<br/>
                        Bank · Commonwealth Bank
                      </p>
                    </GridItem>
                  </GridContainer>
                </Card>
            </GridItem>

        </GridContainer>
          <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
          >
            <NewSnackbarContent
                onClose={this.handleClose}
                variant={this.state.variant}
                message={this.state.message}
            />
          </Snackbar>
        </div>
    );
  }
}

export default withStyles(addressStyle)(AddressSection);
