import React from 'react';
import AddTrip from '../containers/AddTrip.container';
import Weather from '../containers/Weather.container';
import TravelInformation from './TravelInformation.jsx';
import CurrencyConverter from './CurrencyConverter.jsx';
<<<<<<< f6a99207a7075030e3f10b954dad7afe271b08eb
import CountryConditions from './CountryConditions.component';
=======
import Amazon from '../containers/Amazon.container';
>>>>>>> Add Amazon api call

const addTripStyle = {
  display: 'inline-block',
};
const dashboardStyle = {
  display: 'inline-block',
  marginTop: '0',
};
const Jeff = () => (
  <div>
    <div style={addTripStyle}>
      <AddTrip />
    </div>
    <div style={dashboardStyle}>
      <CurrencyConverter />
      <TravelInformation />
    </div>
    <Weather />
<<<<<<< f6a99207a7075030e3f10b954dad7afe271b08eb
    <CountryConditions />
=======
    <Amazon />
>>>>>>> Add Amazon api call
  </div>
);

export default Jeff;


