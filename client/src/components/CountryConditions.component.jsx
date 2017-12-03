/*eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import amChartData from '../utils/mapData/amCharts';
import countryConditionData from '../utils/mapData/countryCondition';
import $ from 'jquery';

class CountryConditions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transform: 'translate(0,0)',
      worldData: [],
      dataByCountry: {},
      mouseOverCountry: '',
      mouseOverCountryCondition: '',
    }
  }

  componentDidMount() {
    const worldData = amChartData.svg.g.path;
    const dataByCountry = worldData.reduce((acc, countryObj) => {
      const countryCondition = countryConditionData[countryObj.title];
      acc[countryObj.title] = {
        condition: countryCondition || undefined,
        color: (() => {
          if (countryCondition.toLowerCase().includes('normal')) {
            return '#00C853'
          } else if (countryCondition.toLowerCase().includes('high')) {
            return '#FFA726'
          } else if (countryCondition.toLowerCase().includes('avoid')) {
            return '#FF1744'
          }
        })(),
      }
      return acc;
    }, {});

    this.setState({
      worldData,
      dataByCountry,
    });
  }

  panView(event) {
    var boxHeight = $("#svg").height();
    var boxWidth = $("#svg").width();
    var boxPosition = $('#svg').position();

    const pageWidth = $(document).width();
    const pageHeight = $(document).height();

    const scaleX = boxWidth/pageWidth;
    const scaleY = boxHeight/pageHeight;

    var centerRelToPage = {
      x: boxWidth / 2 + boxPosition.left,
      y: boxHeight / 2 + boxPosition.top,
    };
    var translateX = (centerRelToPage.x - event.pageX) * scaleX;

    this.setState({
      transform: `translate(${translateX}, 0)`,
    });
  }

  mouseOver(countryName) {
    this.setState({
      mouseOverCountry: countryName,
      mouseOverCountryCondition: this.state.dataByCountry[countryName].condition,
    })
  }

  render() {

    const svgWidth = '1000';
    const svgHeight = '800';

    //EDIT THE DIMENSIONS OF THE PAN-ZOOM WINDOW RIGHT HERE IN ORDER TO HAVE THE
    //ELEMENT FIT ON THE PAGE

    const stylePanZoomWindow = {
      width: '50%',
      height: '50%',
      display: 'flex',
      justifyContent: 'space-between',
    }

    const styleMapBackground = {
      fill: '#3D5AFE',
    };

    const styleMap = {
      transition: '1s',
    };

    const styleCountriesPath = {
      fill: '#BDBDBD',
      stroke: "#FFFFFF",
      strokeWidth: "0.5",
    };

    const styleToolTip = {
      fill: '#FFFFFF',
    };

    return (

      <div id="panZoomWindow" style={stylePanZoomWindow}>
        <svg
          id='svg'
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          onClick = { this.panView.bind(this) }
        >
          <rect width={svgWidth} height={svgHeight} style={styleMapBackground} />

          <g className="toolTip">
            <rect
              width={500}
              height={100}
              x={50}
              y={svgHeight - 100 - 20}
              rx={5}
              ry={5}
              style={styleToolTip}
            />
            <text
              x={60}
              y={svgHeight - 100 / 2 - 35}
              style={{
                fontSize: '20px',
                fontFamily: 'Arial',
                fontWeight: 'bold',
              }}
            >{ this.state.mouseOverCountry }
            </text>
            <text
              x={60}
              y={svgHeight - 100 / 2 - 5}
              style={{
                fontSize: '17px',
                fontFamily: 'Arial',
              }}
            >{ this.state.mouseOverCountryCondition }
            </text>
          </g>

          <g id="map" transform={this.state.transform} style={styleMap}>

            <g className="countries" >
              {
                this.state.worldData.map((countryObj, index) => (
                  <path
                    key={`path-${index}`}
                    d={countryObj.d}
                    style={styleCountriesPath}
                  />
                ))
              }
            </g>
            <g className="countryColor">
              {
                this.state.worldData.map((countryObj, index) => (
                  <path
                    className="countryColor"
                    key={`countryColor-${index}`}
                    d={countryObj.d}
                    onMouseMove={() => this.mouseOver(countryObj.title)}
                    fill={this.state.dataByCountry[countryObj.title].color}
                    style={{
                      opacity: '0',
                      stroke: "#FFFFFF",
                      strokeWidth: "0.5",
                      animationName: 'countryColor',
                      animationDelay: `${index * 10}ms`,
                      animationDuration: '1s',
                      animationFillMode: 'forwards',
                    }}
                  />
                ))
              }
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

CountryConditions.propTypes = {

};

export default CountryConditions;



