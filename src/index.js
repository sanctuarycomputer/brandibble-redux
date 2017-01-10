import middleware from './config/middleware';
import reducers from './reducers';

export * from './actions';
export const reducer = reducers;
export const brandibbleMiddleware = middleware;
