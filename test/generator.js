const fc = require('fast-check');
const { createElf, RACE } = require('../lib/elf');
const { createTroll } = require('../lib/troll');

const elfArbitrary = () =>
  fc
    .tuple(fc.integer(1, 4), fc.integer(1, 2))
    .map(([role, race]) => createElf(role, race));

const elfHighArbitrary = () =>
  fc
    .tuple(fc.integer(1, 4), fc.constant(RACE.HIGH))
    .map(([role, race]) => createElf(role, race));

const killArbitrary = () => fc.tuple(elfArbitrary(), fc.nat());

const trollArbitrary = () =>
  fc
    .tuple(fc.string(), fc.array(killArbitrary()))
    .map(([name, kills]) => createTroll(name, kills));

module.exports = {
  elfArbitrary,
  trollArbitrary,
  elfHighArbitrary,
};
