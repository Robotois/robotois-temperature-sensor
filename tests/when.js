const TempSensor = require('../index');

const temp = new TempSensor(1);

temp.when(25, () => {
  console.log('Wow, la temperatura es 25 C!!');
});

// setInterval(()=>{ // Proceso en estado ocioso
//   console.log("Temp: " + temp.getValue().toFixed(3));
//   console.log("Int: " + temp.getIntValue());
// },1000);

setInterval(() => { // Proceso en estado ocioso
  // true;
}, 10000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
