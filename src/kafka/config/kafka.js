const { logLevel } = require('kafkajs')
const { Kafka } = require('kafkajs');
const config = require('./config')
const WinstonLogCreator  = require('./kafkaLogger');

const kafka = new Kafka({
  clientId: config.kafka_client_id,
  brokers: [config.kafka_broker],
  logLevel: logLevel.ALL,
  logCreator: WinstonLogCreator,
});

module.exports = kafka;
