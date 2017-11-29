import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Trip from '../components/Trip.component';
import Dashboard from '../components/Dashboard.component';
import LoginCont from '../containers/Login.container';
import Jeff from '../components/Jeff';


export class AppContainer extends React.Component {

  render() {
    console.log('this.props in app component', this.props);
    // if (this.props.isLoggedIn) {
      return (
        <Router>
          <div>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/trip" component={Trip} />
            <Route path="/test" component={Jeff} />
          </div>
        </Router>
      );
    // }
    // return (
    //   <LoginCont />
    // );
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

