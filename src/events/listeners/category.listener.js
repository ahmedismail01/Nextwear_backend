const event = require("../event");
const productCommand = require("../../commands/productCommand");

event.on("updateCategoryProducts", async (event) => {
  const { category } = event;

  await productCommand.updateRecords(
    { "category._id": category._id },
    { category: category }
  );

  return { status: "synced", categoryId: category._id };
});
