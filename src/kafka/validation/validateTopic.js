/* eslint-disable prettier/prettier */
const RegisteredTopics = require('../config/RegisteredTopics');
const ApiError = require('../../utils/ApiError');

const validateTopic = (topic) => {
  const topicList = Object.keys(RegisteredTopics);
  if (!topicList.includes(topic)) {
    throw new ApiError(0, `Topic ${topic} is not supported`);
  }
};
module.exports = validateTopic;
