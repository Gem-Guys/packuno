import isoCode from '../utils/weatherHelper.js';

const request = require('request');
const rp = require('request-promise');

export const showCurrent = filter => ({
  type: 'SHOW_CURRENT',
  filter,
});

export const showHistorical = filter => ({
  type: 'SHOW_HISTORICAL',
  filter,
});

export const setHistorical = historicalArray => ({
  type: 'SET_HISTORICAL',
  historical: historicalArray,
});

export const setHistoricalAsync = () => (dispatch, getState) => {
  const state = getState();
  console.log('---------------------', state);
  const options = {
    type: 'GET',
    uri: 'http://localhost:3000/weather',
    qs: {
      tripStart: state.trips.byId[state.currentTripId].departureDate.replace(/-/gi, ''),
      tripEnd: state.trips.byId[state.currentTripId].returnDate.replace(/-/gi, ''),
      country: state.destination.split(', ')[2],
    },
  };
  const weather = rp(options);
  return weather.then((result) => {
    dispatch(setHistorical(result));
  });
};

export const setForecast = forecastArray => ({
  type: 'SET_FORECAST',
  forecast: forecastArray,
});

export const setForecastAsync = () => (dispatch, getState) => {
  let { destination } = getState();
  destination = destination.split(', ');
  let country = '';
  if (destination[2] === 'United States') {
    country = destination[1];
  } else {
    country = destination[2];
  }
  const options = {
    type: 'GET',
    uri: 'http://localhost:3000/forecast',
    qs: {
      country,
      city: destination[0],
    },
  };
  const attack = rp(options);
  return attack.then((result) => {
    const forecast = JSON.parse(result);
    const txtForecast = forecast.forecast.txt_forecast.forecastday;
    const finalForecast = txtForecast.filter((item, i) => i % 2 === 0);
    dispatch(setForecast(finalForecast));
  });
};

