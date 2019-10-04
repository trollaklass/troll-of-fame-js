const { Elf, Troll } = require('../lib');
const { pipe, printWarband } = require('../lib/util');
const { elfArbitrary, char } = require('../test/generator');

const archerDark = Elf.createElf(Elf.ROLE.ARCHER, Elf.RACE.DARK);
const warlockDark = Elf.createElf(Elf.ROLE.WARLOCK, Elf.RACE.DARK);
const swordsmanDark = Elf.createElf(Elf.ROLE.SWORDSMAN, Elf.RACE.DARK);
const priestHigh = Elf.createElf(Elf.ROLE.PRIEST, Elf.RACE.HIGH);
const swordsmanHigh = Elf.createElf(Elf.ROLE.SWORDSMAN, Elf.RACE.HIGH);
const aklass = pipe(
  Troll.iGot(5)(warlockDark),
  Troll.iGot(2)(priestHigh),
  Troll.iGot(20)(swordsmanDark),
  Troll.iGot(10)(archerDark)
)(Troll.createTroll('Aklass'));

const lesglandes = pipe(
  Troll.iGotOne(priestHigh),
  Troll.oopsHeSurvived(priestHigh),
  Troll.iGot(5)(warlockDark),
  Troll.allElvesOfAKindResurrected(warlockDark)
)(Troll.createTroll('Lesglandes'));

const lesklat = pipe(
  Troll.iGotOne(priestHigh),
  Troll.iGot(20)(swordsmanHigh),
  Troll.iGot(2)(priestHigh),
  Troll.iGotOne(swordsmanHigh),
  Troll.iGotOne(warlockDark),
  Troll.oopsHeSurvived(warlockDark)
)(Troll.createTroll('Lesklat'));
console.log(lesklat.scoring());

const tyneth = pipe(
  Troll.iGot(5)(swordsmanDark),
  Troll.iGotOne(priestHigh)
)(Troll.createTroll('Tyneth'));

const warband = [aklass, lesglandes, lesklat, tyneth];

printWarband(warband);
