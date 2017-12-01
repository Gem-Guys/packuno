import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import isoCode from '../utils/weatherHelper';
import Promise from 'bluebird';
import Weather from '../components/Weather.component';
import { setHistoricalAsync as Historical, setForecastAsync as Forecast,showCurrent, showHistorical } from '../actions/weather.actions';

export class WeatherContainer extends React.Component {
  //grabs both historical and current forecast for the trip
  componentDidMount() {
    this.props.Forecast();
    this.props.Historical();
    this.props.showCurrent;
    this.props.showHistorical;
  }

  renderComponents() {
    if (this.props.historical === undefined && this.props.forecast === undefined) {
      return (<div>Loading</div>);
    }
    return (<Weather weatherFilter={this.props.weatherFilter} historical={this.props.historical} forecast={this.props.forecast} showCurrent={this.props.showCurrent } showHistorical={this.props.showHistorical} />);
  }

  render() {
    return (<div>{this.renderComponents()}</div>);
  }
}

const mapStateToProps = (state, ownProps) => ({ weatherFilter: state.weatherWidget, historical: state.setHistorical, forecast: state.setForecast });

const mapDispatchToProps = (dispatch, ownProps) => ({
  Historical: () => {
    dispatch(Historical());
  },
  Forecast: () => {
    dispatch(Forecast());
  },
  showCurrent: (filter) => {
    dispatch(showCurrent(filter));
  },
  showHistorical: (filter) => {
    dispatch(showHistorical(filter));
  },
});

const WeatherCont = connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
export default WeatherCont;

