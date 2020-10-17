module.exports = {
  PORT: process.env.PORT || 5000,

  DB_NAME: process.env.DB_NAME || 'grocery_store',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASS || '022894',
  DB_HOST: process.env.DB_HOST || '127.0.0.1',

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'hjkwehfkjwehafk3244t3qt',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'dsfkhrewfh432tr34jg43',

  ROOT_EMAIL: process.env.ROOT_EMAIL || 'shop@gmail.com',
  ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASS || '1234567890',

  WHITE_LIST: process.env.WHITE_LIST || 'http://localhost:3000;http://localhost:5000',

  ENV: process.env.ENV || 'DEV',

  serverRateLimits: {
    period: 900000, // 15 minutes
    maxRequests: 1000,
  },
};
