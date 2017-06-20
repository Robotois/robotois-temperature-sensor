const Temperature = require('../../index');

const temp = new Temperature(1);

const paramsObj = {
  value: 25,
  onTrue: () => { console.log('Wow, la temperatura es 25 C'); },
  onFalse: () => {},
};

temp.when('equals', paramsObj);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
