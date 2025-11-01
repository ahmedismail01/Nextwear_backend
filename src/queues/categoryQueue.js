const { Queue } = require("bullmq");

const redisPort = parseInt(process.env.REDIS_PORT, 10);

const queue = new Queue("category", {
  connection: {
    host: process.env.REDIS_HOST,
    port: redisPort,
    password: process.env.REDIS_PASSWORD,
  },
});

module.exports = queue;
