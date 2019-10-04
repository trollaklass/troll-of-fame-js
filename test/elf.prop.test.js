const fc = require('fast-check');
const { RACE, ROLE } = require('../lib/elf');
const { elfArbitrary } = require('./generator');

describe('Elf Invariance', () => {
  test('Elf value should always be positive', () => {
    fc.assert(fc.property(elfArbitrary(), elf => elf.getValue() > 0));
  });
  test('Elf value should always be the product of race and role', () => {
    fc.assert(
      fc.property(
        elfArbitrary(),
        elf =>
          elf.getValue() ===
          ROLE.properties[elf.role].value * RACE.properties[elf.race].value
      )
    );
  });
});
