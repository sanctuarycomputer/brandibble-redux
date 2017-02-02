import { expect } from 'chai';
import reducer from 'reducers/session/menu/attributes';
import { MENU_FETCH } from 'actions/session/menu';

const initialState = null;
const payload = {attributes: {id:1}};

describe('reducers/session/menu/attributes', () => {
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
    expect(reduced).to.equal(payload.attributes);
  });
});
