const amazonData = (state = '', action) => {
  if (action.type === 'SET_AMAZON_DATA') {
    return action.data;
  }
  return state;
};

export default amazonData;
