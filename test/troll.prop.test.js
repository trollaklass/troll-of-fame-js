const fc = require('fast-check');
const { trollArbitrary } = require('./generator');
const Troll = require('../lib/troll');

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
    /* Test go there */
  });
});

describe('Troll Inverse', () => {
  test('oopsHeSurvived should always be inverse of iGotOne', () => {
    /* Test go there */
  });
});

describe('Troll Analogy', () => {
  test('iGotOne and iGot should be consistent', () => {
    /* Test go there */
  });
});

describe('Troll Idempotence', () => {
  test('allElvesOfAKind_resurrected brings the Troll killing list to a stable state', () => {
    /* Test go there */
  });
});
