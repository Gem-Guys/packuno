import React from 'react';

class Amazon extends React.Component {

  componentWillMount() {
    this.props.getAmazonItems('water-bottle');
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        {console.log(this.props)}
        {this.props.amazon.map(item => (
          <div className="product">
            <ul>{item.name}</ul>
            <img src={item.image}></img>
            <ul>{item.price}</ul>
          </div>
        ))
      }
      </div>
    );
  }
}

export default Amazon;
