const TSensor = require('bindings')('TemperatureSensor');
const EventEmitter = require('events').EventEmitter;
const inherits = require('util').inherits;

/**
 * Creates an instance of temperature.
 * @param {int} _port The port number where this component us connected.
 * @param {int} _add The second argument.
 * @returns {int} The sum of the two numbers.
 */
function TemperatureSensor(_port, _add = 0) {
  const self = this;
  EventEmitter.call(this);
  this.temp = new TSensor(_port, _add);

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
  const self = this;
  let value;
  if (!this.eventInterval) {
    this.eventInterval = setInterval(() => {
      value = this.getBasicValue();
      self.emit('medicion', value);
    }, 500); // 500ms muestreo
  }
};

TemperatureSensor.prototype.when = function when(value, callback) {
  if (!this.interval) {
    this.interval = setInterval(() => { // Tomar mediciones cada 200ms
      /* eslint-disable no-console */
      console.log(`Temperatura: ${this.temp.getIntValue()}`);
      /* eslint-disable eqeqeq */
      if (this.temp.getIntValue() == value) {
        callback();
      }
    }, 500); // Tomar mediciones cada 500ms
  }
};

TemperatureSensor.prototype.release = function release() {
  clearInterval(this.interval);
  clearInterval(this.eventInterval);
  this.temp.release();
};

inherits(TemperatureSensor, EventEmitter);

module.exports = TemperatureSensor;
