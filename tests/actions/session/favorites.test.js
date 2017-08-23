/* global describe afterEach before it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import {
  FETCH_FAVORITES,
  CREATE_FAVORITE,
  UPDATE_FAVORITE,
  DELETE_FAVORITE,
  fetchFavorites,
  createFavorite,
  updateFavorite,
  deleteFavorite,
} from 'actions/session/favorites';
import { authenticateUser } from 'actions/session/user';
import { brandibble, buildLineItem, validCredentialsStub } from '../../config/stubs';

const mockStore = configureStore(reduxMiddleware);

describe('actions/session/favorites', () => {
  let action, actionsCalled, store;

  before(() => {
    store = mockStore();
    return authenticateUser(brandibble, validCredentialsStub)(store.dispatch).then(() => {
      store.clearActions();
    });
  });

  afterEach(() => store.clearActions());

  describe('fetchFavorites', () => {
    before(() => {
      store = mockStore();
      return fetchFavorites(brandibble)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it(`should have ${FETCH_FAVORITES}_PENDING action`, () => {
      action = find(actionsCalled, { type: `${FETCH_FAVORITES}_PENDING` });
      expect(action).to.exist;
    });

    it(`should have ${FETCH_FAVORITES}_FULFILLED action`, () => {
      action = find(actionsCalled, { type: `${FETCH_FAVORITES}_FULFILLED` });
      expect(action).to.exist;
    });
  });
  describe('createFavorite', () => {
    let id;

    before(() => {
      const favorite = { name: 'my favorite', lineItem: buildLineItem() };
      return createFavorite(brandibble, favorite)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        action = find(actionsCalled, { type: `${CREATE_FAVORITE}_FULFILLED` });
        id = action.payload.favorite_item_id;
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it(`should have ${CREATE_FAVORITE}_PENDING action`, () => {
      action = find(actionsCalled, { type: `${CREATE_FAVORITE}_PENDING` });
      expect(action).to.exist;
    });

    it(`should have ${CREATE_FAVORITE}_FULFILLED action`, () => {
      action = find(actionsCalled, { type: `${CREATE_FAVORITE}_FULFILLED` });
      expect(action).to.exist;
    });

    describe('updateFavorite', () => {
      before(() => {
        store.clearActions();
        const favorite = { id, name: 'updated favorite', lineItem: buildLineItem() };
        return updateFavorite(brandibble, favorite)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

      it(`should have ${UPDATE_FAVORITE}_PENDING action`, () => {
        action = find(actionsCalled, { type: `${UPDATE_FAVORITE}_PENDING` });
        expect(action).to.exist;
      });

      it(`should have ${UPDATE_FAVORITE}_FULFILLED action`, () => {
        action = find(actionsCalled, { type: `${UPDATE_FAVORITE}_FULFILLED` });
        expect(action).to.exist;
      });
    });

    describe('deleteFavorite', () => {
      before(() => {
        store.clearActions();
        return deleteFavorite(brandibble, id)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

      it(`should have ${DELETE_FAVORITE}_PENDING action`, () => {
        action = find(actionsCalled, { type: `${DELETE_FAVORITE}_PENDING` });
        expect(action).to.exist;
      });

      it(`should have ${DELETE_FAVORITE}_FULFILLED action`, () => {
        action = find(actionsCalled, { type: `${DELETE_FAVORITE}_FULFILLED` });
        expect(action).to.exist;
      });
    });
  });
});
