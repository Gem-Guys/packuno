import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
// const items = [];
// for (let i = 0; i < 100; i++ ) {
//   items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
// }

export default class CurrencyDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dropDownItems: [],
      selected: ''
    };
  }
  componentDidMount(){
    this.setState({
      value: this.props.defaultCurrency
    })
  }
componentWillReceiveProps(nextProps) {
  const countries = nextProps.countries;
  const items = [];
  if (countries) {
    for (let i = 0; i < countries.length; i++) {
      items.push(<MenuItem value={countries[i]} key={i}>{countries[i]}</MenuItem>)
    }
  }
  this.setState({
    dropDownItems: items
  })
}
handleChange(e) {
  this.setState({ value: e.target.value });
  this.props.updateParentState(e.target.value)
};

  // handleChange(event, index, value) {
  //   this.setState({value});
  // } 


  render() {
    const dropDownItems = this.state.dropDownItems ? this.state.dropDownItems : ''
    return (
      <Select value={this.state.value} onChange={this.handleChange.bind(this)}>
       {dropDownItems}
      </Select>
    );
  }
}