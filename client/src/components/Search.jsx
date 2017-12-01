import React, {Component} from 'react';
// import AutoComplete from 'react-autocomplete';
import {fakeRequest } from '../utils/searchCountry'



export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateValue: '',
      cityValue: '',
      unitedStates: [],
      loading: false
    }
    this.requestTimer = null;
    // this.renderItems = this.renderItems.bind(this);
  }

  renderItems(items) {
    console.log('im the items', items)
    return items.map((item, index) => {
      const text = item.props.children
      if (index === 0 || items[index - 1].props.children.charAt(0) !== text.charAt(0)) {
        return [<div className="item item-header">{text.charAt(0)}</div>, item]
      }
      else {
        return item
      }
    })
  }

  render() {
    // debugger;
    return (
      <div>
        <AutoComplete
          value = {this.state.stateValue}
          wrapperStyle={{ position: 'relative', display: 'inline-block' }}
          items={this.state.unitedStates}
          getItemValue={(item) => item.name}
          onSelect={(value, state) => this.setState({ value, unitedStates: [state] })}
          onChange={(event, value) => {
            this.setState({ stateValue, loading: true, unitedStates: [] })
            clearTimeout(this.requestTimer)
            this.requestTimer = fakeRequest(value, (items) => {
              this.setState({ unitedStates: items, loading: false })
            })
          }}

          renderItem={(item, isHighlighted) => (
            <div
              className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={item.abbr}
            >{item.name}</div>
          )}

          renderMenu={(items, value) => (
            <div className="menu">
              {value === '' ? (
                <div className="item">Choose a State</div>
              ) : this.state.loading ? (
                <div className="item">Loading...</div>
              ) : items.length === 0 ? (
                <div className="item">No matches for {value}</div>
              ) : this.renderItems(items)}
            </div>
          )}
        />
        <AutoComplete

        />
      </div>
    )
  }
}