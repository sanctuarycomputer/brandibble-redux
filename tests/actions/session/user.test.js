/* global describe afterEach before beforeEach it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import reduxCrud from 'redux-crud';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import {
  authenticateUser,
  createUser,
  fetchUser,
  resolveUser,
  unauthenticateUser,
  updateUser,
  validateUser,
} from 'actions/session/user';
import { brandibble, SAMPLE_EMAIL, validCredentialsStub } from '../../config/stubs';

const {
  USER_CREATE_START,
  USER_CREATE_SUCCESS,
  USER_CREATE_ERROR,
  USER_UPDATE_START,
  USER_UPDATE_SUCCESS,
} = reduxCrud.actionTypesFor('user');

const mockStore = configureStore(reduxMiddleware);
const success = () => this.status = 'success';
const fail = () => this.status = 'fail';

describe('actions/session/user', () => {
  describe('validateUser', () => {
    let store, actionsCalled, action;

    describe('calls actions', () => {
      before(() => {
        store = mockStore();
        return validateUser(brandibble, SAMPLE_EMAIL)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call at least 2 actions', () => {
        expect(actionsCalled).to.have.length.of.at.least(2);
      });

      it('should have VALIDATE_USER_PENDING action', () => {
        action = find(actionsCalled, { type: 'VALIDATE_USER_PENDING' });
        expect(action).to.exist;
      });

      it('should have VALIDATE_USER_FULFILLED action', () => {
        action = find(actionsCalled, { type: 'VALIDATE_USER_FULFILLED' });
        expect(action).to.exist;
      });
    });

    describe('handles callbacks', () => {
      beforeEach(() => store = mockStore());

      it('should handle success callback', () => {
        validateUser(brandibble, SAMPLE_EMAIL, success)(store.dispatch).then(() => {
          expect(this.status).to.equal('success');
        });
      });

      it('should handle fail callback', () => {
        validateUser(brandibble, null, success, fail)(store.dispatch).then(() => {
          expect(this.status).to.equal('fail');
        });
      });
    });
  });

  describe('authenticateUser', () => {
    let store, actionsCalled, action;

    describe('calls actions', () => {
      before(() => {
        store = mockStore();
        return authenticateUser(brandibble, validCredentialsStub)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call at least 2 actions', () => expect(actionsCalled).to.have.length.of.at.least(2));

      it('should have AUTHENTICATE_USER_PENDING action', () => {
        action = find(actionsCalled, { type: 'AUTHENTICATE_USER_PENDING' });
        expect(action).to.exist;
      });

      it('should have AUTHENTICATE_USER_FULFILLED action', () => {
        action = find(actionsCalled, { type: 'AUTHENTICATE_USER_FULFILLED' });
        expect(action).to.exist;
      });
    });

    describe('handles callbacks', () => {
      beforeEach(() => store = mockStore());

      it('should handle success callback', () => {
        authenticateUser(brandibble, validCredentialsStub, success)(store.dispatch).then(() => {
          expect(this.status).to.equal('success');
        });
      });

      it('should handle fail callback', () => {
        authenticateUser(brandibble, null, success, fail)(store.dispatch).then(() => {
          expect(this.status).to.equal('fail');
        });
      });
    });

    describe('throws error on wrong credentials', () => {
      let credentials;
      before(() => {
        credentials = validCredentialsStub;
        credentials.password = 'SUPER WRONG PASSWORD';
        store = mockStore();
        return authenticateUser(brandibble, credentials)(store.dispatch).catch(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call at least 2 actions', () => expect(actionsCalled).to.have.length.of.at.least(2));

      it('should have AUTHENTICATE_USER_PENDING action', () => {
        action = find(actionsCalled, { type: 'AUTHENTICATE_USER_PENDING' });
        expect(action).to.exist;
      });

      it('should have AUTHENTICATE_USER_REJECTED action', () => {
        action = find(actionsCalled, { type: 'AUTHENTICATE_USER_REJECTED' });
        expect(action).to.exist;
      });
    });
  });

  describe('unauthenticateUser', () => {
    let store, actionsCalled, action, response;

    describe('calls actions', () => {
      before(() => {
        store = mockStore();
        return unauthenticateUser(brandibble, success)(store.dispatch).then(({ value }) => {
          actionsCalled = store.getActions();
          response = value;
        });
      });

      it('should call at least 2 actions', () => expect(actionsCalled).to.have.length.of.at.least(2));

      it('should have UNAUTHENTICATE_USER_PENDING action', () => {
        action = find(actionsCalled, { type: 'UNAUTHENTICATE_USER_PENDING' });
        expect(action).to.exist;
      });

      it('should have AUTHENTICATE_USER_FULFILLED action', () => {
        action = find(actionsCalled, { type: 'UNAUTHENTICATE_USER_FULFILLED' });
        expect(action).to.exist;
      });

      it('should handle success callback', () => {
        expect(response).to.equal('success');
      });
    });
  });

  describe('resolveUser', () => {
    let store, actionsCalled, action;

    describe('calls actions', () => {
      before(() => {
        store = mockStore();
        return resolveUser(brandibble)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call at least 2 actions', () => {
        expect(actionsCalled).to.have.length.of.at.least(2);
      });

      it('should have RESOLVE_USER_PENDING action', () => {
        action = find(actionsCalled, { type: 'RESOLVE_USER_PENDING' });
        expect(action).to.exist;
      });

      it('should have RESOLVE_USER_FULFILLED action', () => {
        action = find(actionsCalled, { type: 'RESOLVE_USER_FULFILLED' });
        expect(action).to.exist;
      });
    });

    describe('when unauthorized', () => {
      before(() => {
        store = mockStore();
        return unauthenticateUser(brandibble, validCredentialsStub)(store.dispatch).then(() => {
          return resolveUser(brandibble)(store.dispatch).then(() => {
            actionsCalled = store.getActions();
            action = find(actionsCalled, { type: 'RESOLVE_USER_FULFILLED' });
          });
        });
      });

      it('should have RESOLVE_USER_FULFILLED action', () => expect(action).to.exist);

      it('RESOLVE_USER_FULFILLED action should have an object with no keys', () => {
        expect(Object.keys(action.payload)).to.have.length.of(0);
      });
    });
  });

  describe('createUser', () => {
    let store, actionsCalled, action, userData;

    describe('valid data', () => {
      before(() => {
        store = mockStore();
        userData = {
          first_name: 'Hugh',
          last_name: 'Francis',
          email: `sanctuary-testing-${(new Date()).valueOf().toString()}@example.com`,
          password: 'password',
        };

        return createUser(brandibble, userData)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call at least 2 actions', () => expect(actionsCalled).to.have.length.of.at.least(2));

      it('should have USER_CREATE_START action', () => {
        action = find(actionsCalled, { type: USER_CREATE_START });
        expect(action).to.exist;
      });

      it('should have USER_CREATE_SUCCESS action', () => {
        action = find(actionsCalled, { type: USER_CREATE_SUCCESS });
        expect(action).to.exist;
      });

      describe('able to be authenticated', () => {
        let id;

        before(() => {
          action = find(actionsCalled, { type: USER_CREATE_SUCCESS });
          id = action.record.customer_id;

          return authenticateUser(brandibble, userData)(store.dispatch).then(() => {
            actionsCalled = store.getActions();
          });
        });

        it('should have AUTHENTICATE_USER_FULFILLED action', () => {
          action = find(actionsCalled, { type: 'AUTHENTICATE_USER_FULFILLED' });
          expect(action).to.exist;
        });

        describe('fetchUser', () => {
          before(() => {
            store.clearActions();
            return fetchUser(brandibble, id)(store.dispatch).then(() => {
              actionsCalled = store.getActions();
            });
          });

          it('should call at least 2 actions', () => expect(actionsCalled).to.have.length.of.at.least(2));

          it('should have FETCH_USER_PENDING action', () => {
            action = find(actionsCalled, { type: 'FETCH_USER_PENDING' });
            expect(action).to.exist;
          });

          it('should have FETCH_USER_FULFILLED action', () => {
            action = find(actionsCalled, { type: 'FETCH_USER_FULFILLED' });
            expect(action).to.exist;
          });
        });

        describe('updateUser', () => {
          before(() => {
            store.clearActions();
            userData.first_name = 'Boo';
            return updateUser(brandibble, id, userData)(store.dispatch).then(() => {
              actionsCalled = store.getActions();
            });
          });

          it('should call at least 2 actions', () => expect(actionsCalled).to.have.length.of.at.least(2));

          it('should have USER_UPDATE_START action', () => {
            action = find(actionsCalled, { type: USER_UPDATE_START });
            expect(action).to.exist;
          });

          it('should have USER_UPDATE_SUCCESS action', () => {
            action = find(actionsCalled, { type: USER_UPDATE_SUCCESS });
            expect(action).to.exist;
          });
        });
      });
    });

    describe('invalid data', () => {
      before(() => {
        store = mockStore();
        userData = {
          first_name: 'Hugh',
          last_name: 'Francis',
          email: `sanctuary-testing-${(new Date()).valueOf().toString()}@example`,
          password: 'password',
        };

        return createUser(brandibble, userData)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call at least 2 actions', () => {
        expect(actionsCalled).to.have.length.of.at.least(2);
      });

      it('should have USER_CREATE_START action', () => {
        action = find(actionsCalled, { type: USER_CREATE_START });
        expect(action).to.exist;
      });

      it('should have USER_CREATE_ERROR action', () => {
        action = find(actionsCalled, { type: USER_CREATE_ERROR });
        expect(action).to.exist;
      });
    });
  });
});
