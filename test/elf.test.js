const Elf = require('../lib/elf');

describe('Elf test suite', () => {
  test('2 Warlock Dark Elves should be equal', () => {
    const doomshadow = Elf.createElf(Elf.ROLE.WARLOCK, Elf.RACE.HIGH);
    const thundershade = Elf.createElf(Elf.ROLE.WARLOCK, Elf.RACE.HIGH);

    expect(doomshadow.getValue()).toBe(thundershade.getValue());
  });

  test('1 Archer Dark Elf and 1 Swordsman High Elf should be equal', () => {
    const faeor = Elf.createElf(Elf.ROLE.SWORDSMAN, Elf.RACE.HIGH);
    const shadowblight = Elf.createElf(Elf.ROLE.ARCHER, Elf.RACE.DARK);
    expect(shadowblight.getValue()).toBe(faeor.getValue());
  });
});
