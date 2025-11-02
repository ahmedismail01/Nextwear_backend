const productCommand = require("../commands/productCommand");
const { Worker } = require("bullmq");

const connectionConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
};
const worker = new Worker(
  "category",
  async (job) => {
    if (job.name === "updateCategoryProducts") {
      const { category } = job.data;

      await productCommand.updateRecords(
        { "category._id": category._id },
        { category: category }
      );

      return { status: "synced", categoryId: category._id };
    }
  },
  {
    connection: connectionConfig,
  }
);
