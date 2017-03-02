/* global window describe it */
import { brandibble } from './config/stubs';

const SAMPLE_MENU_LOCATION_ID = 19;

before(() => {
  const setAuthToken = () => {
    return brandibble.orders.create(SAMPLE_MENU_LOCATION_ID).then(() => {
      return brandibble.customers
        .authenticate({ email: 'sanctuary-testing-email@example.com', password: 'password' })
        .then(() => {
          window.TEST_TOKEN = brandibble.adapter.customerToken;
          return brandibble.payments.all().then((res) => {
            return res.data.forEach((card) => {
              return brandibble.payments.delete(card.customer_card_id);
            });
          });
        });
    });
  };

  brandibble.customers
    .create({
      first_name: 'Sanctuary',
      last_name: 'Computer',
      email: 'sanctuary-testing-email@example.com',
      password: 'password',
    })
    .then(setAuthToken)
    .catch(setAuthToken);
});
