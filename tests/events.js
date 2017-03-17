const Temperature = require('../index');

const temp = new Temperature(1);
temp.enableEvents();

temp.on('medicion', (value) => {
  /* eslint-disable no-console */
  console.log(`Temperatura medida: ${value}`);
});

setInterval(() => {}, 10000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
