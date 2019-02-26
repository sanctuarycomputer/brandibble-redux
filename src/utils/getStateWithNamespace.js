let reduxNamespace;

export const discoverReduxNamespace = (getState, brandibbleRef) => {
  const state = getState(); 

  reduxNamespace = Object.keys(state).reduce((found, key) => {
    if (found) return found;
    if (Object.keys(state[key]).includes('ref')) {
      return (state[key].ref === brandibbleRef); 
    }
    return found;
  }, null);

  if (!reduxNamespace) throw "you haven't mounted brandibble-redux on the top level of your reducer tree";

  return reduxNamespace;
}

export const getStateWithNamespace = (getState) => {
  if (!reduxNamespace) throw "you haven't mounted brandibble-redux on the top level of your reducer tree";

  return getState()[reduxNamespace];
}
