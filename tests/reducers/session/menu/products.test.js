import { expect } from 'chai';
import reducer from 'reducers/session/menu/products';
import { MENU_FETCH } from 'actions/session/menu';

const initialState = null;
const payload = {products: [{id:1},{id:2}]};

describe('reducers/session/menu/products', () => {
  it('should return the initial state', () => {
    expect(
      reducer(initialState, {})
    ).to.equal(initialState);
  });

  it('handles the MENU_FETCH_FULFILLED action', () => {
    let reduced = reducer(initialState, {
      type: `${MENU_FETCH}_FULFILLED`,
      payload,
    });
    expect(reduced).to.equal(payload.products);
  });
});
