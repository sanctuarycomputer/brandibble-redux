import BrandibbleRef, { Constants as ConstantsRef } from 'brandibble';
import middleware from './config/middleware';
import reducers from './reducers';

export * from './utils/constants';
export * from './actions';
export * from './selectors';
export const Brandibble = BrandibbleRef;
export const reducer = reducers;
export const brandibbleMiddleware = middleware;
export const Constants = ConstantsRef;
