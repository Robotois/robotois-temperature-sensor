const TSensor = require('bindings')('TemperatureSensor');
const EventEmitter = require('events').EventEmitter;
const inherits = require('util').inherits;

/**
 * Creates an instance of TemperatureSensor.
 * @param {int} port The port number where this component us connected.
 * @param {int} add The second argument.
 * @returns {TemperatureSensor}.
 */
function TemperatureSensor(port, add = 0) {
  const self = this;
  EventEmitter.call(this);
  this.temp = new TSensor(port, add);

  process.on('SIGINT', () => {
    self.temp.release();
  });

  process.on('SIGTERM', () => {
    self.temp.release();
  });
}

TemperatureSensor.prototype.getValue = function getValue() {
  return this.temp.getValue();
};

TemperatureSensor.prototype.getBasicValue = function getBasicValue() {
  const value = Math.round(this.temp.getValue() * 100) / 100;
  return value;
};

TemperatureSensor.prototype.getIntValue = function getIntValue() {
  return this.temp.getIntValue();
};

TemperatureSensor.prototype.enableEvents = function enableEvents() {
  if (!this.eventInterval) {
    this.eventInterval = setInterval(() => {
      this.emit('medicion', this.temp.getIntValue());
    }, 500);
  }
};

TemperatureSensor.prototype.release = function release() {
  clearInterval(this.eventInterval);
  this.temp.release();
};

inherits(TemperatureSensor, EventEmitter);

module.exports = TemperatureSensor;

// TemperatureSensor.prototype.equals = function equals(value, onTrue, onFalse) {
//   this.on('medicion', (tempValue) => {
//     if (tempValue == value) {
//       onTrue(tempValue);
//     } else {
//       onFalse(tempValue);
//     }
//   })
// };
//
// TemperatureSensor.prototype.lessThan = function lessThan(value, onTrue, onFalse) {
//   this.on('medicion', (tempValue) => {
//     if (tempValue < value) {
//       onTrue(tempValue);
//     } else {
//       onFalse(tempValue);
//     }
//   })
// };
//
// TemperatureSensor.prototype.moreThan = function moreThan(value, onTrue, onFalse) {
//   this.on('medicion', (tempValue) => {
//     if (tempValue > value) {
//       onTrue(tempValue);
//     } else {
//       onFalse(tempValue);
//     }
//   })
// };
//
// TemperatureSensor.prototype.between = function between(min, max, onTrue, onFalse) {
//   this.on('medicion', (tempValue) => {
//     if (tempValue >= min && tempValue <= max) {
//       onTrue(tempValue);
//     } else {
//       onFalse(tempValue);
//     }
//   })
// };
