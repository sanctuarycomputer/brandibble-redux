/* global describe it beforeEach */
import { expect } from 'chai';
import reducer, { initialState } from 'reducers/session/favorites';
import {
  CREATE_FAVORITE,
  DELETE_FAVORITE,
  FETCH_FAVORITES,
  UPDATE_FAVORITE,
} from 'actions/session/favorites';

const fetchPayload = [{ favorite_item_id: 1 }];

describe('reducers/session/favorites', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  describe('action handlers', () => {
    let reduced;

    beforeEach(() => {
      reduced = reducer(initialState, {
        type: `${FETCH_FAVORITES}_FULFILLED`,
        payload: fetchPayload,
      });
    });

    it(`handles the ${FETCH_FAVORITES}_FULFILLED action`, () => {
      expect(reduced.favoritesById[fetchPayload[0].favorite_item_id]).to.exist;
    });

    it(`handles the ${DELETE_FAVORITE}_FULFILLED action`, () => {
      const payload = 1;
      reduced = reducer(reduced, {
        type: `${DELETE_FAVORITE}_FULFILLED`,
        payload,
      });
      expect(reduced.favoritesById[payload]).to.not.exist;
    });

    it(`handles the ${CREATE_FAVORITE}_FULFILLED action`, () => {
      const payload = { favorite_item_id: 'this-is-a-terrible-id' };
      reduced = reducer(reduced, {
        type: `${CREATE_FAVORITE}_FULFILLED`,
        payload,
      });
      expect(reduced.favoritesById[payload.favorite_item_id]).to.exist;
    });

    it(`handles the ${UPDATE_FAVORITE}_FULFILLED action`, () => {
      const payload = { favorite_item_id: fetchPayload[0].favorite_item_id, name: 'pb&j' };
      reduced = reducer(reduced, {
        type: `${UPDATE_FAVORITE}_FULFILLED`,
        payload,
      });
      expect(reduced.favoritesById[payload.favorite_item_id]).to.have.property('name', payload.name);
    });
  });
});
