import React, { Component, PropTypes } from 'react';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    }

    this.toggleBoxChange = this.toggleBoxChange.bind(this);
  }


  toggleBoxChange() {
    const { activity, handleCheckboxChange } = this.props;
    console.log('im the activity', activity, 'im the handle', handleCheckboxChange);
    this.setState({ isChecked: !this.state.isChecked });
    handleCheckboxChange(activity);
  }

  render() {
    const { activity } = this.props;
    const { isChecked } = this.state;
    return (
      <div className="checkbox">
        <label>
          <input
          type="checkbox"
          value={activity}
          checked={isChecked}
          onChange={this.toggleBoxChange}
          />
          {activity}
        </label>
      </div>
    )
  }
};

export default Activity;