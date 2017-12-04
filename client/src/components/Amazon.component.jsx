import React from 'react';

class Amazon extends React.Component {

  render() {
    return (
      <div>
        <h1>Hello</h1>
        {console.log(this.props)}
        {this.props.amazon.map(item => (
          <div className="amazon">
            <img src={item.image} alt="product" className="amazonimg"></img>
            <ul>{item.name.split(' ')[0]}</ul>
            <ul>{item.qprice}</ul>
            <button className="amazonbutton" onClick={() => { window.open(item.url, '_blank'); }} >Shop</button>
          </div>
        ))
      }
      </div>
    );
  }
}

export default Amazon;
