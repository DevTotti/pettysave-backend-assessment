require('dotenv').config();

module.exports = {
  token_exp_days: process.env.TOKEN_EXP_DAYS || '365d',
  secret: process.env.SECRET || 'my-secret',
  mongodbUri: process.env.MONGODB_URL,
  token: process.env.BEARER_TOKEN,
};
