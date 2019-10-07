const { deepFreeze } = require('./util');

/* Simple way to represent ENUM in pure JS below
For real projects you should use immutable Map https://immutable-js.github.io/immutable-js/docs/#/Map */

/* ENUM THAT REPRESENT ELF RACE */
const RACE = {
  DARK: 1,
  HIGH: 2,
  properties: {
    1: { name: 'Dark Elf', value: 1 },
    2: {
      name: 'High Elf',
      value: 2,
    } /* Because everybody hates those smug High Elves */,
  },
};
deepFreeze(RACE);

/* ENUM THAT REPRESENT ELF RACE */
const ROLE = {
  SWORDSMAN: 1,
  ARCHER: 2,
  PRIEST: 3,
  WARLOCK: 4,
  properties: {
    1: { name: 'Swordsman', value: 1 },
    2: { name: 'Archer', value: 2 },
    3: { name: 'Priest', value: 5 },
    4: { name: 'Warlock', value: 4 },
  },
};
deepFreeze(ROLE);

/* FACTORY THAT CREATE ELF OBJECT */
const createElf = (role = ROLE.SWORDSMAN, race = RACE.DARK) => ({
  role,
  race,
  getValue: () => ROLE.properties[role].value + RACE.properties[race].value,
  toString: () => ROLE.properties[role].name + ' ' + RACE.properties[race].name,
});

const isKindOf = (elf1 = createElf(), elf2 = createElf()) =>
  elf1.role === elf2.role && elf1.race === elf2.race;

const isEqual = (elf1 = createElf(), elf2 = createElf()) =>
  elf1.getValue() === elf2.getValue();

module.exports = {
  createElf,
  isKindOf,
  isEqual,
  ROLE,
  RACE,
};
