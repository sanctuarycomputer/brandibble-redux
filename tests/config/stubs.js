import Brandibble from 'brandibble';
import ENV from './environment';
import localforage from 'localforage';
import generateUUID from 'utils/generateUUID';

localforage.config({name: 'brandibble-redux-test', storeName: 'brandibble-redux-test'});

export const brandibble = new Brandibble({
  apiKey: ENV.BRANDIBBLE_API_KEY,
  brandId: ENV.BRANDIBBLE_BRAND_ID,
  apiEndpoint: ENV.BRANDIBBLE_API_ENDPOINT,
  storage: localforage,
});

export const SAMPLE_MENU_LOCATION_ID = 19;

export const menusStub = {
  id: generateUUID(),
  expires_at: '2016-07-09T03:59:00Z',
  sold_out_items: [0],
  menu: [
    {
      slug: 'marketplates',
      pos_display_color: '',
      name: 'Marketplates',
      items: [],
    }
  ],
}

export const locationsStub = [
  {
    'city':'Rye Brook',
    'cross_streets':'The Rye Ridge Shopping Center',
    'dayparts':[
       {
          'daypart':'Lunch',
          'ends_at':'2017-01-26T20:00:00Z',
          'has_delivery':false,
          'has_pickup':true,
          'starts_at':'2017-01-26T15:31:00Z',
          'weekday':'Thursday'
       },
       {
          'daypart':'Lunch',
          'ends_at':'2017-01-29T20:00:00Z',
          'has_delivery':false,
          'has_pickup':true,
          'starts_at':'2017-01-29T15:31:00Z',
          'weekday':'Sunday'
       }
    ],
    'delivery_minimum':0.0,
    'delivery_zone':[
       [
          41.0032083,
          -73.6833251
       ],
       [
          41.0032124,
          -73.6833037
       ],
       [
          41.0032245,
          -73.6833251
       ],
       [
          41.0032083,
          -73.6833251
       ]
    ],
    'delivery_zone_description':'None',
    'description':'',
    'directions_url':'',
    'distance':100,
    'fax_number':null,
    'has_delivery':false,
    'has_pickup':true,
    'hours_delivery':[

    ],
    'hours_description':'<p>Monday to Friday, 7:30am &mdash; 9pm<br />Saturday to Sunday, 8am &mdash; 9pm</p>',
    'hours_for_week':[
       {
          'close':'9:00 PM',
          'location_id':362,
          'olo_close':'10:30 PM',
          'olo_open':'7:30 AM',
          'open':'7:30 AM',
          'weekday':'Monday',
          'weekday_int':0
       },
       {
          'close':'9:00 PM',
          'location_id':362,
          'olo_close':'10:30 PM',
          'olo_open':'7:30 AM',
          'open':'7:30 AM',
          'weekday':'Tuesday',
          'weekday_int':1
       },
       {
          'close':'9:00 PM',
          'location_id':362,
          'olo_close':'10:30 PM',
          'olo_open':'7:30 AM',
          'open':'7:30 AM',
          'weekday':'Wednesday',
          'weekday_int':2
       },
       {
          'close':'9:00 PM',
          'location_id':362,
          'olo_close':'10:30 PM',
          'olo_open':'7:30 AM',
          'open':'7:30 AM',
          'weekday':'Thursday',
          'weekday_int':3
       },
       {
          'close':'9:00 PM',
          'location_id':362,
          'olo_close':'10:30 PM',
          'olo_open':'7:30 AM',
          'open':'7:30 AM',
          'weekday':'Friday',
          'weekday_int':4
       },
       {
          'close':'9:00 PM',
          'location_id':362,
          'olo_close':'10:30 PM',
          'olo_open':'8:30 AM',
          'open':'8:00 AM',
          'weekday':'Saturday',
          'weekday_int':5
       },
       {
          'close':'9:00 PM',
          'location_id':362,
          'olo_close':'10:30 PM',
          'olo_open':'8:30 AM',
          'open':'8:00 AM',
          'weekday':'Sunday',
          'weekday_int':6
       }
    ],
    'hours_pickup':[
       '7:30 AM',
       '9:00 PM'
    ],
    'hours_store':[
       '7:30 AM',
       '9:00 PM'
    ],
    'in_delivery_zone':false,
    'is_coming_soon':false,
    'is_new':true,
    'is_open':true,
    'latitude':41.0032095,
    'location_id':362,
    'longitude':-73.6833186,
    'menu_pdf_url':'',
    'name':'Rye Ridge',
    'permanently_closed':false,
    'phone_number':'914-305-8463',
    'sales_tax':7.375,
    'slug':'location-rye-ridge',
    'state_code':'NY',
    'street_address':'112 S. Ridge Street',
    'temporarily_closed':false,
    'timezone':'US/Eastern',
    'zip_code':'10573'
  }
];
