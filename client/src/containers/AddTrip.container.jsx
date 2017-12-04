import { connect } from 'react-redux';
import AddTrip from '../components/AddTrip.component';
import { addTrip, updateCurrentTrip, destinationAction } from '../actions/trips.actions';
import { setHistoricalAsync as Historical, setForecastAsync as Forecast } from '../actions/weather.actions';

const getRecent5Trips = state => (
  state.trips.allIds.slice(-5).reverse()
);


const mapStateToProps = state => ({
  trips: state.trips,
  userId: state.userId,
  recentTrips: getRecent5Trips(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (destination, startDate, endDate, oldTripId, userId) => {
    dispatch(addTrip(destination, startDate, endDate, oldTripId, userId));
  },
  Destination: (destination) => {
    dispatch(destinationAction(destination));
  },
});

const AddTripContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTrip);

export default AddTripContainer;
