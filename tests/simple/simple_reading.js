const Temperature = require('../../index');

const temp = new Temperature(1);

setInterval(() => {
  /* eslint-disable no-console */
  console.log(`Temp: ${temp.getValue().toFixed(3)}`);
  /* eslint-disable no-console */
  console.log(`Int: ${temp.getIntValue()}`);
}, 1000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
