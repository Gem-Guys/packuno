import React from 'react';
import Weather from '../containers/Weather.container';
import TravelInformation from './TravelInformation.jsx';
import CurrencyConverter from './CurrencyConverter.jsx';
import CountryConditions from './CountryConditions.component';
import Amazon from '../containers/Amazon.container';
import Trip from '../components/Trip.component';


const dashboardStyle = {
  display: 'inline-block',
  marginTop: '0',
};
const Jeff = () => (
  <div>
    <Trip />
    <div style={dashboardStyle}>
      <CurrencyConverter />
      <TravelInformation />
    </div>
    <Weather />
    <CountryConditions />
    <Amazon />
  </div>
);

export default Jeff;
