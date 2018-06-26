import React from "react";
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";

import {getTeamList, jobInquiry} from 'actions/teamAction';

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import TeamSection from "./Sections/TeamSection.jsx";
import OfficeSection from "./Sections/OfficeSection.jsx";
import WorkSection from "./Sections/WorkSection.jsx";

import teamStyle from "assets/jss/next-genius/views/teamPage.jsx";

class TeamPage extends React.Component {

  static propTypes = {
    team: PropTypes.object.isRequired,
    getTeamList: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.getTeamList();
  }

  render() {
    const {classes, team, fetch, jobInquiry, ...rest} = this.props;
    // const imageClasses = classNames(
    //   classes.imgRaised,
    //   classes.imgRoundedCircle,
    //   classes.imgFluid
    // );
    return (
        <div>
          <Header
              color="transparent"
              rightLinks={<HeaderLinks/>}
              fixed
              changeColorOnScroll={{
                height: 100,
                color: "white"
              }}
              {...rest}
          />
          <Parallax small filter image={require("assets/img/city.jpg")}>
            <div className={classes.container}>
              <div className={classes.section}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <h2 className={classes.title}>Meet The Team</h2>

                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </Parallax>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <TeamSection teamList={team.teamList}/>
              <OfficeSection/>
              <WorkSection/>
            </div>
          </div>
          <Footer/>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  team: state.team
});

const mapDispatchToProps = dispatch => ({
  getTeamList: bindActionCreators(getTeamList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(teamStyle)(TeamPage));
