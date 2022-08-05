/* eslint-disable prettier/prettier */
const RegisteredEvents = require('../config/RegisteredEvents');
const ApiError = require('../../utils/ApiError');

const validateEvent = (event) => {
  const eventList = Object.keys(RegisteredEvents);
  if (!eventList.includes(event)) {
    throw new ApiError(0, `Event ${event} is not supported`);
  }
};
module.exports = validateEvent;
