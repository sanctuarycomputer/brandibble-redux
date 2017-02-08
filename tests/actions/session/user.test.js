import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { brandibble, SAMPLE_EMAIL } from '../../config/stubs';
import { validateUser } from 'actions/session/user';

const mockStore = configureStore(reduxMiddleware);
const success = () => 'success';
const fail = () => 'fail';

describe('actions/session/user', () => {
  describe('validateUser', () => {
    let store, actionsCalled, action;

    describe('calls actions', () => {
      before(done => {
        store = mockStore();
        validateUser(brandibble, SAMPLE_EMAIL)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
          done();
        });
      });

      it('should call at least 2 actions', () => {
        expect(actionsCalled).to.have.length.of.at.least(2);
      });

      it('should have VALIDATE_USER_PENDING action', () => {
        action = find(actionsCalled, {type: 'VALIDATE_USER_PENDING'});
        expect(action).to.exist;
      });

      it('should have VALIDATE_USER_FULFILLED action', () => {
        action = find(actionsCalled, {type: 'VALIDATE_USER_FULFILLED'});
        expect(action).to.exist;
      });
    });

    describe('handles callbacks', () => {
      beforeEach(done => {
        store = mockStore();
        done();
      });

      it('should handle success callback', () => {
        validateUser(brandibble, SAMPLE_EMAIL, success)(store.dispatch).then(res => {
          expect(res).to.equal('success');
        });
      });

      it('should handle fail callback', () => {
        validateUser(brandibble, null, success, fail)(store.dispatch).then(res => {
          actionsCalled = store.getActions();
          action = find(actionsCalled, {type: 'VALIDATE_USER_REJECTED'});
          expect(action).to.exist;
          expect(res).to.equal('fail');
        });
      });
    });
  });
});
