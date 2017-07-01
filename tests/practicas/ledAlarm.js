const Temperature = require('../../index');
const LEDModule = require('robotois-led');

const led = new LEDModule(5);
const temp = new Temperature(1);
temp.enableEvents();

/*
Practica con alarma de LED usando 'equals', en donde se enciende el LED cuando el sensor de
temperatura devuelve un valor especifico
 */
// temp.equals(27,
//   () => {
//     led.turnOn();
//   },
//   () => {
//     led.turnOff();
//   }
// );

/*
Practica con alarma de LED usando 'equals', en donde se hace parpadear el LED cuando el sensor de
temperatura devuelve un valor especifico
 */
// temp.equals(26,
//   () => {
//     led.blink(true);
//   },
//   () => {
//     led.blink(false);
//   }
// );

/*
Practica con alarma de LED usando 'moreThan', en donde se enciende el LED cuando el valor
de temperatura es mayor que el valor especificado
 */
// temp.moreThan(26,
//   () => {
//     led.turnOn();
//   },
//   () => {
//     led.turnOff();
//   }
// );

/*
Practica con alarma de LED usando 'moreThan', en donde se hace parpadear el LED cuando el valor
de temperatura es mayor que el valor especificado
 */
// temp.moreThan(26,
//   () => {
//     led.blink(true);
//   },
//   () => {
//     led.blink(false);
//   }
// );

/*
Practica con alarma de LED usando 'between', en donde se enciende el LED cuando el valor
de temperatura se encuentra dentro del rango [min-max]
 */
// temp.between(25, 26,
//   () => {
//     led.turnOn();
//   },
//   () => {
//     led.turnOff();
//   }
// );

/*
Practica con alarma de LED usando 'between', en donde se hace parpadear el LED cuando el valor
de temperatura se encuentra dentro del rango [min-max]
 */
temp.between(25, 26,
  () => {
    led.blink(true);
  },
  () => {
    led.blink(false);
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
