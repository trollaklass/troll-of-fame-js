const Elf = require('./elf');

/* FACTORY THAT CREATE TROLL OBJECT */
const createTroll = (name, kills = []) => ({
  name: name + '',
  kills,
  toString: () => name + ' ' + kills,
  scoring: function() {
    // mandatory to have an anonymous function to access this !!!
    return this.kills.reduce((acc, [elf, count]) => {
      return acc + elf.getValue() * count;
    }, 0);
  },
});

const iGot = kill => elf => troll => {
  // Working with Arrays is convinient to avoid mutable state but borring for this problem
  // Map from vanilla js have lot of tradeoffs and is inefficient when you don't whant to mutate them
  // Litteral object's key must be strings (we may have use them with Elf.elf.toString as key but it's unintuitive)
  // Litteral object indexed by RACE then ROLE is a better solution while you manage undefined values.
  // That's why you really should consider Map from immutable.js as a datastructure for this kind of problem
  const newElfCount = troll.kills
    .filter(([e, count]) => Elf.isKindOf(e, elf))
    .reduce((acc, [elf, count]) => {
      return acc + count;
    }, kill);
  const otherElvesTuples = troll.kills.filter(
    ([e, count]) => !Elf.isKindOf(e, elf)
  );
  const kills =
    newElfCount > 0
      ? otherElvesTuples.concat([[elf, newElfCount]])
      : otherElvesTuples;
  return {
    ...troll,
    kills,
  };
};

const iGotOne = iGot(1);

const oopsHeSurvived = iGot(-1);

const allElvesOfAKindResurrected = elf => troll => ({
  ...troll,
  kills: troll.kills.filter(([e, count]) => !Elf.isKindOf(e, elf)),
});

const allElvesResurrected = troll => ({
  ...troll,
  kills: [],
});

module.exports = {
  createTroll,
  iGot,
  iGotOne,
  oopsHeSurvived,
  allElvesOfAKindResurrected,
  allElvesResurrected,
};
