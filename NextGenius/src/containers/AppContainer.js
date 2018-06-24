import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import ScrollToTop from 'react-scroll-up';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import IconButton from 'components/CustomButtons/IconButton.jsx';

class App extends React.Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  render() {
    const { routes, store } = this.props;
    const upStyle = {
      zIndex: 10
    };

    return (
      <React.Fragment>
        <Provider store={store}>{routes}</Provider>
        <ScrollToTop showUnder={160} duration={1000} style={upStyle}>
          <IconButton color="primary">
            <ArrowUpward />
          </IconButton>
        </ScrollToTop>
      </React.Fragment>
    );
  }
}

export default App;
