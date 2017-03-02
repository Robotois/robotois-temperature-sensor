const Temperature = require('../index');

const temp = new Temperature(1);

temp.when(25, () => {
  /* eslint-disable no-console */
  console.log('Wow, la temperatura es 25 C!!');
});

setInterval(() => {}, 10000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
