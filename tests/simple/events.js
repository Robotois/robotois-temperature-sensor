const Temperature = require('../../index');

const temp = new Temperature(1);
temp.enableEvents();

temp.on('medicion', (value) => {
  /* eslint-disable no-console */
  console.log(`Temperatura medida: ${value}`);
});

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
