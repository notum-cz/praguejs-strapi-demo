module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '279d28e8bd68173594b6073f5c6efcca'),
  },
  watchIgnoreFiles: [
    '**/config/sync/**',
  ],
});
