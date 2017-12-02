//Search Reducer
import React from 'react';
import Search from '../components/Search';
import { connect } from 'react-redux';


//SEARCH ACTION

const destinationAction = destination => ({
  type: "UPDATE_DESTINATION",
  destination: destination,
});

//  CONTAINER FOR SEARCH
const mapStateToProps = state => ({
  destination: state.destination,
});

const mapDispatchToProps = dispatch => ({
  Destination: (destination) => {
    dispatch(destinationAction(destination));
  },
});

const Destination = connect(mapStateToProps, mapDispatchToProps)(Search);
export default Destination;
