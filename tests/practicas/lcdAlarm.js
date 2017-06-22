const Temperature = require('../../index');
const LCDModule = require('robotois-lcd-display');

const lcd = new LCDModule();
const temp = new Temperature(1);
temp.enableEvents();

/*
Practica simple, donde solo se muestra el valor actual del sensor de temperatura
en el display
 */
// temp.on('medicion', (value) => {
//   lcd.displaySensor({value, text:'Temp:', unit: 'C'});
// });

/*
Practica con alarma en el LCD, en donde se muestra en el display el valor actual
del sensor y cuando se tiene un valor especifico se activa la alarma del LCD
 */
// temp.equals(27,
//   (value) => {
//     lcd.displaySensor({value, text:'Temp:', unit: 'C'});
//     lcd.blinkBacklight(true);
//   },
//   (value) => {
//     lcd.displaySensor({value, text:'Temp:', unit: 'C'});
//     lcd.blinkBacklight(false);
//   }
// );

/*
Practica con alarma en el LCD, en donde se activa la alarma del LCD cuando el valor
de temperatura es mayor que el valor especificado
 */
// temp.moreThan(26,
//   (value) => {
//     lcd.displaySensor({value, text:'Temp:', unit: 'C'});
//     lcd.blinkBacklight(true);
//   },
//   (value) => {
//     lcd.displaySensor({value, text:'Temp:', unit: 'C'});
//     lcd.blinkBacklight(false);
//   }
// );

/*
Practica con alarma en el LCD, en donde se activa la alarma del LCD cuando el valor
de temperatura se encuentra dentro del rango [min-max]
 */
temp.between(25, 26,
  (value) => {
    lcd.displaySensor({value, text:'Temp:', unit: 'C'});
    lcd.blinkBacklight(true);
  },
  (value) => {
    lcd.displaySensor({value, text:'Temp:', unit: 'C'});
    lcd.blinkBacklight(false);
  }
);

/*
Finalizacion del proceso
 */
process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
