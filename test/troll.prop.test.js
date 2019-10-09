const fc = require('fast-check');
const { trollArbitrary, elfArbitrary } = require('./generator');
const Troll = require('../lib/troll');
const { pipe } = require('../lib/util');

describe('Troll Invariance', () => {
  test('Troll score should be 0 when all elves resurrected', () => {
    fc.assert(
      fc.property(
        trollArbitrary(),
        troll => Troll.allElvesResurrected(troll).scoring() === 0
      )
    );
  });
  test('Troll score should always be >= 0', () => {
    fc.assert(fc.property(trollArbitrary(), troll => troll.scoring() >= 0));
  });
});

describe('Troll Inverse', () => {
  test('oopsHeSurvived should always be inverse of iGotOne', () => {
    fc.assert(
      fc.property(
        trollArbitrary(),
        elfArbitrary(),
        (troll, elf) =>
          pipe(
            Troll.iGotOne(elf),
            Troll.oopsHeSurvived(elf)
          )(troll).scoring() === troll.scoring()
      )
    );
  });
});

describe('Troll Analogy', () => {
  test('iGotOne and iGot should be consistent', () => {
    /* Test go there */
    fc.assert(
      fc.property(
        trollArbitrary(),
        elfArbitrary(),
        fc.nat(1000), // Range 0-1000 enough to be representative while not perturbating perfs
        (troll, elf, nKills) => {
          let nTimeGotOneTroll = troll;
          for (let i = 0; i < nKills; i++)
            nTimeGotOneTroll = Troll.iGotOne(elf)(nTimeGotOneTroll);
          return (
            nTimeGotOneTroll.scoring() ===
            Troll.iGot(nKills)(elf)(troll).scoring()
          );
        }
      )
    );
  });
});

describe('Troll Idempotence', () => {
  test('allElvesOfAKindResurrected brings the Troll killing list to a stable state', () => {
    fc.assert(
      fc.property(
        trollArbitrary(),
        elfArbitrary(),
        (troll, elf) =>
          Troll.allElvesOfAKindResurrected(elf)(troll).scoring() ===
          Troll.allElvesOfAKindResurrected(elf)(
            Troll.allElvesOfAKindResurrected(elf)(troll)
          ).scoring()
      )
    );
  });
});

describe('Troll metamorphic', () => {
  test('When a troll kills an elf, his score should increase', () => {
    fc.assert(
      fc.property(trollArbitrary(), elfArbitrary(), (troll, elf) => {
        const scoreBeforeKill = troll.scoring();
        const scoreAfterKill = Troll.iGotOne(elf)(troll).scoring();
        return scoreAfterKill === scoreBeforeKill + elf.getValue();
      })
    );
  });
});

describe('Troll injective', () => {
  test('When killing different elves, a troll should get different scores', () => {
    fc.assert(
      fc.property(
        trollArbitrary(),
        elfArbitrary(),
        elfArbitrary(),
        (troll, elf1, elf2) => {
          const trollKilledElf1 = Troll.iGotOne(elf1)(troll);
          const trollKilledElf2 = Troll.iGotOne(elf2)(troll);
          return (
            elf1.getValue() === elf2.getValue() ||
            trollKilledElf1.scoring() !== trollKilledElf2.scoring()
          );
        }
      )
    );
  });
});
