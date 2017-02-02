import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { brandibble, SAMPLE_MENU_LOCATION_ID } from '../../config/stubs';
import { fetchMenu } from 'actions/session/menu';

const mockStore = configureStore(reduxMiddleware);

describe('actions/session/menu', () => {
  describe('fetchMenu', () => {
    let store, actionsCalled, action;

    before(done => {
      store = mockStore();
      brandibble.orders.create(SAMPLE_MENU_LOCATION_ID).then(() => {
        fetchMenu(brandibble, SAMPLE_MENU_LOCATION_ID)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
          done();
        });
      });
    });

    it('should call at least 2 actions', () => {
      expect(actionsCalled).to.have.length.of.at.least(2);
    });

    it('should have MENU_FETCH_PENDING action', () => {
      action = find(actionsCalled, {type: 'MENU_FETCH_PENDING'});
      expect(action).to.exist;
    });

    it('should have MENU_FETCH_FULFILLED action', () => {
      action = find(actionsCalled, {type: 'MENU_FETCH_FULFILLED'});
      expect(action).to.exist;
      expect(action).to.have.property('payload');
    });
  });
});
