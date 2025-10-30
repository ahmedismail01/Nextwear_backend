const { z } = require("zod");
const isValidId = require("../utils/isValidId");
module.exports = schema = {
  list: {
    query: z.object({
      page: z.coerce.number().int().default(1),
      limit: z.coerce.number().int().default(10),
      products: z
        .array(
          z.refine((id) => isValidId(id), {
            message: "Invalid product id",
          })
        )
        .optional(),
      status: z
        .enum(["Pending", "Shipped", "Delivered", "Cancelled"])
        .optional(),
      createdAt: z.coerce.date().optional(),
      sort: z.string().optional(),
      searchString: z.string().optional(),
      minFinalPrice: z.coerce.number().optional(),
      maxFinalPrice: z.coerce.number().optional(),
      finalPrice: z.coerce.number().optional(),
      promocode: z.string().optional(),
    }),
  },

  getOne: {
    params: z.object({
      id: z.refine((id) => isValidId(id), {
        message: "Invalid order id",
      }),
    }),
  },

  changeStatus: {
    params: z.object({
      id: z.refine((id) => isValidId(id), {
        message: "Invalid order id",
      }),
    }),
    body: z.object({
      status: z.enum(["Pending", "Shipped", "Delivered", "Cancelled"]),
    }),
  },
};
