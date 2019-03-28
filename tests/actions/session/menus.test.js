/* global describe before it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import { utils } from 'brandibble';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { fetchMenu, FETCH_MENU } from 'actions/session/menus';
import { brandibble, SAMPLE_MENU_LOCATION_ID } from '../../config/stubs';
import { Asap } from '../../../src/utils/constants';

const { coerceDateToISO8601 } = utils;
const mockStore = configureStore(reduxMiddleware);

describe('actions/session/menus', () => {
  describe('fetchMenu', () => {
    let store;
    let actionsCalled;
    let action;
    let menuType;

    describe('calls actions', () => {
      before(() => {
        store = mockStore();

        menuType = {
          locationId: SAMPLE_MENU_LOCATION_ID,
          requestedAt: new Date(),
          serviceType: 'delivery',
        };

        return fetchMenu(brandibble, menuType)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call at least 2 actions', () => {
        expect(actionsCalled).to.have.length.of.at.least(2);
      });

      it(`should have ${FETCH_MENU}_PENDING action`, () => {
        action = find(actionsCalled, { type: `${FETCH_MENU}_PENDING` });
        expect(action).to.exist;
      });

      it(`should have ${FETCH_MENU}_FULFILLED action`, () => {
        action = find(actionsCalled, { type: `${FETCH_MENU}_FULFILLED` });
        expect(action).to.exist;
        expect(action).to.have.property('meta');
        expect(action.meta).to.have.property(
          'menuKey',
          `${menuType.locationId}_${menuType.serviceType}_${coerceDateToISO8601(
            menuType.requestedAt,
          )}`,
        );
      });
    });
  });

  describe('fetchMenu with isAsap field in options hash set to true', () => {
    let store;
    let actionsCalled;
    let action;
    let menuType;
    let options;

    describe('calls actions', () => {
      before(() => {
        store = mockStore();

        menuType = {
          locationId: SAMPLE_MENU_LOCATION_ID,
          requestedAt: new Date(),
          serviceType: 'delivery',
        };

        options = {
          isAsap: true,
        };

        return fetchMenu(brandibble, menuType, options)(store.dispatch).then(
          () => {
            actionsCalled = store.getActions();
          },
        );
      });

      it('should call at least 2 actions', () => {
        expect(actionsCalled).to.have.length.of.at.least(2);
      });

      it(`should have ${FETCH_MENU}_PENDING action`, () => {
        action = find(actionsCalled, { type: `${FETCH_MENU}_PENDING` });
        expect(action).to.exist;
      });

      it(`should have ${FETCH_MENU}_FULFILLED action`, () => {
        action = find(actionsCalled, { type: `${FETCH_MENU}_FULFILLED` });
        expect(action).to.exist;
        expect(action).to.have.property('meta');
        expect(action.meta).to.have.property(
          'menuKey',
          `${menuType.locationId}_${menuType.serviceType}_${Asap}`,
        );
      });
    });
  });
});
