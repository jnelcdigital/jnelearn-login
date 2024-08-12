const PORT = process.env['PORT'] ?? '8080';

module.exports = {
  apps: [
    {
      name: "jne-login",
      script: "npm",
      args: "start",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: PORT,
      },
    },
  ],
};
