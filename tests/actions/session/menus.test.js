/* global describe before it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { fetchMenu, FETCH_MENU } from 'actions/session/menus';
import { brandibble, SAMPLE_MENU_LOCATION_ID } from '../../config/stubs';

const mockStore = configureStore(reduxMiddleware);

describe('actions/session/menus', () => {
  describe('fetchMenu', () => {
    let store, actionsCalled, action;

    describe('calls actions', () => {
      before(() => {
        store = mockStore();
        return fetchMenu(brandibble, { locationId: SAMPLE_MENU_LOCATION_ID })(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call at least 2 actions', () => {
        expect(actionsCalled).to.have.length.of.at.least(2);
      });

      it(`should have ${FETCH_MENU}_PENDING action`, () => {
        action = find(actionsCalled, { type: `${FETCH_MENU}_PENDING` });
        expect(action).to.exist;
      });

      it(`should have ${FETCH_MENU}_FULFILLED action`, () => {
        action = find(actionsCalled, { type: `${FETCH_MENU}_FULFILLED` });
        expect(action).to.exist;
      });
    });
  });
});
