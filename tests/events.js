var _temp = require('../index'),
  temp = new _temp(1);
temp.enableEvents();

temp.on('medicion',function(value){
  console.log("Temperatura medida: "+value);
});

setInterval(()=>{ // Proceso en estado ocioso
  true;
},10000);

process.on('SIGTERM', function () {
  process.exit();
});

process.on('SIGINT', function () {
  process.exit();
});
