import React from 'react';

class Amazon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amazonData: this.props.amazonData,
    };
  }

  componentDidMount() {
    this.props.getAmazonItems('water-bottle');
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <h1>{this.props.amazonData}</h1>
        {console.log(this.props.amazonData)}
      </div>
    );
  }
}

export default Amazon;

