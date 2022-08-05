const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    KAFKA_CLIENT_ID: Joi.string().required().description('kafka client id'),
    KAFKA_BROKER: Joi.string().required().description('kafka broker url'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error For Kafka: ${error.message}`);
}

module.exports = {
  kafka_client_id: process.env.KAFKA_CLIENT_ID,
  kafka_broker: process.env.KAFKA_BROKER,
};
