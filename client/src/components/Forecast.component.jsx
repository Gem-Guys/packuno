import React from 'react';

const weatherStyle = {
  width: '100%',
  display: 'flex',
}
const fontSize = {
  fontSize: '10px'
}

const Forecast = props => (
  <div className="weather-widget" style={weatherStyle}>
    {props.weather.map(item => (
      <div className="weather-item" style={{ display: 'inline-block', padding: '20px' }}>
        <h3>{item.title}</h3>
        <div className="temp" style={fontSize}>
          {item.fcttext}
        </div>
        <div className="weather-pic">
          <img src={item.icon_url} />
        </div>
      </div>))}
  </div>
);

export default Forecast;
