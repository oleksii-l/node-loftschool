const { program } = require('commander');

module.exports = program
  .version('0.0.1')
  .option('-i, --interval', 'Interval in ms for ticks', 2000)
  .option('-t, --timeout', 'Timeout in ms after application will be closed', 10000);
