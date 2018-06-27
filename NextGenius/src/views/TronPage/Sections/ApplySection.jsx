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
import {isAlphaNumeric, validateEmail, isNumeric} from "utils/index";

import applyStyle from "assets/jss/next-genius/views/tronPageSections/applyStyle.jsx";

class ApplySection extends React.Component {

  state = {
    open: false,
    variant: null,
    message: null,
    tronAddress_error: false,
    tronAddress_success: false,
    email_error: false,
    email_success: false,
    amount_error: false,
    amount_success: false,
    checkTerms_error: false
  };

  handleOnclick = async (e) => {
    if(e)e.preventDefault();

    let isValid1 = this.handleOnblur('tronAddress');
    let isValid2 = this.handleOnblur('email');
    let isValid3 = this.handleOnblur('amount');

    // if(document.getElementById('checkTerms').checked){
    //   this.setState({
    //     checkTerms_error: false
    //   });
    // } else {
    //   this.setState({
    //     checkTerms_error: true
    //   });
    // }

    if(!isValid1 || !isValid2 || !isValid3){
      return false;
    }

    const tronAddress = document.getElementById('tronAddress').value;
    const email = document.getElementById('email').value;
    const amount = document.getElementById('amount').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const message = document.getElementById('message').value;

    const {handleSubmit} = this.props;
    const ret = await handleSubmit('submitBtn', {
      tronAddress: tronAddress,
      email: email,
      amount: amount,
      name: name,
      phone: phone,
      country: country,
      message: message
    });

    // Send message to server
    this.setState({ open: true, variant: "success", message: "Thanks for contacting us, we will contact you shortly" });
  };

  handleOnblur = (name) => {
    const value = document.getElementById(name).value;

    let isValid = (name === 'tronAddress') ? isAlphaNumeric(value) :  true;
    isValid = (name === 'email') ? validateEmail(value) : isValid;
    isValid = (name === 'amount' && value) ? isNumeric(value) : isValid;

    let errorName = name + '_error';
    let successName = name + '_success';

    if((!value && name !== 'amount') || !isValid){
      this.setState({
        [errorName]: true,
        [successName]: false
      });
      return false;
    } else if(value){
      this.setState({
        [errorName]: false,
        [successName]: true
      });
    }
    return true;
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
                          error={this.state.tronAddress_error}
                          success={this.state.tronAddress_success}
                          id="tronAddress"
                          inputProps={{ onBlur: () => this.handleOnblur('tronAddress')}}
                          formControlProps={{
                            fullWidth: true
                          }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Email Address"
                        mandatory={true}
                        error={this.state.email_error}
                        success={this.state.email_success}
                        id="email"
                        inputProps={{ onBlur: () => this.handleOnblur('email')}}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                          labelText="Vote Amount (TRX)"
                          id="amount"
                          error={this.state.amount_error}
                          success={this.state.amount_success}
                          inputProps={{ onBlur: () => this.handleOnblur('amount')}}
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
                    {/*<GridItem xs={12} sm={12} md={12}>*/}
                      {/*<div*/}
                          {/*className={*/}
                            {/*classes.checkboxAndRadio*/}
                          {/*}*/}
                      {/*>*/}
                      {/*<FormControlLabel*/}
                          {/*control={*/}
                            {/*<Checkbox id="checkTerms"*/}
                                {/*tabIndex={-1}*/}
                                {/*// onClick={() => this.handleToggle(21)}*/}
                                {/*checkedIcon={<Check className={classes.checkedIcon} />}*/}
                                {/*icon={<Check className={classes.uncheckedIcon} />}*/}
                                {/*classes={{ checked: classes.checked }}*/}
                            {/*/>*/}
                          {/*}*/}
                          {/*label={(<label htmlFor="checkTerms" className={classes.label + ' ' + this.state.checkTerms_error? classes.error:''}>I have read and agreed on the Terms & Conditions.</label>)}*/}
                      {/*/>*/}
                      {/*</div>*/}
                    {/*</GridItem>*/}
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
