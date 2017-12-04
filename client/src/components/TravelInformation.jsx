import React from 'react';
import axios from 'axios';

const countries = require('country-list')();


const travelDataUrl = 'https://cadatacatalog.state.gov/dataset/7233a430-59d6-437a-99a0-53183366f24c/resource/70630a59-0f74-4fae-83cb-098b28c71793/download/countrytravelinfo.json';
const travelDataUrl2 = 'https://cadatacatalog.state.gov/storage/f/2016-03-03T20%3A05%3A31.000Z/csi.json';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const travelInfoStyle = {
  width: '300px',
  height: '500px',
};
const fixedBarStyle = {
  position: 'static',
  width: '680px',
  top: '0',
  left: '0',
  clear: 'both',
};
const infoStyle = {
  position: 'sticky',
  marginTop: '40px',
  width: '655px',
  height: '500px',
  padding: '20px',
  overflow: 'scroll',
};

class TravelInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      info: '',
      countryData: '',
      selectedData: '',
      isoCode: 'CA',
    };
  }
  componentDidMount() {
    axios.request({
      url: proxyUrl + travelDataUrl2,
      method: 'get',
    }).then((data) => {
      this.setState({
        countryData: data.data,
      });
    });
  }
  renderInfo(subData) {
    let isoCode = '';
    let country = window.store.getState().destination;
    country = country.split(',');
    country = country[country.length - 1].slice(1);
    isoCode = country === 'Russia' ? countries.getCode('Russian Federation') : countries.getCode(country) || 'CA';
    this.setState({
      isoCode,
    }, () => {
      if (this.state.countryData) {
        const dataArr = this.state.countryData;
        let country = dataArr.filter((country) => {
          if (country.iso_code) {
            return country.iso_code === this.state.isoCode;
          } 
        })[0];
        if (!country) {
          country = dataArr.filter((country) => {
            return country.tag === this.state.isoCode;
          })[0];
        }
        console.log(country);
        this.setState({
          info: country[subData],
          selectedData: subData,
          render: !this.state.render,
        });
      }
    });
  }

  render() {
    return (
      <div style={travelInfoStyle}>
        <div className="btn-group sticky-top" role="group" aria-label="Basic example" style={fixedBarStyle}>
          <button
            type="button"
            className="btn btn-primary btn-secondary"
            onClick={this.renderInfo.bind(this, 'destination_description')}
          >
            {this.state.countryData ? 'Description' : 'Loading...' }
          </button>
          <button
            type="button"
            className="btn btn-primary btn-secondary"
            onClick={this.renderInfo.bind(this, 'entry_exit_requirements')}
          >
            {this.state.countryData ? 'Visa Requirement' : 'Loading...' }
          </button>
          <button
            type="button"
            className="btn btn-primary btn-secondary"
            onClick={this.renderInfo.bind(this, 'health')}
          >
            {this.state.countryData ? 'Health' : 'Loading...' }
          </button>
          <button
            type="button"
            className="btn btn-primary btn-secondary"
            onClick={this.renderInfo.bind(this, 'local_laws_and_special_circumstances')}
          >
            {this.state.countryData ? 'Local Laws' : 'Loading...' }
          </button>
          <button
            type="button"
            className="btn btn-primary btn-secondary"
            onClick={this.renderInfo.bind(this, 'safety_and_security')}
          >
            {this.state.countryData ? 'Safety' : 'Loading...' }
          </button>
          <button
            type="button"
            className="btn btn-primary btn-secondary"
            onClick={this.renderInfo.bind(this, 'travel_transportation')}
          >
            {this.state.countryData ? 'Transportation' : 'Loading...' }
          </button>
          <button
            type="button"
            className="btn btn-primary btn-secondary"
            onClick={this.renderInfo.bind(this, 'travel_embassyAndConsulate')}
          >
            {this.state.countryData ? 'Embassy' : 'Loading...' }
          </button>
        </div>

        <div className="info-container" style={infoStyle}>
          {this.state.render && this.state.isoCode ? <div dangerouslySetInnerHTML={{ __html: this.state.info }} /> : ''}
        </div>
      </div>
    );
  }
}

export default TravelInformation;

