import React from 'react';

const Historical = props => (
  <div className="weather-widget">
    <h2>Monthly Average</h2>
    {props.weather.map(item => (
      <div className="weather-item" >
        <h2>{item[0]}</h2>
        <div className="temp">
          {item[1] += '\u00B0'}
        </div>
      </div>))}
  </div>
);

export default Historical;
