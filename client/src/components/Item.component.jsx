import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Template from '../../../database/templateSeed.json';


class Item extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(category, item) {
    // console.log('item', item, 'category', category);
    const { onSubmit, tripId, userId } = this.props;
    onSubmit(item, category || 'Other', null, tripId, userId);
    console.log(this.props);
    console.log('category: ', category, 'item: ', item);
  }

  render() {
    const { category } = this.props;
    console.log(category);
    return (
      <div>
        <div>{category}</div>
        {Template[category].map((item) => {
          console.log('im the thing', item);
          return (
            <div key={item}>
              <span>{item}</span>
              <Button color="primary" onClick={() => this.handleClick(category, item)}>Add</Button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Item;
