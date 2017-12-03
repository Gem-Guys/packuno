import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Trip from '../components/Trip.component';
import Dashboard from '../components/Dashboard.component';
import LoginCont from '../containers/Login.container';
import Jeff from '../components/Jeff';
import Weather from '../containers/Weather.container';


export class AppContainer extends React.Component {

  render() {
    // console.log('this.props in app component', this.props);
    // if (this.props.isLoggedIn) {
      return (
          <Router>
          <div>
            <Route path="/" component={Jeff} />
            <Route path="/test" render={ () => <Weather /> } />
            <Route path="/trip" component={Trip} />
            {/* <Route path="/login" component={LoginCont} /> */}
          </div>
        </Router>
      );
    // }
    // else {
    //   return (
    //     <LoginCont />
    //   );
    // }
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

