/* global describe before it */
import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import reduxMiddlewares from '../../src/config/middleware';
import rootReducer from '../../src/reducers';
import { brandibble, SAMPLE_MENU_LOCATION_ID } from '../config/stubs';
import { fetchLocation } from '../../src/actions/data/locations';

const store = createStore(rootReducer, applyMiddleware(...reduxMiddlewares));

describe('selectors/validTimeSlotForNow', () => {
  /**
   * We want to ensure we have the necessary data
   * in Redux in order to test our selector
   */

  // Setup brandibble with location id
  // fetch location with service type, requested at
  // and include times flag
  let location;
  let state;
  before(() => {
    return fetchLocation(brandibble, SAMPLE_MENU_LOCATION_ID, {
      service_type: 'pickup',
      requested_at: new Date(),
      include_times: true,
    })(store.dispatch).then((response) => {
      location = response.value;
      state = store.getState();
    });
  });

  it('should have locations available', () => {
    expect(location).to.exist;
  });
});
