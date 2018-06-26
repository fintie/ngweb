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
import CustomInput from "components/CustomInput/CustomInput.jsx";
import NewSnackbarContent from "components/Snackbar/NewSnackbarContent.jsx";
import Button from "components/CustomButtons/Button.jsx";

import applyStyle from "assets/jss/next-genius/views/tronPageSections/applyStyle.jsx";

class ApplySection extends React.Component {

  state = {
    open: false,
    variant: null,
    message: null
  };

  handleOnclick = async (e) => {
    if(e)e.preventDefault();
    const {handleSubmit} = this.props;
    await handleSubmit('submitBtn', {name: 'Test', email: 'test@gmail.com', message: 'Test'});
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
    return (
        <div className={classes.section}>
            <GridContainer justify="center" className={classes.container}>
              <GridItem xs={12} sm={12} md={12}>
                <h2 className={classNames(classes.title, classes.formTitle)}>Fill in the form</h2>
                <h4 className={classes.description}>
                  Please fill in the following fields. We'll get in touch with you as soon as possible.
                  <div className={classes.note}><span className={classes.mandatory}>*</span> indicates required field</div>
                </h4>
                <form>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                          labelText="Tron Wallet Address"
                          mandatory={true}
                          id="tronAddress"
                          formControlProps={{
                            fullWidth: true
                          }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Email address"
                        mandatory={true}
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                          labelText="Vote Amount (TRX)"
                          id="amount"
                          formControlProps={{
                            fullWidth: true
                          }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                          labelText="Your Name"
                          id="name"
                          formControlProps={{
                            fullWidth: true
                          }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                          labelText="Phone"
                          id="phone"
                          formControlProps={{
                            fullWidth: true
                          }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                          labelText="Country"
                          id="country"
                          formControlProps={{
                            fullWidth: true
                          }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
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
                    <GridItem xs={12} sm={12} md={12}>
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
                    <GridContainer justify="center" className={classes.submitBtnGrid}>
                      <GridItem className={classes.textCenter}
                      >
                        <Button round id='submitBtn' className={classes.submitButton} color="primary" onClick={this.handleOnclick} disabled={fetch.submitBtn}>{fetch.submitBtn? 'Please wait...' : 'Submit'} </Button>
                      </GridItem>
                    </GridContainer>
                    </GridItem>
                  </GridContainer>
                </form>
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

export default withStyles(applyStyle)(ApplySection);
