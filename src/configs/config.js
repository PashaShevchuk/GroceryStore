module.exports = {
  PORT: process.env.PORT || 5000,

  FRONTEND_URL: process.env.FRONTEND_URL || 'https://github.com/PashaShevchuk/GroceryStore',

  ROOT_EMAIL: process.env.ROOT_EMAIL || 'groceryshop@gmail.com',
  ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASS || '0123456789',
  ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',

  DB_NAME: process.env.DB_NAME || 'grocery_store',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASS || '022894',
  DB_HOST: process.env.DB_HOST || '127.0.0.1',

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'hjkwehfkjwehafk3244t3qt',
  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '20m',

  ACCESS_TOKEN_RESET_PASSWORD_SECRET: process.env.ACCESS_TOKEN_RESET_PASSWORD_SECRET || 'sfasaff23f242g34g43',
  ACCESS_TOKEN_RESET_PASSWORD_LIFETIME: process.env.ACCESS_TOKEN_RESET_PASSWORD_LIFETIME || '1h',

  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'dsfkhreasdwfh432tr34jg43',
  REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '29d',

  WHITE_LIST: process.env.WHITE_LIST || 'http://localhost:3000;http://localhost:5000',

  ENV: process.env.ENV || 'DEV',

  serverRateLimits: {
    period: 900000, // 15 minutes
    maxRequests: 1000,
  },
};
