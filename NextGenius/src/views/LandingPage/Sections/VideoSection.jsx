import React from "react";
import ModalVideo from 'react-modal-video';

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Button from "components/CustomButtons/Button.jsx";

import videoStyle from "assets/jss/next-genius/views/landingPageSections/videoStyle.jsx";

const VIDEO_ID = 'MAf2T4wVrMw';

class VideoSection extends React.Component {

  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.openModal = this.openModal.bind(this)
  }

  openModal() {
    this.setState({isOpen: true})
  }

  render() {
    const {classes, ...rest} = this.props;

    return (
        <React.Fragment>
          <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={VIDEO_ID}
                      onClose={() => this.setState({isOpen: false})}/>
          <Button color="danger" size="lg" rel="noopener noreferrer" className={classes.playVideo}
                  onClick={this.openModal}>
            <i className="fas fa-play"/> &nbsp;Watch video
          </Button>
        </React.Fragment>
    )
  }
}

export default withStyles(videoStyle)(VideoSection);
