const { emailActionEnum } = require('../constants');

module.exports = {
  [emailActionEnum.FORGOT_PASSWORD]: {
    subject: '[Grocery Shop]: forgot password',
    templateFileName: 'forgot-password',
  },
};
