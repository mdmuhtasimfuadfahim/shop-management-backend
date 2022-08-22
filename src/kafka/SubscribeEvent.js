/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
const kafka = require('./config/kafka');
const { orderService } = require('../services');
const RegisteredEvents = require('./config/RegisteredEvents');
const RegisteredTopics = require('./config/RegisteredTopics');
const validateTopic = require('./validation/validateTopic');
const validateEvent = require('./validation/validateEvent');
const validateData = require('./validation/validateData');

const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const SubcribeEvent = async (topic) => {
  validateTopic(topic);
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      const key = message.key.toString();
      let data;

      switch (key) {
        case RegisteredEvents.ADD_ORDER:
          validateEvent(RegisteredEvents.ADD_ORDER);
          data = JSON.parse(message.value);
          validateData(RegisteredEvents.ADD_ORDER, data);
          break;
        case RegisteredEvents.UPDATE_ORDER_STATUS:
          validateEvent(RegisteredEvents.UPDATE_ORDER_STATUS);
          data = JSON.parse(message.value);
          console.log(data)
          validateData(RegisteredEvents.UPDATE_ORDER_STATUS, data);
          break;
        default:
          break;
      }
    },
  });
};
SubcribeEvent(RegisteredTopics.ADMIN);
SubcribeEvent(RegisteredTopics.CUSTOMER);

module.exports = SubcribeEvent;