const weatherWidget = (state = 'SHOW_CURRENT', action) => {
  if (action.type === 'SHOW_CURRENT') {
    return 'SHOW_CURRENT';
  } else if (action.type === 'SHOW_HISTORICAL') {
    return 'SHOW_HISTORICAL';
  }
  return state;
};

export default weatherWidget;
