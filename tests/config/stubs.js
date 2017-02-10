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

export const customersValidateStub = {
  is_brandibble_active: true,
  is_brandibble_customer: true,
  is_levelup_connected: true,
  is_levelup_user: true,
  levelup_connected_email: 'api@brandibble.co',
};

export const orderStub = {
  'address': {
    'city':'New York',
    'customer_address_id':158082,
    'state_code':'NY',
    'street_address':'150 East 52nd Street',
    'unit':'1001',
    'zip_code':'10022'
  },
  'cart': [
    {
      'id':5688,
      'instructions':'',
      'made_for':'',
      'name':'Charred Chicken',
      'option_gropus': [
        {
          'id':473,
          'option_items': [
            {
              'id':9431,
              'name':'Classic Brown Rice',
              'price':0.0
            }
          ]
        },
      ],
      'price':10.57,
      'quantity':1,
      'total_price':11.63
    },
  ],
  'customer': {
    'customer_id':3,
    'email':'jc.harrington1@gmail.com',
    'first_name':'JC',
    'last_name':'Gmail',
    'phone':'2028343641'
  },
  'discount':0.0,
  'include_utensils':1,
  'location_id':20,
  'notes_for_store':'These are notes for the store.',
  'payment_type':'cash',
  'requested_at':'2016-11-11T16:30:00Z',
  'service_type':'delivery',
  'shipping':0.0,
  'subtotal':20.34,
  'surcharge':0.0,
  'tax':1.81,
  'tip':0.0,
  'total':22.15,
};

export const validCredentialsStub = {
  email: 'sanctuary-testing-email@example.com',
  password: 'password'
};

export const authResponseStub = {
  'allergens': [
    'Gluten',
    'Dairy',
  ],
  'customer_id': 88210,
  'email': 'api@brandibble.co',
  'first_name': 'Brandibble',
  'last_name': 'API',
  'levelup_connected': true,
  'levelup_email': 'levelup@brandibble.co',
  'phone': '212-555-5555',
};

export const SAMPLE_MENU_LOCATION_ID = 19;
export const SAMPLE_EMAIL = 'sanctuary-testing-email@example.com';

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
