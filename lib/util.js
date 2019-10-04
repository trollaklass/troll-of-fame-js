const chalk = require('chalk');

/* Use the pattern on a case-by-case basis based on your design 
when you know the object contains no cycles in the reference graph, 
otherwise an endless loop will be triggered. */
const deepFreeze = object => {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self

  for (let name of propNames) {
    let value = object[name];

    object[name] =
      value && typeof value === 'object' ? deepFreeze(value) : value;
  }

  return Object.freeze(object);
};

/* Simple pipe function : WORKS ONLY ON CURRYFIED FUNCTION
For real projects you should use Ramda R.pipe https://ramdajs.com/docs/#pipe */
const pipe = (...fns) => value =>
  fns.reduce(
    (currentValue, currentFunction) => currentFunction(currentValue),
    value
  );

const printWarband = warband => {
  console.log(chalk.red('Troll of Fame'));
  warband.forEach(troll => {
    console.log(chalk.green(troll.name + ' scored ' + troll.scoring()));
  });
};

module.exports.deepFreeze = deepFreeze;
module.exports.pipe = pipe;
module.exports.printWarband = printWarband;
