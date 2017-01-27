import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

export default [
  thunk,
  promiseMiddleware(),
];
