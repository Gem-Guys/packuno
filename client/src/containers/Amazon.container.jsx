import { connect } from 'react-redux';
import Amazon from '../components/Amazon.component';
import { retrieveAmazonAsync } from '../actions/Amazon.actions';


const mapStateToProps = state => ({
  amazon: state.amazon,
});

const mapDispatchToProps = dispatch => ({
  getAmazonItems: (query) => {
    dispatch(retrieveAmazonAsync(query));
  },
});

const AmazonCont = connect(mapStateToProps, mapDispatchToProps)(Amazon);

export default AmazonCont;
