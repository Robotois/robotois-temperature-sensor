const Temperature = require('../../index');

const temp = new Temperature(1);

const paramsObj = {
  value: 26,
  onTrue: () => { console.log('Wow, la temperatura es 26 C'); },
  onFalse: (value) => {console.log('Nop: ' + value);},
};

temp.when('equals', paramsObj);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
