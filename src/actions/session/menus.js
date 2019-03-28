import { utils } from 'brandibble';
import fireAction from '../../utils/fireAction';
import handleErrors from '../../utils/handleErrors';
import { Asap } from '../../utils/constants';
import get from '../../utils/get';

export const FETCH_MENU = 'FETCH_MENU';

const { coerceDateToISO8601 } = utils;
const NOW = new Date();

const defaultMenuType = {
  locationId: null,
  requestedAt: NOW,
  serviceType: 'delivery',
};

const defaultOptions = {
  isAsap: false,
};

export const fetchMenu = (
  brandibble,
  menuType = defaultMenuType,
  options = defaultOptions,
) => (dispatch) => {
  const { locationId, requestedAt, serviceType } = menuType;
  const requestedAtAsISO8601 = coerceDateToISO8601(requestedAt);

  const payload = brandibble.menus
    .build(locationId, serviceType, requestedAtAsISO8601)
    .then(({ data }) => data)
    .catch(handleErrors);

  const requestedAtKey = get(options, 'isAsap') ? Asap : requestedAtAsISO8601;
  const meta = {
    menuKey: `${locationId}_${serviceType}_${requestedAtKey}`,
  };

  return dispatch(fireAction(FETCH_MENU, payload, meta));
};
