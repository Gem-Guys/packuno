import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Activity from './Activity.component';
import Templates from '../../../database/templateSeed.json';
import List from 'material-ui/List';
import { AddRecommended } from '../containers/AddItem.container';

class TripFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: Object.keys(Templates),
      selected: [],
      // activities: [
      //   {
      //     activity: 'Fine Dining',
      //     click: false,
      //   },
      //   {
      //     activity: 'Beach',
      //     click: false,
      //   },
      //   {
      //     activity: 'Gym',
      //     click: false,
      //   }]
    }
    this.toggleBox = this.toggleBox.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  componentWillMount() {
    this.selectedBox = new Set();
  }

  toggleBox(label) {
    console.log('im the label', label);
    if (this.selectedBox.has(label)) {
      this.selectedBox.delete(label);
    } else {
      this.selectedBox.add(label);
    }
    console.log(this.selectedBox);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const activityList = [];
    for (const box of this.selectedBox) {
      activityList.push(box);
    }
    console.log('activityList', activityList);
    this.setState({selected: activityList}, )
  }

  render(){
    return (
      <div>
        Activities

        <form onSubmit={this.handleFormSubmit}>
          {this.state.activities.map(activity => {
            return <Activity activity={activity} handleCheckboxChange={this.toggleBox} key={activity} />
          })}
          <button type='submit'>Enter</button>
        </form>
        {this.state.selected.map(category => {
          return <AddRecommended category={category} key={category} />
        })}
      </div>
    )
  }
}

export default TripFilter;
