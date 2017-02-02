import moment from 'moment';
import flattenProducts from 'utils/flattenProducts';
import generateUUID from 'utils/generateUUID';

export const MENU_FETCH = 'MENU_FETCH';
const SAMPLE_MENU_LOCATION_ID = 19;

function _fetchMenu(brandibble, locationId=null, deliveryWindow) {
  const sample = locationId ? false : true;
  locationId = locationId ? locationId: SAMPLE_MENU_LOCATION_ID;

  return {
    type: MENU_FETCH,
    payload: brandibble.menus.build(locationId, 'delivery', deliveryWindow.timeStart).then(res => {
      const { expires_at, menu, sold_out_items } = res.data;
      const attributes = {
        expires_at,
        id: generateUUID(),
        sample,
        sold_out_items,
      };

      return {
        attributes,
        categories: menu,
        products: flattenProducts(menu),
        selectedWindow: deliveryWindow,
      };
    }),
  };
}

export function fetchMenu(brandibble, locationId, deliveryWindow={timeStart:moment()}) {
  const date = new Date(deliveryWindow.timeStart).toISOString().slice(0, 19) + 'Z';
  return dispatch => {
    return brandibble.orders.current().setRequestedAt(date).then(() => {
      return dispatch(_fetchMenu(brandibble, locationId, deliveryWindow));
    });
  };
}
