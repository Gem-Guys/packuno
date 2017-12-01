import React from 'react';
import Historical from './Historical.jsx';
import PropTypes from 'prop-types';
import Forecast from './Forecast.component.jsx';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: 600,
  }),
});

const Weather = (props) => {

  const renderWeather = () => {
    if (props.weatherFilter === 'SHOW_HISTORICAL') {
      return (<Historical weather={props.historical} />);
    }
    if (props.weatherFilter === 'SHOW_CURRENT') {
      return <Forecast weather={props.forecast} />;
    }
    return (<h2>Weather</h2>);
  };

  const changeWeather = (e, type) => {
    console.log(type);
    if (type === 'current') {
      props.showCurrent('SHOW_CURRENT');
    } else if (type === 'historical') {
      props.showHistorical('SHOW_HISTORICAL');
    }
  };

  const { classes } = props;
  return (
    <Paper className={classes.root} elevation={4}>
      <h2>Weather</h2>
      <Button onClick={(e) => { changeWeather(e, 'current'); }} type="submit" name="SHOW_CURRENT" flat color="primary" >
      Forecast
      </Button>
      <Button onClick={(e) => { changeWeather(e, 'historical'); }} type="submit" name="SHOW_HISTORICAL" flat color="primary" >
      Historical
      </Button>
      {renderWeather()}
    </Paper>
    );
};

Weather.propTypes = {
  weatherFilter: PropTypes.string.isRequired,
  historical: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Weather);

