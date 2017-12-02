const updateDestination = (state = 'Tokyo, Tokyo, Japan', action) => {
  if (action.type === 'UPDATE_DESTINATION') {
    return action.destination;
  }
  return state;
};

export default updateDestination;
