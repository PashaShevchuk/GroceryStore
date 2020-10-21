const cron = require('node-cron');

const clearOldTokens = require('./clear-old-tokens');

module.exports = () => {
  try {
    // at 00:00 everyday = '0 0 * * *', every 5 sec = '*/5 * * * * *'
    cron.schedule('*/5 * * * * *', async () => {
      console.log('-----------------------ITERATION START------------------------');

      await clearOldTokens();

      console.log('-----------------------ITERATION FINISH-----------------------');
    });
  } catch (e) {
    console.log(e);
  }
};
