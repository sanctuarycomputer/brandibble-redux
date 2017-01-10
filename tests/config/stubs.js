import Brandibble from 'brandibble';
import ENV from './environment';

export const brandibble = new Brandibble({
  apiKey: ENV.BRANDIBBLE_API_KEY,
  brandId: ENV.BRANDIBBLE_BRAND_ID,
  apiEndpoint: ENV.BRANDIBBLE_API_ENDPOINT
});
