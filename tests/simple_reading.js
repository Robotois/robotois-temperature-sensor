var _temp = require('../index'),
  temp = new _temp(1);

setInterval(()=>{ // Proceso en estado ocioso
  console.log("Temp: " + temp.getValue().toFixed(3));
  console.log("Int: " + temp.getIntValue());
},1000);

setInterval(()=>{ // Proceso en estado ocioso
  true;
},10000);

process.on('SIGTERM', function () {
  process.exit();
});

process.on('SIGINT', function () {
  process.exit();
});
