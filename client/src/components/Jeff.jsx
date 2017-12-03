import React from 'react';
import AddTrip from '../containers/AddTrip.container';
import Weather from '../containers/Weather.container';
import TravelInformation from './TravelInformation.jsx';
import CurrencyConverter from './CurrencyConverter.jsx';

const addTripStyle = {
  display: 'inline-block',
};
const dashboardStyle = {
  display: 'inline-block',
  marginTop: '0',
};
const Jeff = () => (
  <div>
    <div  style={addTripStyle}>
      <AddTrip />
    </div>
    <div style={dashboardStyle}>
      <CurrencyConverter />
      <TravelInformation />
    </div>
    <Weather />
  </div>
);

export default Jeff;
