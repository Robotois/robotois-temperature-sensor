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
    let value;
    this.eventInterval = setInterval(() => {
      value = this.getBasicValue();
      this.emit('medicion', value);
    }, 750); // 750ms muestreo
  }
};

TemperatureSensor.prototype.when = function when(value, callback) {
  this.enableEvents();
  this.on('medicion', (tempValue) => {
    if (value == tempValue) {
      callback();
    }
  });
};

TemperatureSensor.prototype.release = function release() {
  clearInterval(this.eventInterval);
  this.temp.release();
};

inherits(TemperatureSensor, EventEmitter);

module.exports = TemperatureSensor;
