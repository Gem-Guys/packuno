import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from 'material-ui/Button';
import CurrencyAmountInput from './CurrencyAmountInput.jsx'
import CurrencyDropDown from './CurrencyDropDown.jsx';
import axios from 'axios';
import fx from 'money';
import Paper from 'material-ui/Paper';
const countries = require('country-list')();
const currency = require('currency-code-map')

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const currencyConverterStyle = {
  marginTop: '20px',
  marginBottom: '20px',
  backgroundColor: 'white',
};

const currencyCodeStyle = {
  color: 'blue',
};

const convertedAmountStyle = {
  color: 'green',
};

const buttonStyle = {
  padding: '20px',
  marginTop: '20px',
  marginBottom: '20px',
};

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromAmount: '',
      toAmount: '',
      fromCurrency: 'USD',
      toCurrency: 'CAD',
      countries: [],
      actualConversion: '',
      countryName: 'Canada',
      currencyCode: 'CAD',
    };
  }
  componentDidMount() {
    this.getRate();
  }
  onSubmit() {
    if (this.state.fromAmount) {
      let amount = this.state.fromAmount;
      amount = Number(amount[0]) !== Number(amount[0]) ? amount.split('').slice(1).join('') : amount;
      this.getRate(amount, this.state.fromCurrency, this.state.toCurrency);
    }
  }
  getRate(amount = 100, fromCurrency = 'USD', toCurrency = 'EUR') {
    axios.get('https://api.fixer.io/latest?base=USD')
      .then((data) => {
        fx.base = data.data.base;
        fx.rates = data.data.rates;
        return data.data.rates;
      })
      .then((rates) => {
        const foreignAmount = fx.convert(amount, {
          from: fromCurrency,
          to: toCurrency,
        }).toFixed(2);
        const countries = Object.keys(rates);


        this.setState({
          fromAmount: amount,
          toAmount: foreignAmount,
          countries: countries,
        }, () => {
          this.setState({
            actualConversion: `${this.state.fromAmount} ${this.state.fromCurrency} = ${this.state.toAmount} ${this.state.toCurrency}`,
          });
        });
      });
  }
  updateParentState(stateName, value) {
    this.setState({
      [stateName]: value,
    });
    let country = window.store.getState().destination;
    if (stateName === 'fromAmount' && this.state.countryName !== country) {
      let isoCode = '';
      country = country.split(',');
      country = country[country.length - 1].slice(1) || 'Canada';
      isoCode = country === 'Russia' ? countries.getCode('Russian Federation') : countries.getCode(country) || 'CA';
      console.log(country.split(''));
      this.setState({
        toCurrency: currency[isoCode],
        countryName: country,
        currencyCode: currency[isoCode],
      });
    }
  }

  render() {
    return (
      <div style={currencyConverterStyle}>
        <Paper>
          <h3>Currency Converter</h3>
          <div>{`${this.state.countryName}'s currency code is: `} <span style={currencyCodeStyle}>{this.state.currencyCode}</span></div>
          <div>
          </div>
          <MuiThemeProvider>
            <div>
              <div className="fromCurrency">
                <CurrencyAmountInput updateAmount={this.props.updateAmount} updateParentState={this.updateParentState.bind(this, 'fromAmount')}/>
              FROM: <CurrencyDropDown countries={this.state.countries} defaultCurrency={'USD'} updateParentState={this.updateParentState.bind(this, 'fromCurrency')} />
              </div>
              <div className="toCurrency">
                TO: <CurrencyDropDown  countries={this.state.countries} defaultCurrency={'CAD'} updateParentState={this.updateParentState.bind(this, 'toCurrency')}/>
              </div>
              <div>
              <Button raised color="primary" onClick={this.onSubmit.bind(this)} className={styles.button} style={buttonStyle}>
                Convert Currency
              </Button>
              </div>
              <div style={convertedAmountStyle}>{this.state.actualConversion}</div>
            </div>
          </MuiThemeProvider>
        </Paper>
      </div>
    )
  }
}

export default CurrencyConverter;
