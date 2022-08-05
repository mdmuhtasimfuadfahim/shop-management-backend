/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
const { Partitioners } = require('kafkajs')
const kafka = require('./config/kafka');
const validateTopic = require('./validation/validateTopic');
const validateEvent = require('./validation/validateEvent');

const producer = kafka.producer(({ createPartitioner: Partitioners.LegacyPartitioner }));
const PublishEvent = async (topic, event, data={}) => {
  validateTopic(topic);
  validateEvent(event);
  await producer.connect();
  await producer.send({
    topic,
    messages: [{key: event, value: JSON.stringify(data) }],
  });
  await producer.disconnect();
};
module.exports = PublishEvent;
