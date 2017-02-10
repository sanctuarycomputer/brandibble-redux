import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { brandibble } from '../config/stubs';
import { setupBrandibble, setupBrandibbleRedux } from 'actions/setup';

const mockStore = configureStore(reduxMiddleware);


describe('actions/setup', () => {
  let store, action, actionsCalled;
  describe('setupBrandibble', () => {
    before(done => {
      store = mockStore();
      setupBrandibble(brandibble)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        done();
      });
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('brandbibble should be online', () => {
      action = find(actionsCalled, {type: 'SETUP_BRANDIBBLE_FULFILLED'});
      expect(action).to.exist;
    });
  });

  describe('setupBrandibbleRedux', () => {
    before(done => {
      store = mockStore();
      setupBrandibbleRedux(brandibble)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        done();
      });
    });

    it('should call at least 2 actions', () => {
      expect(actionsCalled).to.have.length.of.at.least(2);
    });

    it('should have SETUP_BRANDIBBLE_REDUX_PENDING action', () => {
      action = find(actionsCalled, {type: 'SETUP_BRANDIBBLE_REDUX_PENDING'});
      expect(action).to.exist;
    });

    it('should have SETUP_BRANDIBBLE_REDUX_FULFILLED action', () => {
      action = find(actionsCalled, {type: 'SETUP_BRANDIBBLE_REDUX_FULFILLED'});
      expect(action).to.exist;
    });
  });
});
