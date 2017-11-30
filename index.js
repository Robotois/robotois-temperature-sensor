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
  this.prevValue = -1;

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

TemperatureSensor.prototype.publishNow = function publishNow() {
  this.mqttClient.publish(this.myTopic, this.temp.getIntValue().toString());
};

TemperatureSensor.prototype.enableEvents = function enableEvents(mqttConfig) {
  if (mqttConfig) {
    this.mqttClient = mqttConfig.mqttClient;
    this.myTopic = `sensors/temperature${mqttConfig.instance}`;
  }
  if (!this.eventInterval) {
    this.eventInterval = setInterval(() => {
      const currentValue = this.temp.getIntValue();
      this.emit('medicion', currentValue);
      if (this.prevValue !== currentValue && this.mqttClient) {
        this.mqttClient.publish(this.myTopic, currentValue.toString());
        this.prevValue = currentValue;
      }
    }, 500);
  }
};

TemperatureSensor.prototype.release = function release() {
  clearInterval(this.eventInterval);
  this.temp.release();
};

inherits(TemperatureSensor, EventEmitter);

module.exports = TemperatureSensor;
