import fireAction from 'utils/fireAction';
import handleErrors from 'utils/handleErrors';
import moment from 'moment';

export const FETCH_MENU = 'FETCH_MENU';

const NOW = new Date();

const defaultMenuType = {
  locationId: null,
  requestedAt: NOW,
  serviceType: 'delivery',
};

export const fetchMenu = (brandibble, menuType = defaultMenuType) => (dispatch) => {
  const {
    locationId,
    requestedAt,
    serviceType,
  } = menuType;
  const requestedAtFormatted = new Date(moment(requestedAt));

  const payload = brandibble.menus.build(locationId, serviceType, requestedAtFormatted)
    .then(({ data }) => data).catch(handleErrors);

  return dispatch(fireAction(FETCH_MENU, payload));
};
