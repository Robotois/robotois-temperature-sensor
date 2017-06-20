const TSensor = require('bindings')('TemperatureSensor');
const EventEmitter = require('events').EventEmitter;
const inherits = require('util').inherits;

/**
 * Conditional callbacks
 * @param  {Bool} cond      Condition sentence that is evaluated
 * @param  {Func} onTrueCB  Callback that will be executed when the condition is evaluated true
 * @param  {Func} onFalseCB Callback that will be executed when the condition is evaluated false
 * @return {[type]}           [description]
 */
function callbacks(cond, onTrueCB, onFalseCB) {
  if (cond) {
    onTrueCB();
  } else {
    onFalseCB();
  }
}

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
    }, 1000); // 1000ms muestreo
  }
};

TemperatureSensor.prototype.when = function when(operator, params) {
  this.enableEvents();
  switch (operator) {
    case 'equals':
      this.on('medicion', (tempValue) => {
        callbacks((tempValue == params.value), params.onTrue, params.onFalse);
      });
      break;
    case 'inRange':
      this.on('medicion', (tempValue) => {
        callbacks(
          (tempValue >= params.min && tempValue <= params.max),
          params.onTrue,
          params.onFalse);
      });
      break;
    case 'lessThan':
      this.on('medicion', (tempValue) => {
        callbacks(
          (tempValue < params.value),
          params.onTrue,
          params.onFalse);
      });
      break;
    case 'moreThan':
      this.on('medicion', (tempValue) => {
        callbacks(
          (tempValue > params.value),
          params.onTrue,
          params.onFalse);
      });
      break;
    default:
  }
};

TemperatureSensor.prototype.release = function release() {
  clearInterval(this.eventInterval);
  this.temp.release();
};

inherits(TemperatureSensor, EventEmitter);

module.exports = TemperatureSensor;
