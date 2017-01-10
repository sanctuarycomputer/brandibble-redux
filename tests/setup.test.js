import Brandibble from 'brandibble';
import ENV from './config/environment';

const SAMPLE_MENU_LOCATION_ID = 19;

before(done => {
  let brandibbleRef = new Brandibble({
    apiKey: ENV.BRANDIBBLE_API_KEY,
    brandId: ENV.BRANDIBBLE_BRAND_ID,
    apiEndpoint: ENV.BRANDIBBLE_API_ENDPOINT
  });

  const setAuthToken = () => {
    brandibbleRef.orders.create(SAMPLE_MENU_LOCATION_ID).then(() => {
      brandibbleRef.customers.authenticate({ email: 'sanctuary-testing-email@example.com', password: 'password' }).then(() => {
        window.TEST_TOKEN = brandibbleRef.adapter.customerToken;
        brandibbleRef.payments.all().then(res => {
          res.data.forEach(card => {
            brandibbleRef.payments.delete(card.customer_card_id);
          });
          done();
        });
      });
    });
  };

  brandibbleRef.customers.create({
    first_name: 'Sanctuary',
    last_name: 'Computer',
    email: 'sanctuary-testing-email@example.com',
    password: 'password'
  }).then(setAuthToken).catch(setAuthToken);

});
