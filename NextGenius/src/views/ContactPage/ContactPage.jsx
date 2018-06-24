import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import AddressSection from "./Sections/AddressSection.jsx";
import MapSection from "./Sections/MapSection.jsx";

import contactStyle from "assets/jss/next-genius/views/contactPage.jsx";

import {contactUs} from 'actions/contactAction';

class ContactPage extends React.Component {
  render() {
    const { classes, contactUs, fetch, ...rest } = this.props;

    return (
      <div className="contactPage">
        <Header
          color="transparent"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 100,
            color: "white"
          }}
          {...rest}
        />
        <MapSection />
        <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <AddressSection fetch={fetch} contactUs={contactUs}/>
            </div>
          </div>
          <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetch: state.fetch
});

const mapDispatchToProps = dispatch => ({
  contactUs: bindActionCreators(contactUs, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(contactStyle)(ContactPage));
