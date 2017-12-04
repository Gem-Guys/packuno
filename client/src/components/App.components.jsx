import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import AddTrip from '../containers/AddTrip.container';
import Dashboard from '../components/Dashboard.component';
import LoginCont from '../containers/Login.container';
import Jeff from '../components/Jeff';
import Weather from '../containers/Weather.container';

const addTripStyle = {
  display: 'inline-block',
};
const dashboardStyle = {
  display: 'inline-block',
  marginTop: '0',
};

export class AppContainer extends React.Component {

  render() {
    // console.log('this.props in app component', this.props);
    if (this.props.isLoggedIn) {
      return (
          <Router>
          <div>
            
            <Route path="/dashboard" component={Jeff} />
            <Route path="/test" render={ () => <Weather /> } />
            <div style={addTripStyle}>
              <Route path="/trip" component={AddTrip} />
            </div>
            {/* <Route path="/login" component={LoginCont} /> */}
          </div>
        </Router>
      );
    }
    else {
      return (
        <LoginCont />
      );
    }
  }
}

const mapStateToProps = state =>
  ({
    isLoggedIn: state.isLoggedIn,
  });

AppContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};


const App = connect(mapStateToProps, null)(AppContainer);

export default App;

