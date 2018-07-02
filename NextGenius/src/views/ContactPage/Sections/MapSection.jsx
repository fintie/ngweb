import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";

// google map
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { typography } from '@material-ui/core/styles';

// @material-ui/icons

// core components
// import GridContainer from "components/Grid/GridContainer.jsx";
// import GridItem from "components/Grid/GridItem.jsx";
// import CustomInput from "components/CustomInput/CustomInput.jsx";
// import Button from "components/CustomButtons/Button.jsx";

import mapStyle from "assets/jss/next-genius/views/contactPageSections/mapStyle.jsx";

class MapSection extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };


  render() {
    const {classes} = this.props;

    // const styles = [
    //   {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    //   {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    //   {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]}
    // ];

    return (
        <Map
            item
            xs={12}
            // styles={styles}//{[{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]}
            className={classes.map}
            google={this.props.google}
            onClick={this.onMapClicked}
            zoom={14}
            scrollwheel={false}
            initialCenter={{lat: -33.872875, lng: 151.203893}}
            mapTypeControl={false}
            zoomControl={true}
            scaleControl={false}
            streetViewControl={true}
            fullscreenControl={false}
        >
          <Marker
              onClick={this.onMarkerClick}
              title={'Next Genius Pty Ltd - Level 2, 63 Dixon St, Haymarket NSW, Australia'}
              position={{lat: -33.878875, lng: 151.203893}}
              name={'Next Genius Pty Ltd.'}
          />
          <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
          >
            <Paper>
              <Typography
                  variant='headline'
                  component='h4'
              >
                Next Genius Pty Ltd.
              </Typography>
              <Typography
                  component='p'
              >
                Level 2, 63 Dixon St, Haymarket NSW, Australia <br/>
                +61 433440419
              </Typography>
            </Paper>
          </InfoWindow>
        </Map>
    );
  }
}

const gMapApi =  GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_MAP_API_KEY)
})(MapSection);

export default withStyles(mapStyle)(gMapApi);
