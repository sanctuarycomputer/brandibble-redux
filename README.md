# Brandibble Redux

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

```
git clone https://github.com/sanctuarycomputer/brandibble-redux
cd brandibble-redux
npm install

// Now you can run your build with:
npm run build

// Run tests (in chrome) with:
npm test
```
