const rp = require('request-promise');

const setAmazonData = result => ({
  type: 'SET_AMAZON_DATA',
  data: result,
});

const retrieveAmazonAsync = query => (dispatch) => {
  console.log('-------------------->', query);
  const options = {
    type: 'GET',
    uri: 'http://localhost:3000/amazon',
    qs: { query },
  };
  const AmazonItems = rp(options);
  return AmazonItems.then((result) => {
    console.log('api results ------>', result);
    dispatch(setAmazonData(result));
  });
};

module.exports.retrieveAmazonAsync = retrieveAmazonAsync;
