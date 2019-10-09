const fc = require('fast-check');
const { RACE, ROLE } = require('../lib/elf');
const { elfArbitrary, elfHighArbitrary } = require('./generator');

describe('Elf Invariance', () => {
  test('Elf value should always be positive', () => {
    fc.assert(fc.property(elfArbitrary(), elf => elf.getValue() > 0));
  });
  // test('The value of a High elf must be an even number', () => {
  //   fc.assert(
  //     fc.property(elfHighArbitrary(), elfHigh => elfHigh.getValue() % 2 === 0)
  //   );
  // });
});
