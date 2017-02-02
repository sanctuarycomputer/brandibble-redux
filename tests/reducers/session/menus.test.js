import { expect } from 'chai';
import reduxCrud from 'redux-crud';
import reducer from 'reducers/session/menus';
import generateUUID from 'utils/generateUUID';

const { MENUS_FETCH_SUCCESS } = reduxCrud.actionTypesFor('menus');
const initialState = {};
const payload = {
  id: generateUUID(),
  expires_at: "2016-07-09T03:59:00Z",
  sold_out_items: [0],
  menu: [
    {
      slug: "marketplates",
      pos_display_color: "",
      name: "Marketplates",
      items: [],
    }
  ],
}

describe('reducers/session/menus', () => {
  it('should return the initial state', () => {
    expect(
      reducer(initialState, {})
    ).to.equal(initialState);
  });

  it('handles the MENUS_FETCH_SUCCESS action', () => {
    let reduced = reducer(initialState, {
      type: MENUS_FETCH_SUCCESS,
      records: payload,
    });
    expect(reduced[payload.id]).to.equal(payload);
  });
});
