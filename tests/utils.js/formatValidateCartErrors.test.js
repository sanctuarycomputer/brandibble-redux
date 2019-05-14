/* global describe it */
import { expect } from 'chai';
import formatValidateCartErrors from '../../src/utils/formatValidateCartErrors';

describe('utils/formatValidateCartErrors', () => {
  it('It should return an empty array if no arguments were passed', () => {
    const formattedCartErrors = formatValidateCartErrors();
    expect(formattedCartErrors).to.be.an('array').that.is.empty;
  });

  it('It should return an array of errors untouched if the error array did not contain invalidItem errors', () => {
    const testErrors = [
      {
        code: 'cart.validate.invalid_service_type',
        source: {
          pointer: 'service_type',
        },
        title: "Service type must be one of 'pickup' or 'delivery'.",
      },
      {
        code: 'cart.validate.invalid_service_type',
        source: {
          pointer: 'service_type',
        },
        title: "Service type must be one of 'pickup' or 'delivery'.",
      },
    ];

    const formattedCartErrors = formatValidateCartErrors(testErrors);

    expect(formattedCartErrors[0].code).to.equal(testErrors[0].code);
    expect(formattedCartErrors[0].source.pointer).to.equal(
      testErrors[0].source.pointer,
    );
    expect(formattedCartErrors[0].title).to.equal(testErrors[0].title);
    expect(formattedCartErrors[1].code).to.equal(testErrors[1].code);
    expect(formattedCartErrors[1].source.pointer).to.equal(
      testErrors[1].source.pointer,
    );
    expect(formattedCartErrors[1].title).to.equal(testErrors[1].title);
  });

  it('It should return an array of errors with invalidItemErrors correctly formatted', () => {
    const testErrors = [
      {
        code: 'cart.validate.invalid_service_type',
        source: {
          pointer: 'service_type',
        },
        title: "Service type must be one of 'pickup' or 'delivery'.",
      },
      {
        code: 'cart.validate.invalid_service_type',
        source: {
          pointer: 'service_type',
        },
        title: "Service type must be one of 'pickup' or 'delivery'.",
      },
      {
        code: 'cart.validate.invalid_cart',
        source: {
          pointer: 19708,
        },
        title: 'This item is invalid',
      },
      {
        code: 'cart.validate.invalid_cart',
        source: {
          pointer: 19709,
        },
        title: 'This item is invalid',
      },
    ];

    const formattedCartErrors = formatValidateCartErrors(testErrors);
    expect(formattedCartErrors).to.have.length.of(3);
    expect(formattedCartErrors[0].code).to.equal(testErrors[0].code);
    expect(formattedCartErrors[0].source.pointer).to.equal(
      testErrors[0].source.pointer,
    );
    expect(formattedCartErrors[0].title).to.equal(testErrors[0].title);
    expect(formattedCartErrors[1].code).to.equal(testErrors[1].code);
    expect(formattedCartErrors[1].source.pointer).to.equal(
      testErrors[1].source.pointer,
    );
    expect(formattedCartErrors[1].title).to.equal(testErrors[1].title);
    expect(formattedCartErrors[2].code).to.equal(testErrors[2].code);
    expect(formattedCartErrors[2].source.pointers)
      .to.be.an('array')
      .that.includes(19708, 19709);
    expect(formattedCartErrors[2].title).to.equal(testErrors[2].title);
  });
});
