import BrandibbleReduxException from './exception';

let reduxNamespace;
export const discoverReduxNamespace = (getState, brandibbleRef) => {
  const state = getState();

  reduxNamespace = Object.keys(state).reduce((found, key) => {
    if (found) return found;

    /**
     * For testing purposes we first check whether
     * the state is brandibble-redux, if so we return
     * false to indicate no namespace
     */
    if (Object.keys(state).includes('ref')) {
      if (state.ref === brandibbleRef) {
        return false;
      }
    }

    /**
     * Host apps should have brandibble-redux mounted
     * at the top level of their redux tree. If we can't find
     * a brandibble match at the top level we throw an error
     */
    if (Object.keys(state[key]).includes('ref')) {
      if (state[key].ref === brandibbleRef) return key;
    }
    return found;
  }, null);

  if (!reduxNamespace && reduxNamespace !== false) {
    throw new BrandibbleReduxException(
      'discoverReduxNamespace',
      "You haven't mounted Brandibble-Redux at the top-level of your reducer tree",
    );
  }

  return reduxNamespace;
};

export const getStateWithNamespace = (getState) => {
  if (reduxNamespace === false) return getState();

  if (!reduxNamespace) {
    throw new BrandibbleReduxException(
      'getStateWithNameSpace',
      "You haven't mounted Brandibble-Redux at the top-level of your reducer tree",
    );
  }

  return getState()[reduxNamespace];
};
