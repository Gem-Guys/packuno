import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/Menu/MenuItem';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});
class CurrencyAmountInput extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  handleChange(e) {
    this.setState({
      value: e.target.value
    })
    this.props.updateParentState(e.target.value);

  }
  render() {
    return (
      <div>
          Amount: <TextField
            placeholder="$100"
            margin='normal'
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          /><br />
      </div>

    )
  }
}

export default CurrencyAmountInput;
