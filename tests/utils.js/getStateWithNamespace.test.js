/* global describe it */
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { brandibble, stateWithBrandibbleRef } from '../config/stubs';
import {
  discoverReduxNamespace,
  getStateWithNamespace,
} from '../../src/utils/getStateWithNamespace';

const mockStore = configureStore(reduxMiddleware);

describe('utils/getStateWithNamespace/discoverReduxNamespace', () => {
  let store;
  it('it should throw if the store is empty', () => {
    store = mockStore();

    expect(() => discoverReduxNamespace(store.getState, brandibble)).to.throw;
  });

  it('it should throw if brandibble-redux is nested beyond the top-level', () => {
    store = mockStore({ stuff: { brandibble: stateWithBrandibbleRef } });

    expect(() => discoverReduxNamespace(store.getState, brandibble)).to.throw;
  });

  it('it should return false brandibble-redux IS the root state', () => {
    store = mockStore(stateWithBrandibbleRef);
    const testdiscoverReduxNamespace = discoverReduxNamespace(
      store.getState,
      brandibble,
    );

    expect(testdiscoverReduxNamespace).to.be.false;
  });

  it('it should return the root key as a string if brandibble-redux is mounted in a top-level node', () => {
    store = mockStore({ brandibble: stateWithBrandibbleRef });
    const testdiscoverReduxNamespace = discoverReduxNamespace(
      store.getState,
      brandibble,
    );

    expect(testdiscoverReduxNamespace).to.equal('brandibble');
  });
});

describe('utils/getStateWithNamespace/getStateWithNamespace', () => {
  let store;
  it("it should throw if discoverReduxNamespace hasn't run before getStateWithNamespace", () => {
    store = mockStore();

    expect(() => getStateWithNamespace(store.getState)).to.throw;
  });

  it('it should return the valid state if brandibble-redux is not namespaced', () => {
    store = mockStore(stateWithBrandibbleRef);
    discoverReduxNamespace(store.getState, brandibble);
    const testGetStateWithNamespace = getStateWithNamespace(store.getState);

    expect(testGetStateWithNamespace).to.deep.equal(stateWithBrandibbleRef);
  });

  it('it should return the correct state if brandibble-redux is mounted in a top-level node', () => {
    store = mockStore({ brandibble: stateWithBrandibbleRef });
    discoverReduxNamespace(store.getState, brandibble);
    const testGetStateWithNamespace = getStateWithNamespace(store.getState);

    expect(testGetStateWithNamespace).to.deep.equal(stateWithBrandibbleRef);
  });
});
