const EmailTemplates = require('email-templates');
const mailer = require('nodemailer');
const path = require('path');

const {
  config: {
    ROOT_EMAIL, ROOT_EMAIL_PASSWORD, ROOT_EMAIL_SERVICE, FRONTEND_URL,
  },
} = require('../configs');
const htmlTemplate = require('../email-templates');
const { winston } = require('../logger');

const logger = winston('EMAIL');

if (!FRONTEND_URL || !ROOT_EMAIL || !ROOT_EMAIL_PASSWORD || !ROOT_EMAIL_SERVICE) {
  throw new Error('Root email credentials are not defined');
}

const emailTemplates = new EmailTemplates({
  message: null,
  views: {
    root: path.join(process.cwd(), 'src', 'email-templates'),
  },
});

const transporter = mailer.createTransport({
  service: ROOT_EMAIL_SERVICE,
  auth: {
    user: ROOT_EMAIL,
    pass: ROOT_EMAIL_PASSWORD,
  },
});

class EmailService {
  async sendMail(userMail, action, context) {
    try {
      const templateInfo = htmlTemplate[action];

      if (!templateInfo) {
        throw new Error('Template not found');
      }

      const html = await emailTemplates.render(templateInfo.templateFileName, {
        ...context, frontendUrl: FRONTEND_URL,
      });

      const mailOptions = {
        from: 'NO REPLY GROCERY SHOP',
        to: userMail,
        subject: templateInfo.subject,
        html,
      };

      return transporter.sendMail(mailOptions);
    } catch (e) {
      logger.info(e);
      console.log(e);
    }
  }
}

module.exports = new EmailService();
