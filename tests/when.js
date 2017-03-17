<<<<<<< HEAD
const TempSensor = require('../index');

const temp = new TempSensor(1);

temp.when(25, () => {
  console.log('Wow, la temperatura es 25 C!!');
});
=======
const Temperature = require('../index');

const temp = new Temperature(1);
>>>>>>> 7fcada0cf88bb1578ff1b24c2c11bbddb8749e61

temp.when(25, () => {
  /* eslint-disable no-console */
  console.log('Wow, la temperatura es 25 C!!');
});

<<<<<<< HEAD
setInterval(() => { // Proceso en estado ocioso
  // true;
}, 10000);
=======
setInterval(() => {}, 10000);
>>>>>>> 7fcada0cf88bb1578ff1b24c2c11bbddb8749e61

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
