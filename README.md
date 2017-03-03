# Brandibble Redux

[![npm](https://img.shields.io/npm/v/brandibble-redux.svg?style=flat-square)](https://www.npmjs.com/package/brandibble-redux)
[![CircleCI Status](https://img.shields.io/circleci/project/github/sanctuarycomputer/brandibble-redux/master.svg?label=circle&maxAge=43200&style=flat-square)](https://circleci.com/gh/sanctuarycomputer/brandibble-redux)
[![Open Source Love](https://img.shields.io/npm/l/brandibble-redux.svg?style=flat-square)](https://en.wikipedia.org/wiki/MIT_License)

A set of actions, reducers, and redux middleware for Brandibble.

### Configuration
#### Middleware
```js
import { brandibbleMiddleware } from 'brandibble-redux';
import { createStore, applyMiddleware, compose } from 'redux';

const store = createStore(
  ...
  compose(
    applyMiddleware(...brandibbleMiddleware),
  )
  ...
);
```
#### Actions
```js
import { fetchAllergens } from 'brandibble-redux';

...
dispatch(fetchAllergens(brandibble));
...
```
#### Reducers
```js
import { reducer as brandibbleReducer } from 'brandibble-redux';
import { combineReducers } from 'redux';

export default combineReducers({
  ...
  brandibble: brandibbleReducer,
  ...
});
```

### Example
```js
import App from './components/App';
import LoadingState from './components/LoadingState';
import {
  Brandibble,
  setupBrandibbleRedux,
} from 'brandibble-redux';
import { connect } from 'redux';
import { Component } from 'react'; // or 'react-native'

const brandibble = new Brandibble({
  // ...config
});

const mapStateToProps = state => {
  const { setupBrandibbleRedux } = state.brandibble.status;

  return {
    loaded: setupBrandibbleRedux === 'FULFILLED',
  };
};

const mapDispatchToProps = dispatch => {
  setup: () => dispatch(setupBrandibbleRedux(brandibble)),
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {

  componentWillMount() {
    setup();
  }

  render() {
    const { loaded } = this.props;
    return loaded ? <LoadingState /> : <App />;
  }
}

```

### Working on Brandibble Redux
**IMPORTANT:** Set an environment variable called `BRANDIBBLE_API_KEY` with your Brandibble API key before running tests.
```
git clone https://github.com/sanctuarycomputer/brandibble-redux
cd brandibble-redux
npm install

// Run tests (in chrome) with:
npm test
```
