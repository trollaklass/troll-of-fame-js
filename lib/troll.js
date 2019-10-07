const Elf = require('./elf');

/* FACTORY THAT CREATE TROLL OBJECT */
const createTroll = (name, kills = []) => ({
  name: name + '',
  kills,
  toString: () => name + ' ' + kills,
  scoring: function() {
    // mandatory to have an anonymous function to access this !!!
    return this.kills.reduce((acc, [elf, count]) => {
      return elf.getValue() * count;
    }, 0);
  },
});

const iGot = kill => elf => troll => ({
  ...troll,
  kills: [...troll.kills, [elf, kill]],
});

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
