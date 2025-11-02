const { Queue } = require("bullmq");

const queue = new Queue("category", {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
});

module.exports = queue;
