const Elf = require('../lib/elf');
const Troll = require('../lib/troll');
const { pipe } = require('../lib/util');

describe('Troll test suite', () => {
  test('iGot should faeor with value 5', () => {
    const faeor = Elf.createElf(Elf.ROLE.SWORDSMAN, Elf.RACE.HIGH);
    const aklassBefore = Troll.createTroll('Aklass');
    const aklassAfter = Troll.iGot(5)(faeor)(aklassBefore);
    expect(
      aklassAfter.kills.reduce(
        (acc, [elf, count]) => (Elf.isKindOf(elf, faeor) ? acc + count : acc),
        0
      )
    ).toBe(5);
  });
  test('iGotOne should faeor with value 1', () => {
    const faeor = Elf.createElf(Elf.ROLE.SWORDSMAN, Elf.RACE.HIGH);
    const aklassBefore = Troll.createTroll('Aklass');
    const aklassAfter = Troll.iGotOne(faeor)(aklassBefore);
    expect(
      aklassAfter.kills.reduce(
        (acc, [elf, count]) => (elf === faeor ? acc + count : acc),
        0
      )
    ).toBe(1);
  });
  test('oopsHeSurvived should remove faeor', () => {
    const faeor = Elf.createElf(Elf.ROLE.SWORDSMAN, Elf.RACE.HIGH);
    const aklassFaeorSurvived = pipe(
      Troll.iGotOne(faeor),
      Troll.oopsHeSurvived(faeor)
    )(Troll.createTroll('Aklass'));
    expect(
      aklassFaeorSurvived.kills.reduce(
        (acc, [elf, count]) => (elf === faeor ? acc + count : acc),
        0
      )
    ).toBe(0);
  });
  test('allElvesOfAKindResurrected should remove all SWORDMAN DARK elves', () => {
    const faeor = Elf.createElf(Elf.ROLE.SWORDSMAN, Elf.RACE.HIGH);
    const shadowblight = Elf.createElf(Elf.ROLE.ARCHER, Elf.RACE.DARK);
    const aklass = pipe(
      Troll.iGotOne(faeor),
      Troll.oopsHeSurvived(faeor),
      Troll.iGot(10)(shadowblight),
      Troll.iGotOne(faeor),
      Troll.allElvesOfAKindResurrected(
        Elf.createElf(Elf.ROLE.SWORDSMAN, Elf.RACE.HIGH)
      )
    )(Troll.createTroll('Aklass'));
    expect(
      aklass.kills.reduce(
        (acc, [elf, count]) =>
          Elf.isKindOf(Elf.createElf(Elf.ROLE.SWORDSMAN, Elf.RACE.HIGH))
            ? acc + count
            : acc,
        0
      )
    ).toBe(0);
  });
  test('Troll scoring should be equal before adding a kind and aftefr allElvesOfAKindResurrected', () => {
    const shadowblight = Elf.createElf(Elf.ROLE.ARCHER, Elf.RACE.DARK);
    const faeor = Elf.createElf(Elf.ROLE.SWORDSMAN, Elf.RACE.HIGH);
    const eramus = Elf.createElf(Elf.ROLE.SWORDSMAN, Elf.RACE.HIGH);
    const aklassBefore = Troll.iGotOne(shadowblight)(
      Troll.createTroll('Aklass')
    );
    const aklassAfter = pipe(
      Troll.iGotOne(faeor),
      Troll.iGot(5)(eramus),
      Troll.allElvesOfAKindResurrected(
        Elf.createElf(Elf.ROLE.SWORDSMAN, Elf.RACE.HIGH)
      )
    )(aklassBefore);
    expect(aklassBefore.scoring()).toBe(aklassAfter.scoring());
  });
  test('allElvesResurrected should remove all elves', () => {
    const doomshadow = Elf.createElf(Elf.ROLE.WARLOCK, Elf.RACE.HIGH);
    const shadowblight = Elf.createElf(Elf.ROLE.ARCHER, Elf.RACE.DARK);
    const faeor = Elf.createElf(Elf.ROLE.SWORDSMAN, Elf.RACE.HIGH);
    const aklass = pipe(
      Troll.iGotOne(faeor),
      Troll.iGot(10)(shadowblight),
      Troll.iGotOne(doomshadow),
      Troll.allElvesResurrected
    )(Troll.createTroll('Aklass'));
    expect(aklass.kills.length).toBe(0);
  });
});
